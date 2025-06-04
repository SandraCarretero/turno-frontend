import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Star,
  MessageSquare,
  LinkIcon,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  PageContainer,
  BackButton,
  MatchHeader,
  GameInfo,
  GameImage,
  GameDetails,
  GameTitle,
  MatchMeta,
  MetaItem,
  ActionButtons,
  ActionButton,
  MatchContent,
  Section,
  SectionTitle,
  PlayersGrid,
  PlayerCard,
  PlayerInfo,
  PlayerName,
  WinnerBadge,
  MatchNotes,
  LoadingText,
  ErrorMessage,
  DeleteModal,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButtons,
  ModalButton
} from './MatchDetailPage.styles';
import { AvatarPlaceholder } from '../../components/UserAvatar/UserAvatar.styles';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

const MatchDetailPage = () => {
  const { matchId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: match,
    isLoading,
    error
  } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchAPI.getMatch(matchId),
    enabled: !!matchId
  });

  const deleteMatchMutation = useMutation({
    mutationFn: matchAPI.deleteMatch,
    onSuccess: () => {
      toast.success('Match deleted successfully!');
      queryClient.invalidateQueries(['userMatches']);
      navigate('/profile');
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Failed to delete match');
    }
  });

  const handleDeleteMatch = () => {
    deleteMatchMutation.mutate(matchId);
    setShowDeleteModal(false);
  };

  const getPlayerName = player => {
    if (player.user && player.user.username) {
      return player.user.username;
    }
    if (player.guestName) {
      return player.guestName;
    }
    return 'Unknown Player';
  };

  const getPlayerAvatar = player => {
    if (player.user && player.user.avatar) {
      return player.user.avatar;
    }
    if (player.guestAvatar) {
      return player.guestAvatar;
    }
    return null;
  };

  const isGuest = player => {
    return !player.user && (player.guestName || player.guest);
  };

  const isSyncedGuest = player => {
    return player.user && (player.guest || player.guestName);
  };

  const getPlayersByTeam = () => {
    if (!match?.isTeamGame) return null;

    const teams = {};
    match.players.forEach(player => {
      const teamName = player.team || 'No Team';
      if (!teams[teamName]) {
        teams[teamName] = [];
      }
      teams[teamName].push(player);
    });
    return teams;
  };

  const getCooperativeResult = () => {
    if (!match?.isCooperative) return null;
    const hasWinners = match.players.some(player => player.isWinner);
    return hasWinners;
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingText>Loading match details...</LoadingText>
      </PageContainer>
    );
  }

  if (error || !match) {
    return (
      <PageContainer>
        <ErrorMessage>Failed to load match details</ErrorMessage>
      </PageContainer>
    );
  }

  const isCreator = match.creator._id === user?._id;
  const isParticipant = match.players.some(p => p.user?._id === user?._id);
  const winners = match.players.filter(player => player.isWinner);
  const playersByTeam = getPlayersByTeam();
  const cooperativeResult = getCooperativeResult();

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = minutes => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'in-progress':
        return '#ffc107';
      case 'scheduled':
        return '#007bff';
      default:
        return '#6c757d';
    }
  };

  const getTeamColor = teamName => {
    const colors = {
      'Team A': '#007bff',
      'Team B': '#28a745',
      'Team C': '#ffc107',
      'Team D': '#dc3545'
    };
    return colors[teamName] || '#6c757d';
  };

  return (
    <PageContainer>
      <BackButton as={Link} to="/profile">
        <ArrowLeft size={20} />
        Back to Profile
      </BackButton>

      <MatchHeader>
        <GameInfo>
          <GameImage
            src={match.game.image || '/placeholder.svg?height=80&width=80'}
            alt={match.game.name}
          />
          <GameDetails>
            <GameTitle>{match.game.name}</GameTitle>
            <MatchMeta>
              <MetaItem>
                <Calendar size={16} />
                {formatDate(match.date)}
              </MetaItem>
              <MetaItem>
                <Clock size={16} />
                {formatDuration(match.duration)}
              </MetaItem>
              <MetaItem>
                <MapPin size={16} />
                {match.location}
              </MetaItem>
              <MetaItem>
                <Users size={16} />
                {match.players.length} players
              </MetaItem>
              <MetaItem style={{ color: getStatusColor(match.status) }}>
                <Star size={16} />
                {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
              </MetaItem>
            </MatchMeta>
          </GameDetails>
        </GameInfo>

        {(isCreator || isParticipant) && (
          <ActionButtons>
            {isCreator && (
              <>
                <ActionButton
                  variant="secondary"
                  as={Link}
                  to={`/matches/${matchId}/edit`}
                >
                  <Edit size={16} />
                  Edit Match
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 size={16} />
                  Delete
                </ActionButton>
              </>
            )}
          </ActionButtons>
        )}
      </MatchHeader>

      <MatchContent>
        <Section>
          <SectionTitle>
            <Users size={20} />
            Players & Results
          </SectionTitle>

          {/* Cooperative Game Result */}
          {match.isCooperative && (
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: cooperativeResult ? '#d4edda' : '#f8d7da',
                border: `1px solid ${
                  cooperativeResult ? '#c3e6cb' : '#f5c6cb'
                }`,
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Trophy
                  size={20}
                  style={{ color: cooperativeResult ? '#28a745' : '#dc3545' }}
                />
                <h3
                  style={{
                    margin: 0,
                    color: cooperativeResult ? '#155724' : '#721c24'
                  }}
                >
                  {cooperativeResult ? '🎉 Team Victory!' : '😞 Team Defeat'}
                </h3>
              </div>
              <p
                style={{
                  margin: '0.5rem 0 0 0',
                  color: cooperativeResult ? '#155724' : '#721c24'
                }}
              >
                All players {cooperativeResult ? 'won' : 'lost'} together in
                this cooperative game
              </p>
            </div>
          )}

          {/* Team Game Display */}
          {match.isTeamGame && playersByTeam ? (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {Object.entries(playersByTeam).map(([teamName, teamPlayers]) => {
                const teamWon = teamPlayers.some(player => player.isWinner);
                return (
                  <div
                    key={teamName}
                    style={{
                      padding: '1rem',
                      backgroundColor: teamWon ? '#d4edda' : '#f8f9fa',
                      border: `2px solid ${
                        teamWon ? '#28a745' : getTeamColor(teamName)
                      }`,
                      borderRadius: '8px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <Shield
                        size={20}
                        style={{ color: getTeamColor(teamName) }}
                      />
                      <h4 style={{ margin: 0, color: getTeamColor(teamName) }}>
                        {teamName}
                      </h4>
                      {teamWon && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          <Trophy size={12} />
                          WINNERS
                        </div>
                      )}
                    </div>
                    <PlayersGrid>
                      {teamPlayers.map((player, index) => {
                        const displayName = getPlayerName(player);
                        const isGuestPlayer = isGuest(player);
                        const isSynced = isSyncedGuest(player);

                        return (
                          <PlayerCard
                            key={player._id || index}
                            $isWinner={player.isWinner}
                          >
                            <PlayerInfo>
                              {isGuestPlayer ? (
                                <AvatarPlaceholder $size="small">
                                  {displayName?.charAt(0).toUpperCase() || '?'}
                                </AvatarPlaceholder>
                              ) : (
                                <UserAvatar user={player.user} size="small" />
                              )}

                              <div style={{ flex: 1 }}>
                                <PlayerName>{displayName}</PlayerName>
                                <div
                                  style={{ fontSize: '0.75rem', color: '#666' }}
                                >
                                  Score: {player.score}
                                </div>

                                {isGuestPlayer && (
                                  <span
                                    style={{
                                      fontSize: '0.7rem',
                                      color: '#666',
                                      display: 'block',
                                      marginTop: '-2px'
                                    }}
                                  >
                                    Guest
                                  </span>
                                )}

                                {isSynced && (
                                  <span
                                    style={{
                                      fontSize: '0.7rem',
                                      color: '#28a745',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '2px',
                                      marginTop: '-2px'
                                    }}
                                  >
                                    <LinkIcon size={10} />
                                    Synced User
                                  </span>
                                )}
                              </div>
                            </PlayerInfo>
                          </PlayerCard>
                        );
                      })}
                    </PlayersGrid>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Regular Game Display */
            <PlayersGrid>
              {match.players.map((player, index) => {
                const displayName = getPlayerName(player);
                const isGuestPlayer = isGuest(player);
                const isSynced = isSyncedGuest(player);

                return (
                  <PlayerCard
                    key={player._id || index}
                    $isWinner={player.isWinner}
                  >
                    <PlayerInfo>
                      {isGuestPlayer ? (
                        <AvatarPlaceholder $size="small">
                          {displayName?.charAt(0).toUpperCase() || '?'}
                        </AvatarPlaceholder>
                      ) : (
                        <UserAvatar user={player.user} size="small" />
                      )}

                      <div style={{ flex: 1 }}>
                        <PlayerName>{displayName}</PlayerName>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>
                          Score: {player.score}
                        </div>

                        {isGuestPlayer && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: '#666',
                              display: 'block',
                              marginTop: '-2px'
                            }}
                          >
                            Guest
                          </span>
                        )}

                        {isSynced && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: '#28a745',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                              marginTop: '-2px'
                            }}
                          >
                            <LinkIcon size={10} />
                            Synced User
                          </span>
                        )}
                      </div>

                      {player.isWinner && !match.isCooperative && (
                        <WinnerBadge>
                          <Trophy size={12} />
                        </WinnerBadge>
                      )}
                    </PlayerInfo>
                  </PlayerCard>
                );
              })}
            </PlayersGrid>
          )}

          {/* Individual Winners Display (for non-team, non-cooperative games) */}
          {winners.length > 0 && !match.isTeamGame && !match.isCooperative && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <p style={{ color: '#28a745', fontWeight: '600' }}>
                🎉 {winners.length === 1 ? 'Winner' : 'Winners'}:{' '}
                {winners
                  .map(w => {
                    const displayName = getPlayerName(w);
                    return displayName;
                  })
                  .join(', ')}
              </p>
            </div>
          )}
        </Section>

        {match.notes && (
          <Section>
            <SectionTitle>
              <MessageSquare size={20} />
              Notes
            </SectionTitle>
            <MatchNotes>{match.notes}</MatchNotes>
          </Section>
        )}

        <Section>
          <SectionTitle>Match Details</SectionTitle>
          <div
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}
            >
              <div>
                <strong>Created by:</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6c757d' }}>
                  <Link
                    to={`/user/${match.creator._id}`}
                    style={{ color: '#007bff', textDecoration: 'none' }}
                  >
                    {match.creator.username}
                  </Link>
                </p>
              </div>
              <div>
                <strong>Game Type:</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6c757d' }}>
                  {match.isCooperative
                    ? 'Cooperative'
                    : match.isTeamGame
                    ? 'Team Game'
                    : 'Competitive'}
                </p>
              </div>
              <div>
                <strong>Has Winner:</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6c757d' }}>
                  {match.hasWinner ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <strong>Created:</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6c757d' }}>
                  {new Date(match.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Section>
      </MatchContent>

      {showDeleteModal && (
        <DeleteModal>
          <ModalOverlay onClick={() => setShowDeleteModal(false)} />
          <ModalContent>
            <ModalTitle>Delete Match</ModalTitle>
            <ModalText>
              Are you sure you want to delete this match? This action cannot be
              undone.
            </ModalText>
            <ModalButtons>
              <ModalButton
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </ModalButton>
              <ModalButton
                variant="danger"
                onClick={handleDeleteMatch}
                disabled={deleteMatchMutation.isLoading}
              >
                {deleteMatchMutation.isLoading ? 'Deleting...' : 'Delete'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </DeleteModal>
      )}
    </PageContainer>
  );
};

export default MatchDetailPage;
