import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { X, Search, Users, Calendar, Trophy, Shield } from 'lucide-react';
import { matchAPI, gameAPI, userAPI, guestAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  PageContainer,
  Title,
  Form,
  Section,
  SectionTitle,
  InputGroup,
  Label,
  Input,
  Select,
  TextArea,
  GameSearchContainer,
  GameSearchInput,
  GameSearchResults,
  GameSearchResult,
  GameImage,
  GameInfo,
  GameName,
  GameMeta,
  SelectedGame,
  PlayersSection,
  PlayersList,
  PlayerItem,
  PlayerInfo,
  PlayerName,
  RemovePlayerButton,
  AddPlayerContainer,
  PlayerSearchInput,
  PlayerSearchResults,
  PlayerSearchResult,
  CheckboxGroup,
  Checkbox,
  CheckboxLabel,
  ButtonGroup,
  Button,
  ErrorMessage
} from './AddMatchPage.styles';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import GuestSelector from '../../components/GuestSelector/GuestSelector';
import GuestSyncModal from '../../components/GuestSyncModal/GuestSyncModal';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AddMatchPage = ({ editMode = false }) => {
  const { matchId } = useParams();
  const [gameQuery, setGameQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [playerQuery, setPlayerQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [gameSearchError, setGameSearchError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [syncModalGuestId, setSyncModalGuestId] = useState(null);

  const [cooperativeResult, setCooperativeResult] = useState(true); 
  const [availableTeams] = useState(['Team A', 'Team B', 'Team C', 'Team D']);

  const debouncedGameQuery = useDebounce(gameQuery, 800);
  const debouncedPlayerQuery = useDebounce(playerQuery, 300);

  const { data: existingMatch, isLoading: isLoadingMatch } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchAPI.getMatch(matchId),
    enabled: editMode
  });

  const { data: guestsData } = useQuery({
    queryKey: ['guests'],
    queryFn: () => guestAPI.getGuests()
  });

  const syncedGuestsMap = {};
  if (guestsData && Array.isArray(guestsData)) {
    guestsData.forEach(guest => {
      if (guest.syncedWith) {
        syncedGuestsMap[guest._id] = guest.syncedWith;
      }
    });
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: editMode
      ? {
          players: [],
          duration: 60,
          date: new Date().toISOString().split('T')[0],
          location: '',
          notes: '',
          isTeamGame: false,
          isCooperative: false,
          hasWinner: true,
          status: 'completed'
        }
      : {
          players: [
            {
              user: user._id,
              username: user.username,
              avatar: user.avatar,
              score: 0,
              isWinner: false,
              team: null
            }
          ],
          duration: 60,
          date: new Date().toISOString().split('T')[0],
          location: '',
          notes: '',
          isTeamGame: false,
          isCooperative: false,
          hasWinner: true,
          status: 'completed'
        }
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'players'
  });

  useEffect(() => {
    if (editMode && existingMatch && !isLoadingMatch) {
      const formattedPlayers = existingMatch.players.map(player => ({
        id: player.user?._id,
        user: player.user?._id || null,
        guest: player.guest || null,
        username: player.user?.username || player.guestName,
        avatar: player.user?.avatar || player.guestAvatar || null,
        score: player.score,
        isWinner: player.isWinner,
        team: player.team || null
      }));

      if (existingMatch.isCooperative) {
        const hasWinners = formattedPlayers.some(p => p.isWinner);
        setCooperativeResult(hasWinners);
      }

      replace(formattedPlayers);

      reset({
        players: formattedPlayers,
        duration: existingMatch.duration,
        date: new Date(existingMatch.date).toISOString().split('T')[0],
        location: existingMatch.location,
        notes: existingMatch.notes,
        isTeamGame: existingMatch.isTeamGame,
        isCooperative: existingMatch.isCooperative,
        hasWinner: existingMatch.hasWinner,
        status: existingMatch.status
      });

      setSelectedGame(existingMatch.game);
    }
  }, [editMode, existingMatch, isLoadingMatch, reset, replace]);

  const isCooperative = watch('isCooperative');
  const isTeamGame = watch('isTeamGame');
  const hasWinner = watch('hasWinner');

  const {
    data: games = [],
    isFetching: isFetchingGames,
    error: gamesError
  } = useQuery({
    queryKey: ['searchGames', debouncedGameQuery],
    queryFn: async () => {
      try {
        const response = await gameAPI.searchGames(debouncedGameQuery);
        setGameSearchError(null);
        return response ?? [];
      } catch (error) {
        if (error.response?.status === 429) {
          setGameSearchError(
            'Too many requests. Please wait a moment before searching again.'
          );
          throw new Error('Rate limit exceeded');
        }
        setGameSearchError('Error searching games. Please try again.');
        throw error;
      }
    },
    enabled: debouncedGameQuery.length >= 3,
    retry: (failureCount, error) => {
      if (error.message === 'Rate limit exceeded') {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });

  const { data: users = [] } = useQuery({
    queryKey: ['searchUsers', debouncedPlayerQuery],
    queryFn: async () => {
      const response = await userAPI.searchUsers(debouncedPlayerQuery);
      return response?.data || [];
    },
    enabled: debouncedPlayerQuery.length >= 2,
    staleTime: 2 * 60 * 1000
  });

  const handleGameSelect = game => {
    setSelectedGame(game);
    setGameQuery('');
    setGameSearchError(null);
  };

  const handlePlayerAdd = player => {
    const isAlreadyAdded = fields.some(field => field.user === player._id);
    if (!isAlreadyAdded) {
      append({
        user: player._id,
        guest: null,
        username: player.username,
        avatar: player.avatar,
        score: 0,
        isWinner: false,
        team: null
      });
    }
    setPlayerQuery('');
  };

  const handleAddGuest = () => {
    if (!guestName.trim()) return;

    append({
      user: null,
      guest: null,
      username: guestName,
      avatar: null,
      score: 0,
      isWinner: false,
      team: null
    });

    setGuestName('');
    setShowGuestInput(false);
  };

  const handleGuestSelect = guest => {
    const isAlreadyAdded = fields.some(field => field.guest === guest._id);
    if (!isAlreadyAdded) {
      append({
        user: null,
        guest: guest._id,
        username: guest.name,
        avatar: guest.avatar,
        score: 0,
        isWinner: false,
        team: null
      });
    }
    setShowGuestSelector(false);
  };

  const handleGuestSync = guestId => {
    setSyncModalGuestId(guestId);
  };

  const isGuestSynced = guestId => {
    return syncedGuestsMap[guestId] !== undefined;
  };

  const getUniqueTeams = () => {
    const currentPlayers = watch('players') || [];
    const teams = currentPlayers.map(player => player.team).filter(Boolean);
    return [...new Set(teams)];
  };

  const isTeamWinner = teamName => {
    const currentPlayers = watch('players') || [];
    return currentPlayers.some(
      player => player.team === teamName && player.isWinner
    );
  };

  const handleTeamWin = teamName => {
    const currentPlayers = watch('players') || [];

    currentPlayers.forEach((player, index) => {
      if (player.team === teamName) {
        setValue(`players.${index}.isWinner`, true);
      } else if (player.team) {
        setValue(`players.${index}.isWinner`, false);
      }
    });
  };

  const getTeamButtonStyle = teamName => {
    const isWinner = isTeamWinner(teamName);
    const baseStyle = {
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      border: '2px solid',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    };

    if (isWinner) {
      return {
        ...baseStyle,
        backgroundColor: '#28a745',
        borderColor: '#1e7e34',
        color: 'white',
        boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'white',
        borderColor: '#007bff',
        color: '#007bff',
        boxShadow: '0 2px 4px rgba(0, 123, 255, 0.1)'
      };
    }
  };

  const onSubmit = async data => {
    if (!selectedGame) {
      toast.error('Please select a game');
      return;
    }

    if (data.players.length < 1) {
      toast.error('At least one player is required');
      return;
    }

    if (data.isTeamGame) {
      const playersWithTeams = data.players.filter(p => p.team);
      if (playersWithTeams.length === 0) {
        toast.error('Please assign at least one player to a team');
        return;
      }
    }

    setLoading(true);
    try {
      const matchData = {
        game: {
          bggId: selectedGame.bggId,
          name: selectedGame.name,
          image: selectedGame.image
        },
        players: data.players.map(player => ({
          user: player.user,
          guest: player.guest,
          guestId: !player.user && !player.guest ? player.id : null,
          guestName: !player.user ? player.username : null,
          guestAvatar: !player.user && !player.guest ? player.avatar : null,
          score: Number(player.score) || 0,
          isWinner: data.isCooperative ? cooperativeResult : player.isWinner,
          team: data.isTeamGame ? player.team : null
        })),
        duration: Number(data.duration),
        date: new Date(data.date),
        location: data.location,
        notes: data.notes,
        isTeamGame: data.isTeamGame,
        isCooperative: data.isCooperative,
        hasWinner: data.hasWinner,
        status: data.status
      };

      if (editMode) {
        await matchAPI.updateMatch(matchId, matchData);
        toast.success('Match updated successfully!');
      } else {
        await matchAPI.createMatch(matchData);
        toast.success('Match added successfully!');
      }

      navigate('/profile');
    } catch (error) {
      console.error('Error creating match:', error);
      toast.error(error.response?.data?.message || 'Failed to add match');
    } finally {
      setLoading(false);
    }
  };

  if (editMode && isLoadingMatch) {
    return (
      <PageContainer>
        <div>Loading match data...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>{editMode ? 'Edit Match' : 'Add New Match'}</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Game Selection */}
        <Section>
          <SectionTitle>
            <Search size={20} />
            Select Game
          </SectionTitle>

          {selectedGame ? (
            <SelectedGame>
              <GameImage src={selectedGame.image} alt={selectedGame.name} />
              <GameInfo>
                <GameName>{selectedGame.name}</GameName>
                <GameMeta>
                  {selectedGame.minPlayers}-{selectedGame.maxPlayers} players •{' '}
                  {selectedGame.playingTime}min
                </GameMeta>
              </GameInfo>
              <Button
                type="button"
                $variant="secondary"
                onClick={() => setSelectedGame(null)}
              >
                Change Game
              </Button>
            </SelectedGame>
          ) : (
            <GameSearchContainer>
              <GameSearchInput
                type="text"
                placeholder="Search for a board game... (min 3 characters)"
                value={gameQuery}
                onChange={e => {
                  setGameQuery(e.target.value);
                  if (gameSearchError) setGameSearchError(null);
                }}
              />

              {isFetchingGames && debouncedGameQuery.length >= 3 && (
                <div
                  style={{ padding: '12px', fontSize: '14px', color: '#666' }}
                >
                  Searching games...
                </div>
              )}

              {gameSearchError && (
                <div
                  style={{
                    padding: '12px',
                    fontSize: '14px',
                    color: '#dc2626',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    margin: '8px 0'
                  }}
                >
                  {gameSearchError}
                </div>
              )}

              {games.length > 0 && !gameSearchError && (
                <GameSearchResults>
                  {games.map(game => (
                    <GameSearchResult
                      key={game.bggId}
                      onClick={() => handleGameSelect(game)}
                    >
                      <GameImage src={game.thumbnail} alt={game.name} />
                      <GameInfo>
                        <GameName>{game.name}</GameName>
                        <GameMeta>
                          {game.minPlayers}-{game.maxPlayers} players •{' '}
                          {game.playingTime}min
                        </GameMeta>
                      </GameInfo>
                    </GameSearchResult>
                  ))}
                </GameSearchResults>
              )}

              {debouncedGameQuery.length >= 3 &&
                games.length === 0 &&
                !isFetchingGames &&
                !gameSearchError && (
                  <div
                    style={{ padding: '12px', fontSize: '14px', color: '#666' }}
                  >
                    No games found for "{debouncedGameQuery}"
                  </div>
                )}
            </GameSearchContainer>
          )}
        </Section>

        {/* Players */}
        <Section>
          <SectionTitle>
            <Users size={20} />
            Players
          </SectionTitle>

          <PlayersSection>
            <PlayersList>
              {fields.map((field, index) => (
                <PlayerItem key={field.id}>
                  <PlayerInfo>
                    <UserAvatar user={field} />
                    <div>
                      <PlayerName>{field.username}</PlayerName>
                      {field.guest && !isGuestSynced(field.guest) && (
                        <button
                          type="button"
                          onClick={() => handleGuestSync(field.guest)}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Sync Guest
                        </button>
                      )}
                    </div>
                  </PlayerInfo>

                  {isTeamGame && (
                    <InputGroup>
                      <Label>Team</Label>
                      <Select
                        {...register(`players.${index}.team`)}
                        style={{ width: '120px' }}
                      >
                        <option value="">No Team</option>
                        {availableTeams.map(team => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </Select>
                    </InputGroup>
                  )}

                  <InputGroup>
                    <Label>Score</Label>
                    <Input
                      type="number"
                      {...register(`players.${index}.score`)}
                      placeholder="0"
                      style={{ width: '80px' }}
                    />
                  </InputGroup>

                  {hasWinner && !isCooperative && !isTeamGame && (
                    <CheckboxGroup>
                      <Checkbox
                        type="checkbox"
                        {...register(`players.${index}.isWinner`)}
                        id={`winner-${index}`}
                      />
                      <CheckboxLabel htmlFor={`winner-${index}`}>
                        Winner
                      </CheckboxLabel>
                    </CheckboxGroup>
                  )}

                  {(editMode || index > 0) && (
                    <RemovePlayerButton
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <X size={16} />
                    </RemovePlayerButton>
                  )}
                </PlayerItem>
              ))}
            </PlayersList>

            {isCooperative && hasWinner && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  <Trophy size={20} style={{ color: '#28a745' }} />
                  <h4
                    style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}
                  >
                    Team Result
                  </h4>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      checked={cooperativeResult === true}
                      onChange={() => setCooperativeResult(true)}
                    />
                    <span style={{ color: '#28a745', fontWeight: '500' }}>
                      Team Won 🎉
                    </span>
                  </label>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      checked={cooperativeResult === false}
                      onChange={() => setCooperativeResult(false)}
                    />
                    <span style={{ color: '#dc3545', fontWeight: '500' }}>
                      Team Lost 😞
                    </span>
                  </label>
                </div>
              </div>
            )}

            {isTeamGame &&
              hasWinner &&
              !isCooperative &&
              getUniqueTeams().length > 0 && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <Shield size={20} style={{ color: '#007bff' }} />
                    <h4
                      style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}
                    >
                      Team Winners
                    </h4>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    {getUniqueTeams().map(team => {
                      const isWinner = isTeamWinner(team);
                      return (
                        <button
                          key={team}
                          type="button"
                          onClick={() => handleTeamWin(team)}
                          style={getTeamButtonStyle(team)}
                        >
                          {isWinner && <Trophy size={16} />}
                          {team} {isWinner ? 'WINS!' : 'Wins'}
                        </button>
                      );
                    })}
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#6c757d',
                      margin: '0.75rem 0 0 0'
                    }}
                  >
                    Click a team button to mark all players in that team as
                    winners.
                    {getUniqueTeams().some(team => isTeamWinner(team)) && (
                      <span style={{ color: '#28a745', fontWeight: '500' }}>
                        {' '}
                        Winner selected!
                      </span>
                    )}
                  </p>
                </div>
              )}

            <AddPlayerContainer>
              <PlayerSearchInput
                type="text"
                placeholder="Search for registered players..."
                value={playerQuery}
                onChange={e => setPlayerQuery(e.target.value)}
              />
              {users.length > 0 && (
                <PlayerSearchResults>
                  {users.map(user => (
                    <PlayerSearchResult
                      key={user._id}
                      onClick={() => handlePlayerAdd(user)}
                    >
                      <UserAvatar user={user} size="small" />
                      <PlayerName>{user.username}</PlayerName>
                    </PlayerSearchResult>
                  ))}
                </PlayerSearchResults>
              )}

              <div className="flex gap-2 mt-4">
                <Button
                  type="button"
                  onClick={() => setShowGuestSelector(true)}
                  $variant="secondary"
                >
                  Add Saved Guest
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowGuestInput(prev => !prev)}
                  $variant="secondary"
                >
                  {showGuestInput ? 'Cancel' : 'Add Quick Guest'}
                </Button>
              </div>

              {showGuestInput && (
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                  <Input
                    type="text"
                    placeholder="Guest player name"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddGuest}>
                    Add
                  </Button>
                </div>
              )}

              {showGuestSelector && (
                <div className="mt-4">
                  <GuestSelector
                    onGuestSelect={handleGuestSelect}
                    selectedGuests={fields.filter(f => f.guest)}
                    onClose={() => setShowGuestSelector(false)}
                  />
                </div>
              )}
            </AddPlayerContainer>
          </PlayersSection>
        </Section>

        <Section>
          <SectionTitle>
            <Calendar size={20} />
            Match Details
          </SectionTitle>

          <InputGroup>
            <Label>Date</Label>
            <Input
              type="date"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              {...register('duration', {
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be at least 1 minute' }
              })}
              placeholder="60"
            />
            {errors.duration && (
              <ErrorMessage>{errors.duration.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Location</Label>
            <Input
              type="text"
              {...register('location', { required: 'Location is required' })}
              placeholder="Where did you play?"
            />
            {errors.location && (
              <ErrorMessage>{errors.location.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Status</Label>
            <Select {...register('status')}>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </Select>
          </InputGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              {...register('isCooperative')}
              id="cooperative"
            />
            <CheckboxLabel htmlFor="cooperative">
              Cooperative Game
            </CheckboxLabel>
          </CheckboxGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              {...register('isTeamGame')}
              id="teamGame"
            />
            <CheckboxLabel htmlFor="teamGame">Team Game</CheckboxLabel>
          </CheckboxGroup>

          {!isCooperative && (
            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                {...register('hasWinner')}
                id="hasWinner"
              />
              <CheckboxLabel htmlFor="hasWinner">Has Winner</CheckboxLabel>
            </CheckboxGroup>
          )}

          <InputGroup>
            <Label>Notes (optional)</Label>
            <TextArea
              {...register('notes')}
              placeholder="Any additional notes about the match..."
              rows={3}
            />
          </InputGroup>
        </Section>

        <ButtonGroup>
          <Button
            type="button"
            $variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !selectedGame}>
            {editMode ? 'Update Match' : 'Add Match'}
          </Button>
        </ButtonGroup>
      </Form>

      {syncModalGuestId && (
        <GuestSyncModal
          isOpen={!!syncModalGuestId}
          onClose={() => setSyncModalGuestId(null)}
          guestId={syncModalGuestId}
        />
      )}
    </PageContainer>
  );
};

export default AddMatchPage;
