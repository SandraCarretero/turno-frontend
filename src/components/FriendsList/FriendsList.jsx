import { useNavigate } from 'react-router-dom';
import UserAvatar from '../UserAvatar/UserAvatar';
import { EmptyState, FriendsContainer, Friends } from './FriendsList.styles';

const FriendsList = ({ friends }) => {
  if (!friends || friends.length === 0) {
    return (
      <EmptyState>
        <h3>No friends yet</h3>
      </EmptyState>
    );
  }

  const navigate = useNavigate();

  const handleClick = friend => {
    navigate(`/user/${friend.user._id}`);
  };

  return (
    <FriendsContainer>
      <ul>
        {friends
          .filter(friend => friend.status === 'accepted')
          .map(friend => (
            <Friends key={friend._id} onClick={() => handleClick(friend)}>
              <UserAvatar user={friend.user} />

              <span>{friend.user.username}</span>
            </Friends>
          ))}
      </ul>
    </FriendsContainer>
  );
};

export default FriendsList;
