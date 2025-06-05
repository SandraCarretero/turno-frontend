"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { X, Users, Calendar, Trophy, Shield } from "lucide-react"
import { matchAPI, gameAPI, userAPI, guestAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"
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
  SyncButton,
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
  ErrorMessage,
  SearchStatus,
  CooperativeResultContainer,
  CooperativeResultHeader,
  CooperativeResultOptions,
  CooperativeResultOption,
  TeamWinnersContainer,
  TeamWinnersHeader,
  TeamWinnersButtons,
  TeamWinnerButton,
  TeamWinnersNote,
} from "./AddMatchPage.styles"
import UserAvatar from "../../components/UserAvatar/UserAvatar"
import GuestSyncModal from "../../components/GuestSyncModal/GuestSyncModal"
import AddGuestModal from "../../components/AddGuestModal/AddGuestModal"
import Loader from "../../components/Loader/Loader"

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const AddMatchPage = ({ editMode = false }) => {
  const { matchId } = useParams()
  const [gameQuery, setGameQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState(null)
  const [playerQuery, setPlayerQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [gameSearchError, setGameSearchError] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [showAddGuestModal, setShowAddGuestModal] = useState(false)
  const [syncModalGuestId, setSyncModalGuestId] = useState(null)
  const [syncModalGuestData, setSyncModalGuestData] = useState(null)
  const [syncingPlayerIndex, setSyncingPlayerIndex] = useState(null)

  const [cooperativeResult, setCooperativeResult] = useState(true)
  const [availableTeams] = useState(["Team A", "Team B", "Team C", "Team D"])

  const debouncedGameQuery = useDebounce(gameQuery, 800)
  const debouncedPlayerQuery = useDebounce(playerQuery, 300)

  const { data: existingMatch, isLoading: isLoadingMatch } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => matchAPI.getMatch(matchId),
    enabled: editMode,
  })

  const {
    data: guestsData = [],
    isLoading: isLoadingGuests,
    refetch: refetchGuests,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: () => guestAPI.getGuests(),
  })

  // Mutation para crear un nuevo invitado
  const createGuestMutation = useMutation({
    mutationFn: (guestData) => guestAPI.createGuest(guestData),
    onSuccess: (data) => {
      console.log("✅ Guest created successfully:", data)
      // Invalidar la caché de invitados para que se actualice
      queryClient.invalidateQueries(["guests"])
    },
    onError: (error) => {
      console.error("❌ Error in createGuestMutation:", error)
    },
  })

  const syncedGuestsMap = {}
  if (guestsData && Array.isArray(guestsData)) {
    guestsData.forEach((guest) => {
      if (guest.syncedWith) {
        syncedGuestsMap[guest._id] = guest.syncedWith
      }
    })
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editMode
      ? {
          players: [],
          duration: 60,
          date: new Date().toISOString().split("T")[0],
          location: "",
          notes: "",
          isTeamGame: false,
          isCooperative: false,
          hasWinner: true,
          status: "completed",
        }
      : {
          players: [
            {
              user: user._id,
              username: user.username,
              avatar: user.avatar,
              score: 0,
              isWinner: false,
              team: null,
            },
          ],
          duration: 60,
          date: new Date().toISOString().split("T")[0],
          location: "",
          notes: "",
          isTeamGame: false,
          isCooperative: false,
          hasWinner: true,
          status: "completed",
        },
  })

  const { fields, append, remove, replace, update } = useFieldArray({
    control,
    name: "players",
  })

  const isCooperative = watch("isCooperative")
  const isTeamGame = watch("isTeamGame")
  const hasWinner = watch("hasWinner")

  useEffect(() => {
    if (editMode && existingMatch && !isLoadingMatch) {
      const formattedPlayers = existingMatch.players.map((player) => ({
        id: player.user?._id,
        user: player.user?._id || null,
        guest: player.guest || null,
        username: player.user?.username || player.guestName,
        avatar: player.user?.avatar || player.guestAvatar || null,
        score: player.score,
        isWinner: player.isWinner,
        team: player.team || null,
      }))

      if (existingMatch.isCooperative) {
        const hasWinners = formattedPlayers.some((p) => p.isWinner)
        setCooperativeResult(hasWinners)
      }

      replace(formattedPlayers)

      reset({
        players: formattedPlayers,
        duration: existingMatch.duration,
        date: new Date(existingMatch.date).toISOString().split("T")[0],
        location: existingMatch.location,
        notes: existingMatch.notes,
        isTeamGame: existingMatch.isTeamGame,
        isCooperative: existingMatch.isCooperative,
        hasWinner: existingMatch.hasWinner,
        status: existingMatch.status,
      })

      setSelectedGame(existingMatch.game)
    }
  }, [editMode, existingMatch, isLoadingMatch, reset, replace])

  // Lógica para manejar la exclusión mutua entre cooperativo y equipos
  useEffect(() => {
    if (isCooperative) {
      setValue("isTeamGame", false)
    }
  }, [isCooperative, setValue])

  useEffect(() => {
    if (isTeamGame) {
      setValue("isCooperative", false)
    }
  }, [isTeamGame, setValue])

  const {
    data: games = [],
    isFetching: isFetchingGames,
    error: gamesError,
  } = useQuery({
    queryKey: ["searchGames", debouncedGameQuery],
    queryFn: async () => {
      try {
        const response = await gameAPI.searchGames(debouncedGameQuery)
        setGameSearchError(null)
        return response ?? []
      } catch (error) {
        if (error.response?.status === 429) {
          setGameSearchError("Demasiadas peticiones, espere un momento antes de volver a buscar")
          throw new Error("Rate limit exceeded")
        }
        setGameSearchError("Error al buscar juegos, por favor inténtelo de nuevo.")
        throw error
      }
    },
    enabled: debouncedGameQuery.length >= 3,
    retry: (failureCount, error) => {
      if (error.message === "Rate limit exceeded") {
        return false
      }
      return failureCount < 2
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })

  const { data: users = [] } = useQuery({
    queryKey: ["searchUsers", debouncedPlayerQuery],
    queryFn: async () => {
      const response = await userAPI.searchUsers(debouncedPlayerQuery)
      return response?.data || []
    },
    enabled: debouncedPlayerQuery.length >= 2,
    staleTime: 2 * 60 * 1000,
  })

  const handleGameSelect = (game) => {
    setSelectedGame(game)
    setGameQuery("")
    setGameSearchError(null)
  }

  const handlePlayerAdd = (player) => {
    const isAlreadyAdded = fields.some((field) => field.user === player._id)
    if (!isAlreadyAdded) {
      append({
        user: player._id,
        guest: null,
        username: player.username,
        avatar: player.avatar,
        score: 0,
        isWinner: false,
        team: null,
      })
    }
    setPlayerQuery("")
  }

  const handleAddNewGuest = async (guestName) => {
    try {
      console.log("🔄 Creating guest with name:", guestName)

      // Mostrar estado de carga
      setShowAddGuestModal(false) // Cerrar modal inmediatamente para mejor UX

      // Crear el invitado en la base de datos
      const response = await createGuestMutation.mutateAsync({
        name: guestName,
        avatar: null,
      })

      console.log("📦 Full API response:", response)

      // La respuesta puede tener diferentes estructuras dependiendo de la API
      // Vamos a manejar las posibles estructuras
      let newGuest = response

      // Si la respuesta tiene una propiedad 'data', usar esa
      if (response && response.data) {
        newGuest = response.data
      }

      // Si la respuesta tiene una propiedad 'guest', usar esa
      if (response && response.guest) {
        newGuest = response.guest
      }

      console.log("👤 Processed guest data:", newGuest)

      // Verificar que tenemos los datos necesarios
      const guestId = newGuest._id || newGuest.id
      const guestNameFromResponse = newGuest.name || guestName // Fallback al nombre original
      const guestAvatar = newGuest.avatar || null

      if (!guestId) {
        throw new Error("No se pudo obtener el ID del invitado creado")
      }

      // Añadir el invitado a la partida actual
      append({
        user: null,
        guest: guestId,
        username: guestNameFromResponse,
        avatar: guestAvatar,
        score: 0,
        isWinner: false,
        team: null,
      })

      toast.success(`Invitado "${guestNameFromResponse}" creado con éxito`)

      // Refrescar la lista de invitados para futuras partidas
      await refetchGuests()
    } catch (error) {
      console.error("❌ Error creating guest:", error)
      toast.error("Error al crear invitado")
      setShowAddGuestModal(true) // Reabrir modal si hay error
    }
  }

  const handleGuestSelect = (guest) => {
    const isAlreadyAdded = fields.some((field) => field.guest === guest._id)
    if (!isAlreadyAdded) {
      append({
        user: null,
        guest: guest._id,
        username: guest.name,
        avatar: guest.avatar,
        score: 0,
        isWinner: false,
        team: null,
      })
    }
    setShowAddGuestModal(false)
  }

  const handleGuestSync = (field, index) => {
    // Guardar el índice del jugador que estamos sincronizando
    setSyncingPlayerIndex(index)

    if (field.guest) {
      // Invitado existente - usar el ID del invitado
      setSyncModalGuestId(field.guest)
      setSyncModalGuestData(null)
    } else {
      // Invitado nuevo - pasar los datos del invitado
      setSyncModalGuestId(null)
      setSyncModalGuestData({
        name: field.username,
        avatar: field.avatar,
      })
    }
  }

  const handleSyncComplete = (syncData) => {
    // Verificar que tenemos el índice del jugador y los datos de sincronización
    if (syncingPlayerIndex !== null && syncData && syncData.user) {
      // Obtener el jugador actual
      const currentPlayer = fields[syncingPlayerIndex]

      if (currentPlayer) {
        // Guardar el score y team actuales
        const currentScore = currentPlayer.score
        const currentTeam = currentPlayer.team
        const currentIsWinner = currentPlayer.isWinner

        // Reemplazar el invitado por el usuario real
        update(syncingPlayerIndex, {
          user: syncData.user._id,
          guest: null, // Ya no es un invitado
          username: syncData.user.username,
          avatar: syncData.user.avatar,
          score: currentScore,
          isWinner: currentIsWinner,
          team: currentTeam,
        })

        toast.success(`¡Jugador actualizado a ${syncData.user.username}!`)
      }
    }

    // Refrescar la lista de invitados
    refetchGuests()

    // Limpiar el estado
    setSyncingPlayerIndex(null)
    setSyncModalGuestId(null)
    setSyncModalGuestData(null)
  }

  const isGuestSynced = (guestId) => {
    return syncedGuestsMap[guestId] !== undefined
  }

  // Función para determinar si mostrar el botón de sincronizar
  const shouldShowSyncButton = (field) => {
    // No mostrar para usuarios registrados
    if (field.user) return false

    // Para invitados existentes, mostrar solo si no están sincronizados
    if (field.guest) {
      return !isGuestSynced(field.guest)
    }

    // Para invitados nuevos (sin field.guest), siempre mostrar
    return true
  }

  const getUniqueTeams = () => {
    const currentPlayers = watch("players") || []
    const teams = currentPlayers.map((player) => player.team).filter(Boolean)
    return [...new Set(teams)]
  }

  const isTeamWinner = (teamName) => {
    const currentPlayers = watch("players") || []
    return currentPlayers.some((player) => player.team === teamName && player.isWinner)
  }

  const handleTeamWin = (teamName) => {
    const currentPlayers = watch("players") || []

    currentPlayers.forEach((player, index) => {
      if (player.team === teamName) {
        setValue(`players.${index}.isWinner`, true)
      } else if (player.team) {
        setValue(`players.${index}.isWinner`, false)
      }
    })
  }

  const onSubmit = async (data) => {
    if (!selectedGame) {
      toast.error("Please select a game")
      return
    }

    if (data.players.length < 1) {
      toast.error("At least one player is required")
      return
    }

    if (data.isTeamGame) {
      const playersWithTeams = data.players.filter((p) => p.team)
      if (playersWithTeams.length === 0) {
        toast.error("Please assign at least one player to a team")
        return
      }
    }

    setLoading(true)
    try {
      const matchData = {
        game: {
          bggId: selectedGame.bggId,
          name: selectedGame.name,
          image: selectedGame.image,
        },
        players: data.players.map((player) => ({
          user: player.user,
          guest: player.guest,
          guestId: !player.user && !player.guest ? player.id : null,
          guestName: !player.user ? player.username : null,
          guestAvatar: !player.user && !player.guest ? player.avatar : null,
          score: Number(player.score) || 0,
          isWinner: data.isCooperative ? cooperativeResult : player.isWinner,
          team: data.isTeamGame ? player.team : null,
        })),
        duration: Number(data.duration),
        date: new Date(data.date),
        location: data.location,
        notes: data.notes,
        isTeamGame: data.isTeamGame,
        isCooperative: data.isCooperative,
        hasWinner: data.hasWinner,
        status: data.status,
      }

      if (editMode) {
        await matchAPI.updateMatch(matchId, matchData)
        toast.success("Partida modificada con éxito")
      } else {
        await matchAPI.createMatch(matchData)
        toast.success("Partida creada con éxito")
      }

      navigate("/profile")
    } catch (error) {
      console.error("Error creating match:", error)
      toast.error(error.response?.data?.message || "Error al añadir juego")
    } finally {
      setLoading(false)
    }
  }

  if (editMode && isLoadingMatch) {
    return (
      <PageContainer>
        <div>Cargando datos del juego</div>
        <Loader />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Title>{editMode ? "Editar partida" : "Crear nueva partida"}</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Game Selection */}
        <>
          {selectedGame ? (
            <>
              <SelectedGame>
                <GameImage src={selectedGame.image} alt={selectedGame.name} />
                <GameInfo>
                  <GameName>{selectedGame.name}</GameName>
                  <GameMeta>
                    {selectedGame.minPlayers}-{selectedGame.maxPlayers} jugadores • {selectedGame.playingTime}min
                  </GameMeta>
                </GameInfo>
              </SelectedGame>
              <Button type="button" $variant="secondary" onClick={() => setSelectedGame(null)}>
                Cambiar juego
              </Button>
            </>
          ) : (
            <GameSearchContainer>
              <GameSearchInput
                type="text"
                placeholder="Selecciona juego de mesa"
                value={gameQuery}
                onChange={(e) => {
                  setGameQuery(e.target.value)
                  if (gameSearchError) setGameSearchError(null)
                }}
              />

              {isFetchingGames && debouncedGameQuery.length >= 3 && <SearchStatus>Buscando juegos...</SearchStatus>}

              {gameSearchError && <SearchStatus $error>{gameSearchError}</SearchStatus>}

              {games.length > 0 && !gameSearchError && (
                <GameSearchResults>
                  {games.map((game) => (
                    <GameSearchResult key={game.bggId} onClick={() => handleGameSelect(game)}>
                      <GameImage src={game.thumbnail} alt={game.name} />
                      <GameInfo>
                        <GameName>{game.name}</GameName>
                        <GameMeta>
                          {game.minPlayers}-{game.maxPlayers} jugadores • {game.playingTime}min
                        </GameMeta>
                      </GameInfo>
                    </GameSearchResult>
                  ))}
                </GameSearchResults>
              )}

              {debouncedGameQuery.length >= 3 && games.length === 0 && !isFetchingGames && !gameSearchError && (
                <SearchStatus>No hay juegos "{debouncedGameQuery}"</SearchStatus>
              )}
            </GameSearchContainer>
          )}
        </>

        {/* Players */}
        <Section>
          <SectionTitle>
            <Users size={20} />
            Jugadores
          </SectionTitle>

          <PlayersSection>
            <PlayersList>
              {fields.map((field, index) => (
                <PlayerItem key={field.id}>
                  <PlayerInfo>
                    <UserAvatar user={field} />
                    <div>
                      <PlayerName>{field.username}</PlayerName>
                      {shouldShowSyncButton(field) && (
                        <SyncButton type="button" onClick={() => handleGuestSync(field, index)}>
                          Sincronizar
                        </SyncButton>
                      )}
                    </div>
                  </PlayerInfo>

                  {isTeamGame && (
                    <InputGroup>
                      <Label>Team</Label>
                      <Select {...register(`players.${index}.team`)}>
                        <option value="">No Team</option>
                        {availableTeams.map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </Select>
                    </InputGroup>
                  )}

                  <InputGroup>
                    <Label>Puntos</Label>
                    <Input type="number" {...register(`players.${index}.score`)} placeholder="0" />
                  </InputGroup>

                  {hasWinner && !isCooperative && !isTeamGame && (
                    <CheckboxGroup>
                      <Checkbox type="checkbox" {...register(`players.${index}.isWinner`)} id={`winner-${index}`} />
                      <CheckboxLabel htmlFor={`winner-${index}`}>Ganador</CheckboxLabel>
                    </CheckboxGroup>
                  )}

                  {(editMode || index > 0) && (
                    <RemovePlayerButton type="button" onClick={() => remove(index)}>
                      <X size={16} />
                    </RemovePlayerButton>
                  )}
                </PlayerItem>
              ))}
            </PlayersList>

            {isCooperative && hasWinner && (
              <CooperativeResultContainer>
                <CooperativeResultHeader>
                  <Trophy size={20} />
                  <h4>Team Result</h4>
                </CooperativeResultHeader>
                <CooperativeResultOptions>
                  <CooperativeResultOption>
                    <input
                      type="radio"
                      checked={cooperativeResult === true}
                      onChange={() => setCooperativeResult(true)}
                    />
                    <span $success>Team Won 🎉</span>
                  </CooperativeResultOption>
                  <CooperativeResultOption>
                    <input
                      type="radio"
                      checked={cooperativeResult === false}
                      onChange={() => setCooperativeResult(false)}
                    />
                    <span $error>Team Lost 😞</span>
                  </CooperativeResultOption>
                </CooperativeResultOptions>
              </CooperativeResultContainer>
            )}

            {isTeamGame && hasWinner && !isCooperative && getUniqueTeams().length > 0 && (
              <TeamWinnersContainer>
                <TeamWinnersHeader>
                  <Shield size={20} />
                  <h4>Team Winners</h4>
                </TeamWinnersHeader>
                <TeamWinnersButtons>
                  {getUniqueTeams().map((team) => {
                    const isWinner = isTeamWinner(team)
                    return (
                      <TeamWinnerButton
                        key={team}
                        type="button"
                        onClick={() => handleTeamWin(team)}
                        $isWinner={isWinner}
                      >
                        {isWinner && <Trophy size={16} />}
                        {team} {isWinner ? "WINS!" : "Wins"}
                      </TeamWinnerButton>
                    )
                  })}
                </TeamWinnersButtons>
                <TeamWinnersNote>
                  Click a team button to mark all players in that team as winners.
                  {getUniqueTeams().some((team) => isTeamWinner(team)) && <span> Winner selected!</span>}
                </TeamWinnersNote>
              </TeamWinnersContainer>
            )}

            <AddPlayerContainer>
              <PlayerSearchInput
                type="text"
                placeholder="Buscar usuarios..."
                value={playerQuery}
                onChange={(e) => setPlayerQuery(e.target.value)}
              />
              {users.length > 0 && (
                <PlayerSearchResults>
                  {users.map((user) => (
                    <PlayerSearchResult key={user._id} onClick={() => handlePlayerAdd(user)}>
                      <UserAvatar user={user} size="small" />
                      <PlayerName>{user.username}</PlayerName>
                    </PlayerSearchResult>
                  ))}
                </PlayerSearchResults>
              )}

              <div style={{ marginTop: "1rem" }}>
                <Button type="button" onClick={() => setShowAddGuestModal(true)} $variant="secondary">
                  Añadir un invitado
                </Button>
              </div>
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
            <Input type="date" {...register("date", { required: "Date is required" })} />
            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              {...register("duration", {
                required: "Duration is required",
                min: { value: 1, message: "Duration must be at least 1 minute" },
              })}
              placeholder="60"
            />
            {errors.duration && <ErrorMessage>{errors.duration.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Location</Label>
            <Input
              type="text"
              {...register("location", { required: "Location is required" })}
              placeholder="Where did you play?"
            />
            {errors.location && <ErrorMessage>{errors.location.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Status</Label>
            <Select {...register("status")}>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </Select>
          </InputGroup>

          <CheckboxGroup>
            <Checkbox type="checkbox" {...register("isCooperative")} id="cooperative" disabled={isTeamGame} />
            <CheckboxLabel htmlFor="cooperative" style={{ opacity: isTeamGame ? 0.5 : 1 }}>
              Juego cooperativo
            </CheckboxLabel>
          </CheckboxGroup>

          <CheckboxGroup>
            <Checkbox type="checkbox" {...register("isTeamGame")} id="teamGame" disabled={isCooperative} />
            <CheckboxLabel htmlFor="teamGame" style={{ opacity: isCooperative ? 0.5 : 1 }}>
              Juego en equipos
            </CheckboxLabel>
          </CheckboxGroup>

          {!isCooperative && (
            <CheckboxGroup>
              <Checkbox type="checkbox" {...register("hasWinner")} id="hasWinner" />
              <CheckboxLabel htmlFor="hasWinner">Tiene ganador</CheckboxLabel>
            </CheckboxGroup>
          )}

          <InputGroup>
            <Label>Notes (optional)</Label>
            <TextArea {...register("notes")} placeholder="Any additional notes about the match..." rows={3} />
          </InputGroup>
        </Section>

        <ButtonGroup>
          <Button type="button" $variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !selectedGame}>
            {editMode ? "Update Match" : "Add Match"}
          </Button>
        </ButtonGroup>
      </Form>

      {/* Modals */}
      {showAddGuestModal && (
        <AddGuestModal
          isOpen={showAddGuestModal}
          onClose={() => setShowAddGuestModal(false)}
          onAddGuest={handleAddNewGuest}
          onGuestSelect={handleGuestSelect}
          existingGuests={guestsData || []}
          selectedGuests={fields.filter((f) => f.guest)}
          isLoading={isLoadingGuests || createGuestMutation.isLoading}
        />
      )}

      {(syncModalGuestId || syncModalGuestData) && (
        <GuestSyncModal
          isOpen={!!(syncModalGuestId || syncModalGuestData)}
          onClose={() => {
            setSyncModalGuestId(null)
            setSyncModalGuestData(null)
            setSyncingPlayerIndex(null)
          }}
          guestId={syncModalGuestId}
          guestData={syncModalGuestData}
          onSyncComplete={handleSyncComplete}
        />
      )}
    </PageContainer>
  )
}

export default AddMatchPage
