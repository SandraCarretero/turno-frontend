import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Trophy } from 'lucide-react';
import {
  CardContainer,
  GameInfo,
  GameImage,
  GameDetails,
  GameTitle,
  MatchInfo,
  InfoItem,
  InfoIcon,
  InfoText,
  Players,
  Player,
  PlayerAvatar,
  PlayerName,
  WinnerBadge
} from './MatchCard.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import { AvatarPlaceholder } from '../UserAvatar/UserAvatar.styles';

const MatchCard = ({ match }) => {
  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <CardContainer as={Link} to={`/match/${match._id}`}>
      <GameInfo>
        <GameImage
          src={match.game.image || '/placeholder.svg?height=60&width=60'}
          alt={match.game.name}
        />
        <GameTitle>{match.game.name}</GameTitle>
      </GameInfo>
      <GameDetails>
        <MatchInfo>
          <InfoItem>
            <InfoIcon>
              <Calendar size={14} />
            </InfoIcon>
            <InfoText>{formatDate(match.date)}</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <Users size={14} />
            </InfoIcon>
            <InfoText>{match.players.length} jugadores</InfoText>
          </InfoItem>
        </MatchInfo>
         <Players>
        {match.players.map((player, index) => {
          const isGuest = player.user === null;
          const displayName = isGuest ? player.guestName : player.user.username;

          return (
            <Player key={player._id || index}>
              {isGuest ? (
                <AvatarPlaceholder $size="small">
                  {displayName?.charAt(0).toUpperCase() || '?'}
                </AvatarPlaceholder>
              ) : (
                <UserAvatar user={player.user} size="small" />
              )}
              {player.isWinner && (
                <WinnerBadge>
                  <Trophy size={12} />
                </WinnerBadge>
              )}
            </Player>
          );
        })}
      </Players>
      </GameDetails>
     
    </CardContainer>
  );
};

export default MatchCard;
