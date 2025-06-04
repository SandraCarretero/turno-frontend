import { AvatarImage, AvatarPlaceholder } from './UserAvatar.styles';

const UserAvatar = ({ user, size = 'default' }) => {
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : '?';

  return user?.avatar ? (
    <AvatarImage src={user.avatar} alt={user.username} $size={size} />
  ) : (
    <AvatarPlaceholder $size={size}>{initial}</AvatarPlaceholder>
  );
};

export default UserAvatar;
