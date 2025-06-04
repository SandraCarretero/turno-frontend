import { Link, useLocation } from "react-router-dom"
import { Bell } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useSocket } from "../../context/SocketContext"
import { HeaderContainer, Logo, HeaderActions, NotificationButton, NotificationBadge } from "./Header.styles"
import UserAvatar from "../UserAvatar/UserAvatar"
import { useEffect } from "react"

const Header = () => {
  const { user } = useAuth()
  const { notifications, markAllAsRead } = useSocket()
  const location = useLocation()

  // Determinar si estamos en la página de notificaciones
  const isNotificationsPage = location.pathname === "/notifications"

  // Calcular el número de notificaciones no leídas
  // Si estamos en la página de notificaciones, forzar a 0
  const unreadCount = isNotificationsPage ? 0 : notifications.filter((n) => !n.isRead).length

  // Marcar todas las notificaciones como leídas cuando entramos a la página de notificaciones
  useEffect(() => {
    if (isNotificationsPage && notifications.some((n) => !n.isRead)) {
      markAllAsRead()
    }
  }, [isNotificationsPage, notifications, markAllAsRead])

  return (
    <HeaderContainer>
      <Logo to="/">Boardify</Logo>

      <HeaderActions>
        <Link to="/notifications">
          <NotificationButton>
            <Bell size={20} />
            {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
          </NotificationButton>
        </Link>

        <Link to="/profile">
          <UserAvatar user={user} size="small" />
        </Link>
      </HeaderActions>
    </HeaderContainer>
  )
}

export default Header
