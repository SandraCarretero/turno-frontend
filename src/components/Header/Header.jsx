import { Link, useLocation } from "react-router-dom"
import { Bell } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useSocket } from "../../context/SocketContext"
import { HeaderContainer, Logo, LogoImg, HeaderActions, NotificationButton, NotificationBadge } from "./Header.styles"
import UserAvatar from "../UserAvatar/UserAvatar"
import { useEffect } from "react"

const Header = () => {
  const { user } = useAuth()
  const { notifications, markAllAsRead } = useSocket()
  const location = useLocation()

  const isNotificationsPage = location.pathname === "/notifications"

  const unreadCount = isNotificationsPage ? 0 : notifications.filter((n) => !n.isRead).length

  useEffect(() => {
    if (isNotificationsPage && notifications.some((n) => !n.isRead)) {
      markAllAsRead()
    }
  }, [isNotificationsPage, notifications, markAllAsRead])

  return (
    <HeaderContainer>
      <Logo to="/">Turn <LogoImg src="https://res.cloudinary.com/djxnoeo6v/image/upload/v1749129757/favicon_fgdjdv.svg"/></Logo>

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
