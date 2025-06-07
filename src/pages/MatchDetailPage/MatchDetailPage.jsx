'use client';

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
  GameImageContainer,
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
  PlayerScore,
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
  ModalButton,
  TeamContainer,
  TeamHeader,
  TeamName,
  TeamWinnerBadge,
  CooperativeResult,
  CooperativeIcon,
  CooperativeTitle,
  CooperativeText,
  MatchDetailsGrid,
  MatchDetailItem,
  MatchDetailLabel,
  MatchDetailValue,
  MatchDetailLink,
  GuestBadge,
  SyncedBadge,
  WinnersDisplay,
  GameRating,
  GameTitleSection,
  GameSubtitle,
  MatchMetaGrid
} from './MatchDetailPage.styles';
import { AvatarPlaceholder } from '../../components/UserAvatar/UserAvatar.styles';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import Loader from '../../components/Loader/Loader';

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
      toast.success('¡Partida eliminada con éxito!');
      queryClient.invalidateQueries(['userMatches']);
      navigate('/profile');
    },
    onError: error => {
      toast.error(
        error.response?.data?.message || 'Error al eliminar la partida'
      );
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
    return 'Jugador Desconocido';
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
      const teamName = player.team || 'Sin Equipo';
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
        <LoadingText>Cargando detalles de la partida...</LoadingText>
        <Loader />
      </PageContainer>
    );
  }

  if (error || !match) {
    return (
      <PageContainer>
        <ErrorMessage>Error al cargar los detalles de la partida</ErrorMessage>
      </PageContainer>
    );
  }

  const isCreator = match.creator._id === user?._id;
  const isParticipant = match.players.some(p => p.user?._id === user?._id);
  const winners = match.players.filter(player => player.isWinner);
  const playersByTeam = getPlayersByTeam();
  const cooperativeResult = getCooperativeResult();

  const formatDate = date => {
    return new Date(date).toLocaleDateString('es-ES', {
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
        Volver al Perfil
      </BackButton>

      <MatchHeader>
        <GameInfo>
          <GameImageContainer>
            <GameImage
              src={
                match.game.image ||
                '/placeholder.svg?height=180&width=180&query=board game'
              }
              alt={match.game.name}
            />
            {match.game.rating && (
              <GameRating>
                <Star size={14} />
                {match.game.rating.toFixed(1)}
              </GameRating>
            )}
          </GameImageContainer>

          <GameDetails>
            <GameTitleSection>
              <GameTitle>{match.game.name}</GameTitle>
              <GameSubtitle>
                Partida jugada el {formatDate(match.date)}
              </GameSubtitle>
            </GameTitleSection>

            <MatchMetaGrid>
              <MatchMeta>
                <MetaItem>
                  <Calendar size={18} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {formatDate(match.date)}
                    </div>
                  </div>
                </MetaItem>
                <MetaItem>
                  <Clock size={18} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {formatDuration(match.duration)}
                    </div>
                  </div>
                </MetaItem>
                <MetaItem>
                  <MapPin size={18} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {match.location}
                    </div>
                  </div>
                </MetaItem>
                <MetaItem>
                  <Users size={18} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {match.players.length} participantes
                    </div>
                  </div>
                </MetaItem>
                <MetaItem $statusColor={getStatusColor(match.status)}>
                  <Star size={18} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {match.status === 'completed'
                        ? 'Completada'
                        : match.status === 'in-progress'
                        ? 'En Progreso'
                        : 'Programada'}
                    </div>
                  </div>
                </MetaItem>
                <MetaItem>
                  <Trophy size={18} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {match.isCooperative
                        ? 'Cooperativo'
                        : match.isTeamGame
                        ? 'Por Equipos'
                        : 'Competitivo'}
                    </div>
                  </div>
                </MetaItem>
              </MatchMeta>
            </MatchMetaGrid>
          </GameDetails>

          {(isCreator || isParticipant) && (
            <ActionButtons>
              {isCreator && (
                <>
                  <ActionButton
                    $variant="secondary"
                    as={Link}
                    to={`/matches/${matchId}/edit`}
                  >
                    <Edit size={16} />
                    Editar
                  </ActionButton>
                  <ActionButton
                    $variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </ActionButton>
                </>
              )}
            </ActionButtons>
          )}
        </GameInfo>
      </MatchHeader>

      <MatchContent>
        <Section>
          <SectionTitle>
            <Users size={20} />
            Jugadores y Resultados
          </SectionTitle>

          {/* Cooperative Game Result */}
          {match.isCooperative && (
            <CooperativeResult $success={cooperativeResult}>
              {cooperativeResult && (
                <CooperativeIcon>
                  <Trophy size={24} />
                </CooperativeIcon>
              )}
              <div>
                <CooperativeTitle>
                  {cooperativeResult
                    ? '¡Victoria del Equipo!'
                    : 'Derrota del Equipo'}
                </CooperativeTitle>
                <CooperativeText>
                  Todos los jugadores{' '}
                  {cooperativeResult ? 'ganaron' : 'perdieron'} juntos en esta
                  partida cooperativa
                </CooperativeText>
              </div>
            </CooperativeResult>
          )}

          {/* Team Game Display */}
          {match.isTeamGame && playersByTeam ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {Object.entries(playersByTeam).map(([teamName, teamPlayers]) => {
                const teamWon = teamPlayers.some(player => player.isWinner);
                return (
                  <TeamContainer
                    key={teamName}
                    $isWinner={teamWon}
                    $teamColor={getTeamColor(teamName)}
                  >
                    <TeamHeader>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <Shield size={20} />
                        <TeamName>{teamName}</TeamName>
                      </div>
                      {teamWon && (
                        <TeamWinnerBadge>
                          <Trophy size={12} />
                          GANADORES
                        </TeamWinnerBadge>
                      )}
                    </TeamHeader>
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
                                <PlayerScore>
                                  Puntuación: {player.score}
                                </PlayerScore>

                                {isGuestPlayer && (
                                  <GuestBadge>Invitado</GuestBadge>
                                )}
                                {isSynced && (
                                  <SyncedBadge>
                                    <LinkIcon size={10} />
                                    Usuario Sincronizado
                                  </SyncedBadge>
                                )}
                              </div>
                            </PlayerInfo>
                          </PlayerCard>
                        );
                      })}
                    </PlayersGrid>
                  </TeamContainer>
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
                        <PlayerScore>Puntuación: {player.score}</PlayerScore>

                        {isGuestPlayer && <GuestBadge>Invitado</GuestBadge>}
                        {isSynced && (
                          <SyncedBadge>
                            <LinkIcon size={10} />
                            Usuario Sincronizado
                          </SyncedBadge>
                        )}
                      </div>

                      {player.isWinner && !match.isCooperative && (
                        <WinnerBadge>
                          <Trophy size={12} />
                          GANADOR
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
            <WinnersDisplay>
              🎉 {winners.length === 1 ? 'Ganador' : 'Ganadores'}:{' '}
              {winners
                .map(w => {
                  const displayName = getPlayerName(w);
                  return displayName;
                })
                .join(', ')}
            </WinnersDisplay>
          )}
        </Section>

        {match.notes && (
          <Section>
            <SectionTitle>
              <MessageSquare size={20} />
              Notas
            </SectionTitle>
            <MatchNotes>{match.notes}</MatchNotes>
          </Section>
        )}

        <Section>
          <SectionTitle>Detalles de la Partida</SectionTitle>
          <MatchDetailsGrid>
            <MatchDetailItem>
              <MatchDetailLabel>Creado por:</MatchDetailLabel>
              <MatchDetailValue>
                <MatchDetailLink to={`/user/${match.creator._id}`}>
                  {match.creator.username}
                </MatchDetailLink>
              </MatchDetailValue>
            </MatchDetailItem>
            <MatchDetailItem>
              <MatchDetailLabel>Tipo de Juego:</MatchDetailLabel>
              <MatchDetailValue>
                {match.isCooperative
                  ? 'Cooperativo'
                  : match.isTeamGame
                  ? 'Por Equipos'
                  : 'Competitivo'}
              </MatchDetailValue>
            </MatchDetailItem>
            <MatchDetailItem>
              <MatchDetailLabel>Tiene Ganador:</MatchDetailLabel>
              <MatchDetailValue>
                {match.hasWinner ? 'Sí' : 'No'}
              </MatchDetailValue>
            </MatchDetailItem>
            <MatchDetailItem>
              <MatchDetailLabel>Creado:</MatchDetailLabel>
              <MatchDetailValue>
                {new Date(match.createdAt).toLocaleDateString()}
              </MatchDetailValue>
            </MatchDetailItem>
          </MatchDetailsGrid>
        </Section>
      </MatchContent>

      {showDeleteModal && (
        <DeleteModal>
          <ModalOverlay onClick={() => setShowDeleteModal(false)} />
          <ModalContent>
            <ModalTitle>Eliminar Partida</ModalTitle>
            <ModalText>
              ¿Estás seguro de que quieres eliminar esta partida? Esta acción no
              se puede deshacer.
            </ModalText>
            <ModalButtons>
              <ModalButton
                $variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </ModalButton>
              <ModalButton
                $variant="danger"
                onClick={handleDeleteMatch}
                disabled={deleteMatchMutation.isLoading}
              >
                {deleteMatchMutation.isLoading ? 'Eliminando...' : 'Eliminar'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </DeleteModal>
      )}
    </PageContainer>
  );
};

export default MatchDetailPage;
