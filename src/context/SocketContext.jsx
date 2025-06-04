import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useAuth } from "./AuthContext"
import toast from "react-hot-toast"

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

// Función para obtener la URL del servidor según el entorno
const getServerUrl = () => {
  // En producción (cuando no es localhost)
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return "https://turno-backend-fhmm.onrender.com"
  }
  // En desarrollo local
  return "http://localhost:5000"
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token")

      console.log("🔌 Connecting to Socket.IO server:", getServerUrl())

      const newSocket = io(getServerUrl(), {
        auth: { token },
        transports: ["websocket", "polling"], // Usar ambos transportes
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      // Eventos de conexión
      newSocket.on("connect", () => {
        console.log("✅ Connected to Socket.IO server:", newSocket.id)
        setIsConnected(true)
        setConnectionError(null)
      })

      newSocket.on("disconnect", (reason) => {
        console.log("❌ Disconnected from Socket.IO server:", reason)
        setIsConnected(false)
      })

      newSocket.on("connect_error", (error) => {
        console.error("🔥 Socket.IO connection error:", error.message)
        setConnectionError(error.message)
        setIsConnected(false)
      })

      newSocket.on("reconnect", (attemptNumber) => {
        console.log("🔄 Reconnected after", attemptNumber, "attempts")
        setIsConnected(true)
        setConnectionError(null)
      })

      // Eventos de notificaciones
      newSocket.on("notification", (notification) => {
        console.log("🔔 New notification received:", notification)
        setNotifications((prev) => [notification, ...prev])
        toast.success(notification.message)
      })

      newSocket.on("initial_notifications", (initialNotifications) => {
        console.log("📋 Initial notifications loaded:", initialNotifications.length)
        setNotifications(initialNotifications)
      })

      // Escuchar cuando una notificación se marca como leída
      newSocket.on("notification_read", ({ notificationId }) => {
        setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)))
      })

      // Escuchar cuando todas las notificaciones se marcan como leídas
      newSocket.on("all_notifications_read", () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      })

      setSocket(newSocket)

      return () => {
        console.log("🔌 Cleaning up Socket.IO connection")
        newSocket.close()
        setSocket(null)
        setIsConnected(false)
        setConnectionError(null)
      }
    } else {
      // Si no hay usuario, limpiar la conexión
      if (socket) {
        console.log("🔌 No user, disconnecting socket")
        socket.close()
        setSocket(null)
        setIsConnected(false)
        setConnectionError(null)
      }
    }
  }, [user])

  const joinForum = () => {
    if (socket && isConnected) {
      socket.emit("join_forum")
      console.log("🏛️ Joined forum")
    }
  }

  const leaveForum = () => {
    if (socket && isConnected) {
      socket.emit("leave_forum")
      console.log("🏛️ Left forum")
    }
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const markAsRead = (notificationId) => {
    if (socket && isConnected) {
      socket.emit("mark_notification_read", { notificationId })
      // Actualización optimista
      setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)))
    }
  }

  const markAllAsRead = () => {
    if (socket && isConnected) {
      socket.emit("mark_all_notifications_read")
      // Actualización optimista
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    }
  }

  const value = {
    socket,
    isConnected,
    connectionError,
    notifications,
    joinForum,
    leaveForum,
    clearNotifications,
    markAsRead,
    markAllAsRead,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}