import { useRef, useState } from 'react';
import { Edit, Camera, Loader2 } from 'lucide-react';
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

const ProfileHeader = ({ user, onEditProfile, matches, onRefresh }) => {
  const fileInputRef = useRef(null);
  const { updateUser, user: authUser, logout } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error('Solo se permiten imágenes JPEG, PNG, GIF o WebP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe exceder los 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setIsUploading(true);

    try {
      const response = await userAPI.uploadAvatar(formData);

      if (response.data && response.data.success) {
        updateUser({
          ...authUser,
          avatar: response.data.avatar || response.data.data?.url
        });

        toast.success(
          response.data.message || 'Avatar actualizado correctamente'
        );
      } else {
        throw new Error(response.data?.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error completo al subir avatar:', error);

      let errorMessage = 'Error al subir el avatar';

      if (error.response) {
        console.error('Error response:', error.response);

        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data?.message || 'Solicitud inválida';
            break;
          case 401:
            errorMessage =
              'Sesión expirada. Por favor, inicia sesión nuevamente';
            break;
          case 413:
            errorMessage = 'El archivo es demasiado grande';
            break;
          case 500:
            errorMessage = 'Error del servidor. Intenta nuevamente';
            break;
          default:
            errorMessage =
              error.response.data?.message || `Error ${error.response.status}`;
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = 'No se pudo conectar con el servidor';
      } else {
        console.error('Error message:', error.message);
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const displayUser = user?._id === authUser?._id ? authUser : user;

  return (
    <HeaderContainer>
      <AvatarSection>
        <AvatarContainer onClick={handleAvatarClick} disabled={isUploading}>
          <UserAvatar user={displayUser} size="big" />

          <AvatarOverlay $isUploading={isUploading}>
            {isUploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Camera size={20} />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleAvatarChange}
              disabled={isUploading}
              style={{ display: 'none' }}
            />
          </AvatarOverlay>
        </AvatarContainer>

        <UserInfo>
          <Username>{displayUser?.username}</Username>
          <Email>{displayUser?.email}</Email>
        </UserInfo>
      </AvatarSection>

      <Stats>
        <StatItem>
          <StatValue>{displayUser?.games?.length || 0}</StatValue>
          <StatLabel>Games</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>
            {displayUser?.friends?.filter(f => f.status === 'accepted')
              .length || 0}
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
