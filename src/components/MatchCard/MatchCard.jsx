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

  const formatDuration = minutes => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <CardContainer as={Link} to={`/match/${match._id}`}>
      <GameInfo>
        <GameImage
          src={match.game.image || '/placeholder.svg?height=60&width=60'}
          alt={match.game.name}
        />
        <GameDetails>
          <GameTitle>{match.game.name}</GameTitle>
          <MatchInfo>
            <InfoItem>
              <InfoIcon>
                <Calendar size={14} />
              </InfoIcon>
              <InfoText>{formatDate(match.date)}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <Clock size={14} />
              </InfoIcon>
              <InfoText>{formatDuration(match.duration)}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <MapPin size={14} />
              </InfoIcon>
              <InfoText>{match.location}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <Users size={14} />
              </InfoIcon>
              <InfoText>{match.players.length} players</InfoText>
            </InfoItem>
          </MatchInfo>
        </GameDetails>
      </GameInfo>
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

              <PlayerName>{displayName}</PlayerName>

              {player.isWinner && (
                <WinnerBadge>
                  <Trophy size={12} />
                </WinnerBadge>
              )}
            </Player>
          );
        })}
      </Players>
    </CardContainer>
  );
};

export default MatchCard;
