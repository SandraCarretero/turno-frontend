import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      const newSocket = io('http://localhost:5000', {
        auth: { token }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('notification', notification => {
        setNotifications(prev => [notification, ...prev]);
        toast.success(notification.message);
      });

      newSocket.on('initial_notifications', initialNotifications => {
        setNotifications(initialNotifications);
      });

      // Escuchar cuando una notificación se marca como leída
      newSocket.on('notification_read', ({ notificationId }) => {
        setNotifications(prev =>
          prev.map(n => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
      });

      // Escuchar cuando todas las notificaciones se marcan como leídas
      newSocket.on('all_notifications_read', () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const joinForum = () => {
    if (socket) {
      socket.emit('join_forum');
    }
  };

  const leaveForum = () => {
    if (socket) {
      socket.emit('leave_forum');
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = notificationId => {
    if (socket) {
      socket.emit('mark_notification_read', { notificationId });
      // Actualización optimista
      setNotifications(prev =>
        prev.map(n => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    }
  };

  // Nueva función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    if (socket) {
      socket.emit('mark_all_notifications_read');
      // Actualización optimista
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  };

  const value = {
    socket,
    notifications,
    joinForum,
    leaveForum,
    clearNotifications,
    markAsRead,
    markAllAsRead
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
