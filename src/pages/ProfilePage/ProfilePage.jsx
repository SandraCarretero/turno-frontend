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
  const { user } = useAuth(); 
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const targetUserId = userId || user?._id;
  const isOwnProfile = !userId || userId === user?._id;
  const isAuthLoading = !user && !userId;

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
      profileData.user._id === user?._id
    ) {
      queryClient.setQueryData(['user', user._id], profileData.user);
    }
  }, [profileData, isOwnProfile, user, queryClient]);

  useEffect(() => {
  if (targetUserId) {
    refetch();
  }
}, [targetUserId, refetch]);

  const matches = profileData?.matches || [];

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const refreshProfileData = async () => {
    await refetch();
  };

  const displayUser = profileData?.user || user;
  const displayGames = profileData?.user?.games || user?.games || [];
  const displayFriends = profileData?.user?.friends || user?.friends || [];

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
