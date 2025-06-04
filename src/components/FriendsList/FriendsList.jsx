import UserAvatar from '../UserAvatar/UserAvatar';
import {
  EmptyState,
  FriendsContainer,
  Friends
} from './FriendsList.styles';

const FriendsList = ({ friends }) => {
  if (!friends || friends.length === 0) {
    return (
      <EmptyState>
        <h3>No friends yet</h3>
      </EmptyState>
    );
  }

  return (
    <FriendsContainer>
      <ul>
        {friends
          .filter(friend => friend.status === 'accepted') 
          .map(friend => (
            <Friends key={friend._id}>
              <UserAvatar user={friend.user} />

              <span>{friend.user.username}</span>
            </Friends>
          ))}
      </ul>
    </FriendsContainer>
  );
};

export default FriendsList;
