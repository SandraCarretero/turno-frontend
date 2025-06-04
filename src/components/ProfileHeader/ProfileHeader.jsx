import { useRef } from 'react';
import { Edit, Camera, Plus } from 'lucide-react';
import { userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HeaderContainer,
  AvatarSection,
  AvatarContainer,
  AvatarOverlay,
  UserInfo,
  Username,
  Email,
  Stats,
  StatItem,
  StatValue,
  StatLabel,
  Actions,
  ActionButton
} from './ProfileHeader.styles';
import UserAvatar from '../UserAvatar/UserAvatar';

const ProfileHeader = ({ user, onEditProfile, matches }) => {
  const fileInputRef = useRef(null);
  const { updateUser, logout } = useAuth();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // Validación del archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Solo se permiten imágenes JPEG, PNG o GIF');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe exceder los 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await userAPI.uploadAvatar(formData);

      if (response.data.success) {
        updateUser({ avatar: response.data.avatar });
        toast.success(
          response.data.message || 'Avatar actualizado correctamente'
        );
      } else {
        toast.error(response.data.message || 'Error al actualizar el avatar');
      }
    } catch (error) {
      console.error('Error al subir avatar:', error);

      let errorMessage = 'Error al subir el avatar';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      // Limpia el input de archivo
      event.target.value = '';
    }
  };

  return (
    <HeaderContainer>
      <AvatarSection>
        <AvatarContainer onClick={handleAvatarClick}>
          <UserAvatar user={user} size='big'/>

          <AvatarOverlay>
            <Camera size={20} />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </AvatarOverlay>
        </AvatarContainer>

        <UserInfo>
          <Username>{user?.username}</Username>
          <Email>{user?.email}</Email>
        </UserInfo>
      </AvatarSection>

      <Stats>
        <StatItem>
          <StatValue>{user?.games?.length || 0}</StatValue>
          <StatLabel>Games</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>
            {user?.friends?.filter(f => f.status === 'accepted').length || 0}
          </StatValue>
          <StatLabel>Friends</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{matches?.length || 0}</StatValue>
          <StatLabel>Matches</StatLabel>
        </StatItem>
      </Stats>

      <Actions>
        <ActionButton onClick={onEditProfile}>
          <Edit size={20} />
          Edit Profile
        </ActionButton>
        <ActionButton
          onClick={() => logout()}
          style={{
            border: '1px solid red',
            background: 'transparent',
            color: 'red'
          }}
        >
          Log Out
        </ActionButton>
      </Actions>
    </HeaderContainer>
  );
};

export default ProfileHeader;
