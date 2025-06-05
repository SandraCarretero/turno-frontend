import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import MatchList from '../../components/MatchList/MatchList';
import GameCollection from '../../components/GameCollection/GameCollection';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import { PageContainer } from './ProfilePage.styles';
import FriendsList from '../../components/FriendsList/FriendsList';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [showEditModal, setShowEditModal] = useState(false);
  const { user: authUser } = useAuth();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const targetUserId = userId || authUser?._id;
  const isOwnProfile = !userId || userId === authUser?._id;

  const {
    data: profileData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['userProfile', targetUserId],
    queryFn: () => userAPI.getUserProfile(targetUserId),
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (
      profileData?.user &&
      isOwnProfile &&
      profileData.user._id === authUser?._id
    ) {
      queryClient.setQueryData(['user', authUser._id], profileData.user);
    }
  }, [profileData, isOwnProfile, authUser, queryClient]);

  useEffect(() => {
    if (targetUserId) {
      refetch();
    }
  }, [targetUserId, refetch]);

  useEffect(() => {
    if (isOwnProfile && authUser) {
      console.log('Usuario autenticado actualizado, refrescando perfil...');
      refetch();
    }
  }, [authUser, isOwnProfile, refetch]);

  const matches = profileData?.matches || [];

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const refreshProfileData = async () => {
    queryClient.invalidateQueries(['userProfile', targetUserId]);
    queryClient.invalidateQueries(['user', targetUserId]);
    await refetch();
  };

  const displayUser = isOwnProfile && authUser ? authUser : profileData?.user;
  const displayGames = profileData?.user?.games || authUser?.games || [];
  const displayFriends = profileData?.user?.friends || authUser?.friends || [];

  if (isLoading && !displayUser) {
    return (
      <PageContainer>
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>Cargando perfil...</div>
      </PageContainer>
    )
  }

  if (error && !displayUser) {
    return (
      <PageContainer>
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>Error al cargar el perfil</div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <ProfileHeader
        user={displayUser}
        onEditProfile={isOwnProfile ? handleEditProfile : undefined}
        matches={matches}
        onRefresh={refreshProfileData}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'matches' && (
        <MatchList matches={matches} loading={isLoading} />
      )}

      {activeTab === 'games' && (
        <GameCollection games={displayGames} loading={isLoading} />
      )}

      {activeTab === 'friends' && (
        <FriendsList friends={displayFriends} loading={isLoading} />
      )}

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          onSuccess={refreshProfileData}
        />
      )}
    </PageContainer>
  );
};

export default ProfilePage;
