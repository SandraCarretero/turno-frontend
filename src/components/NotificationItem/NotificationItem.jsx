import { Link } from 'react-router-dom';
import { Clock, UserPlus, Trophy, MessageCircle, Users } from 'lucide-react';
import {
  NotificationContainer,
  NotificationContent,
  NotificationHeader,
  SenderInfo,
  SenderName,
  NotificationTime,
  NotificationIcon,
  NotificationBody,
  NotificationMessage,
  NotificationActions,
  ActionButton
} from './NotificationItem.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useState } from 'react';

const NotificationItem = ({ notification, onAcceptFriendRequest }) => {
  const [accepted, setAccepted] = useState(false);

  const formatTime = date => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = type => {
    switch (type) {
      case 'friend_request':
        return <UserPlus size={20} />;
      case 'friend_accepted':
        return <Users size={20} />;
      case 'match_invitation':
        return <MessageCircle size={20} />;
      case 'match_added':
        return <Trophy size={20} />;
      default:
        return <MessageCircle size={20} />;
    }
  };

  const getNotificationColor = type => {
    switch (type) {
      case 'friend_request':
        return '#470E5C';
      case 'friend_accepted':
        return '#1AB3A6';
      case 'match_invitation':
        return '#ffc107';
      case 'match_added':
        return '#ff611a';
      default:
        return '#6c757d';
    }
  };

  const getNotificationLink = () => {
    if (notification.type === 'match_added' && notification.data?.matchId) {
      return `/match/${notification.data.matchId}`;
    }
    if (notification.type.includes('friend')) {
      return `/user/${notification.sender._id}`;
    }
    return null;
  };

  const handleAccept = async e => {
    e.preventDefault();
    e.stopPropagation();

    await onAcceptFriendRequest(notification.sender._id);
    setAccepted(true);
  };

  const link = getNotificationLink();
  const Container = link ? Link : 'div';
  const containerProps = link ? { to: link } : {};

  return (
    <NotificationContainer as={Container} {...containerProps}>
      <NotificationContent>
        <NotificationHeader>
          <SenderInfo>
            <UserAvatar user={notification.sender} />
            <div>
              <SenderName>{notification.sender.username}</SenderName>
              <NotificationTime>
                <Clock size={12} />
                {formatTime(notification.createdAt)}
              </NotificationTime>
            </div>
          </SenderInfo>

          <NotificationIcon color={getNotificationColor(notification.type)}>
            {getNotificationIcon(notification.type)}
          </NotificationIcon>
        </NotificationHeader>

        <NotificationBody>
          <NotificationMessage>{notification.message}</NotificationMessage>
        </NotificationBody>

        <NotificationActions>
          {notification.type === 'friend_request' && !accepted && (
            <ActionButton onClick={handleAccept}>
              <UserPlus size={14} />
              Aceptar
            </ActionButton>
          )}
        </NotificationActions>
      </NotificationContent>
    </NotificationContainer>
  );
};

export default NotificationItem;
