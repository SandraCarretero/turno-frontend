import { useRef, useState } from 'react';
import { UserRoundPen, LogOut, Camera, Loader2 } from 'lucide-react';
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

const ProfileHeader = ({ user, onEditProfile, matches, games, friends, onRefresh }) => {
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
        
        // Llamar a onRefresh para actualizar los datos del perfil
        if (onRefresh) {
          onRefresh();
        }
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

  // Usar los datos pasados como props en lugar de los datos anidados del usuario
  const displayGames = games || user?.games || [];
  const displayFriends = friends || user?.friends || [];
  const displayMatches = matches || [];

  return (
    <HeaderContainer>
      <AvatarSection>
        <AvatarContainer onClick={handleAvatarClick} disabled={isUploading}>
          <UserAvatar user={user} size="big" />

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
          <Username>{user?.username}</Username>
          <Stats>
            <StatItem>
              <StatValue>{displayMatches.length}</StatValue>
              <StatLabel>Partidas</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{displayGames.length}</StatValue>
              <StatLabel>Juegos</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>
                {displayFriends.filter(f => f.status === 'accepted').length}
              </StatValue>
              <StatLabel>Amigos</StatLabel>
            </StatItem>
          </Stats>
        </UserInfo>
      </AvatarSection>

      <Actions>
        <ActionButton onClick={onEditProfile}>
          <UserRoundPen size={20} />
          Editar perfil
        </ActionButton>
        <ActionButton $variant="danger" onClick={() => logout()}>
          <LogOut size={20} />
          Salir
        </ActionButton>
      </Actions>
    </HeaderContainer>
  );
};

export default ProfileHeader;