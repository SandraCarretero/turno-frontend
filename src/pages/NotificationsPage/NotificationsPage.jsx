import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationAPI, userAPI } from '../../services/api';
import NotificationItem from '../../components/NotificationItem/NotificationItem';
import toast from 'react-hot-toast';
import {
  PageContainer,
  Header,
  Title,
  NotificationsList,
  LoadingText,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription
} from './NotificationsPage.styles';
import { useEffect } from 'react';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationAPI.getNotifications
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationAPI.markAllAsRead,
    onSuccess: () => {
      // Actualizar el caché para reflejar que todas las notificaciones están leídas
      queryClient.setQueryData(['notifications'], oldData => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          unreadCount: 0,
          notifications: oldData.notifications.map(notification => ({
            ...notification,
            read: true
          }))
        };
      });

      // Invalidar múltiples queries relacionadas con notificaciones
      queryClient.invalidateQueries(['notificationCount']);
      queryClient.invalidateQueries(['unreadNotifications']);
      queryClient.invalidateQueries(['userStats']);

      // También actualizar directamente el contador si existe en el caché
      queryClient.setQueryData(['notificationCount'], 0);
      queryClient.setQueryData(['unreadNotifications'], []);
    },
    onError: () => {
      toast.error('Failed to mark notifications as read');
    }
  });

  useEffect(() => {
    // Solo marcar como leídas si hay notificaciones sin leer
    if (notificationsData && notificationsData.unreadCount > 0) {
      // Pequeño delay para asegurar que la UI se renderice primero
      const timer = setTimeout(() => {
        markAllAsReadMutation.mutate();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [notificationsData]); // Dependencia más específica

  const acceptFriendRequestMutation = useMutation({
    mutationFn: userAPI.acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notificationCount']);
      toast.success('Friend request accepted');
    },
    onError: () => {
      toast.error('Failed to accept friend request');
    }
  });

  const handleAcceptFriendRequest = senderId => {
    acceptFriendRequestMutation.mutate(senderId);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingText>Loading notifications...</LoadingText>
      </PageContainer>
    );
  }

  const notifications = notificationsData?.notifications || [];
  const unreadCount = notificationsData?.unreadCount || 0;

  return (
    <PageContainer>
      <Header>
        <Title>
          Notifications
          {unreadCount > 0 && <span> ({unreadCount} unread)</span>}
        </Title>
      </Header>

      {notifications.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🔔</EmptyIcon>
          <EmptyTitle>No notifications yet</EmptyTitle>
          <EmptyDescription>
            When you receive notifications, they'll appear here.
          </EmptyDescription>
        </EmptyState>
      ) : (
        <NotificationsList>
          {notifications.map(notification => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onAcceptFriendRequest={handleAcceptFriendRequest}
            />
          ))}
        </NotificationsList>
      )}
    </PageContainer>
  );
};

export default NotificationsPage;
