import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  UserPlus,
  UserCheck,
  MessageCircle,
  Trophy
} from 'lucide-react';
import MatchCard from '../../components/MatchCard/MatchCard';
import toast from 'react-hot-toast';
import {
  PageContainer,
  BackButton,
  ProfileHeader,
  UserInfo,
  UserColumn,
  UserDetails,
  Username,
  UserStats,
  StatItem,
  StatValue,
  StatLabel,
  ActionButtons,
  ActionButton,
  Section,
  SectionTitle,
  MatchesList,
  LoadingText,
  ErrorMessage,
  EmptyMatches,
  FriendStatus
} from './UserProfilePage.styles';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

const UserProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => userAPI.getUserProfile(userId),
    enabled: !!userId
  });

  const sendFriendRequestMutation = useMutation({
    mutationFn: userAPI.sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', userId]);
      toast.success('Solicitud de amistad enviada');
    },
    onError: error => {
      toast.error(
        error.response?.data?.message || 'Error al enviar la solicitud'
      );
    }
  });

  const acceptFriendRequestMutation = useMutation({
    mutationFn: userAPI.acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', userId]);
      queryClient.invalidateQueries(['auth', 'me']);
      toast.success('Solicitud de amistad aceptada');
    },
    onError: error => {
      toast.error(
        error.response?.data?.message ||
          'Error al aceptar la solicitud de amistad'
      );
    }
  });

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingText>Cargando perfil...</LoadingText>
      </PageContainer>
    );
  }

  if (error || !profileData) {
    return (
      <PageContainer>
        <ErrorMessage>Error al cargar perfil</ErrorMessage>
      </PageContainer>
    );
  }

  const { user: profileUser, matches } = profileData;
  const isOwnProfile = currentUser?._id === profileUser._id;

  const friendshipStatus = () => {
    if (isOwnProfile) return 'self';

    const friendship = profileUser.friends?.find(
      f => f.user._id === currentUser._id
    );
    if (!friendship) return 'none';

    return friendship.status;
  };

  const currentUserFriendship = currentUser?.friends?.find(
    f => f.user === profileUser._id
  );
  const hasPendingRequest = currentUserFriendship?.status === 'pending';

  const status = friendshipStatus();

  const handleSendFriendRequest = () => {
    sendFriendRequestMutation.mutate(profileUser._id);
  };

  const handleAcceptFriendRequest = () => {
    acceptFriendRequestMutation.mutate(profileUser._id);
  };

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <PageContainer>
      <BackButton as={Link} to="/">
        <ArrowLeft size={20} />
        Volver
      </BackButton>

      <ProfileHeader>
        <UserInfo>
          <UserColumn>
            <UserAvatar user={profileUser} size="big" />
            {status === 'accepted' && (
              <FriendStatus status="accepted">
                <UserCheck size={16} />
                Friends
              </FriendStatus>
            )}
            {status === 'pending' && (
              <FriendStatus status="pending">
                <UserPlus size={16} />
                Pendiente
              </FriendStatus>
            )}
          </UserColumn>
          <UserDetails>
            <Username>{profileUser.username}</Username>

            <UserStats>
              <StatItem>
                <StatValue>{matches?.length || 0}</StatValue>
                <StatLabel>Partidas</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{profileUser.games?.length || 0}</StatValue>
                <StatLabel>Juegos</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  {profileUser.friends?.filter(f => f.status === 'accepted')
                    .length || 0}
                </StatValue>
                <StatLabel>Amigos</StatLabel>
              </StatItem>
            </UserStats>
          </UserDetails>
        </UserInfo>

        {!isOwnProfile && (
          <ActionButtons>
            {status === 'none' && (
              <ActionButton
                onClick={handleSendFriendRequest}
                disabled={sendFriendRequestMutation.isLoading}
              >
                <UserPlus size={16} />
                {sendFriendRequestMutation.isLoading
                  ? 'Sending...'
                  : 'Add Friend'}
              </ActionButton>
            )}

            {hasPendingRequest && (
              <ActionButton
                onClick={handleAcceptFriendRequest}
                disabled={acceptFriendRequestMutation.isLoading}
              >
                <UserCheck size={16} />
                {acceptFriendRequestMutation.isLoading
                  ? 'Accepting...'
                  : 'Accept Request'}
              </ActionButton>
            )}
          </ActionButtons>
        )}
      </ProfileHeader>

      <Section>
        <SectionTitle>
          <Trophy size={20} />
          Partidas ({matches?.length || 0})
        </SectionTitle>

        {matches && matches.length > 0 ? (
          <MatchesList>
            {matches.slice(0, 10).map(match => (
              <MatchCard key={match._id} match={match} />
            ))}
          </MatchesList>
        ) : (
          <EmptyMatches>
            <p>
              {isOwnProfile
                ? 'No tienes partidas'
                : `${profileUser.username} no tiene partidas`}{' '}
              guardadas todavía
            </p>
          </EmptyMatches>
        )}
      </Section>
    </PageContainer>
  );
};

export default UserProfilePage;
