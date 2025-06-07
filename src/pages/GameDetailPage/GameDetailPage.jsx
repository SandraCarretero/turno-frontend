import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { gameAPI, matchAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import { Minus, Plus, Users, Clock, Star, TrendingUp, Calendar, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"
import { emitGameAdded, emitGameRemoved } from "../../utils/eventEmmiter"
import {
  PageContainer,
  BackButton,
  GameHeader,
  GameImage,
  GameInfo,
  GameTitle,
  GameMeta,
  MetaItem,
  GameDescription,
  GameStats,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  ActionButtons,
  ActionButton,
  Section,
  SectionTitle,
  LoadingText,
  ErrorMessage,
  GameCategories,
  Category,
  GameMechanics,
  Mechanic,
  EmptyMatches,
} from "./GameDetailPage.styles"
import Loader from "../../components/Loader/Loader"

const GameDetailPage = () => {
  const { gameId } = useParams()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isInCollection, setIsInCollection] = useState(false)

  const {
    data: game,
    isLoading: gameLoading,
    error: gameError,
  } = useQuery({
    queryKey: ["gameDetails", gameId],
    queryFn: () => gameAPI.getGameDetails(gameId),
    onSuccess: (gameData) => {
      const inCollection = user?.games?.some((g) => g.bggId === gameData.bggId)
      setIsInCollection(inCollection)
    },
  })

  const { data: matchesData, isLoading: matchesLoading } = useQuery({
    queryKey: ["gameMatches", gameId],
    queryFn: () =>
      matchAPI.getMatchesByGameId ? matchAPI.getMatchesByGameId(gameId) : Promise.resolve({ matches: [] }),
    enabled: !!gameId,
  })

  const addToCollectionMutation = useMutation({
    mutationFn: gameAPI.addGameToCollection,
    onSuccess: (data) => {
      setIsInCollection(true)

      // Invalidar queries relacionadas
      queryClient.invalidateQueries(["userProfile"])
      queryClient.invalidateQueries(["userGames"])
      queryClient.invalidateQueries(["user", user._id])

      // Emitir evento de actualización
      emitGameAdded(data)

      toast.success("¡Juego añadido a la colección!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error al añadir el juego")
    },
  })

  const removeFromCollectionMutation = useMutation({
    mutationFn: gameAPI.removeGameFromCollection,
    onSuccess: (data, variables) => {
      setIsInCollection(false)

      // Invalidar queries relacionadas
      queryClient.invalidateQueries(["userProfile"])
      queryClient.invalidateQueries(["userGames"])
      queryClient.invalidateQueries(["user", user._id])

      // Emitir evento de actualización
      emitGameRemoved(variables)

      toast.success("¡Juego eliminado de la colección!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error al eliminar el juego")
    },
  })

  const handleToggleCollection = () => {
    if (!game) return

    if (isInCollection) {
      removeFromCollectionMutation.mutate(game.bggId)
    } else {
      addToCollectionMutation.mutate({
        bggId: game.bggId,
        name: game.name,
        image: game.image,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        playingTime: game.playingTime,
      })
    }
  }

  const handleGoBack = () => {
    window.history.back()
  }

  if (gameLoading) {
    return (
      <PageContainer>
        <LoadingText>Cargando detalles del juego...</LoadingText>
        <Loader />
      </PageContainer>
    )
  }

  if (gameError || !game) {
    return (
      <PageContainer>
        <ErrorMessage>Error al cargar detalles del juego</ErrorMessage>
      </PageContainer>
    )
  }

  const matches = matchesData?.matches || []

  return (
    <PageContainer>
      <BackButton onClick={handleGoBack}>
        <ArrowLeft size={20} />
        Volver
      </BackButton>

      <GameHeader>
        <GameImage src={game.image} alt={game.name} />
        <GameInfo>
          <GameTitle>{game.name}</GameTitle>
          <GameMeta>
            <MetaItem>
              <Users size={16} />
              {game.minPlayers}-{game.maxPlayers} jugadores
            </MetaItem>
            <MetaItem>
              <Clock size={16} />
              {game.playingTime} minutos
            </MetaItem>
            <MetaItem>
              <Calendar size={16} />
              {game.yearPublished}
            </MetaItem>
            {game.rating > 0 && (
              <MetaItem>
                <Star size={16} />
                {game.rating.toFixed(1)}/10
              </MetaItem>
            )}
          </GameMeta>

          <ActionButtons>
            <ActionButton
              onClick={handleToggleCollection}
              disabled={addToCollectionMutation.isLoading || removeFromCollectionMutation.isLoading}
              $variant={isInCollection ? "secondary" : "primary"}
            >
              {isInCollection ? <Minus size={16} /> : <Plus size={16} />}
              {isInCollection ? "Quitar de Colección" : "Añadir a Colección"}
            </ActionButton>
          </ActionButtons>
        </GameInfo>
      </GameHeader>

      {game.description && (
        <GameDescription
          dangerouslySetInnerHTML={{
            __html: game.description.replace(/&[^;]+;/g, "").substring(0, 300) + "...",
          }}
        />
      )}

      <GameStats>
        <StatCard>
          <StatIcon $color="#007bff">
            <Users size={24} />
          </StatIcon>
          <StatValue>
            {game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers}-${game.maxPlayers}`}
          </StatValue>
          <StatLabel>Jugadores</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#6f42c1">
            <Clock size={24} />
          </StatIcon>
          <StatValue>{game.playingTime}</StatValue>
          <StatLabel>Minutos</StatLabel>
        </StatCard>

        {game.rating > 0 && (
          <StatCard>
            <StatIcon $color="#ffc107">
              <Star size={24} />
            </StatIcon>
            <StatValue>{game.rating.toFixed(1)}</StatValue>
            <StatLabel>Valoración BGG</StatLabel>
          </StatCard>
        )}

        {game.complexity > 0 && (
          <StatCard>
            <StatIcon $color="#28a745">
              <TrendingUp size={24} />
            </StatIcon>
            <StatValue>{game.complexity.toFixed(1)}</StatValue>
            <StatLabel>Complejidad</StatLabel>
          </StatCard>
        )}
      </GameStats>

      {game.categories && game.categories.length > 0 && (
        <Section>
          <SectionTitle>Categorías</SectionTitle>
          <GameCategories>
            {game.categories.slice(0, 8).map((category, index) => (
              <Category key={index}>{category}</Category>
            ))}
          </GameCategories>
        </Section>
      )}

      {game.mechanics && game.mechanics.length > 0 && (
        <Section>
          <SectionTitle>Mecánicas</SectionTitle>
          <GameMechanics>
            {game.mechanics.slice(0, 8).map((mechanic, index) => (
              <Mechanic key={index}>{mechanic}</Mechanic>
            ))}
          </GameMechanics>
        </Section>
      )}

      {matches.length === 0 && !matchesLoading && (
        <Section>
          <SectionTitle>Partidas Jugadas</SectionTitle>
          <EmptyMatches>
            <p>Aún no has jugado ninguna partida de este juego.</p>
            <ActionButton $variant="primary">
              <Plus size={16} />
              Añadir Primera Partida
            </ActionButton>
          </EmptyMatches>
        </Section>
      )}
    </PageContainer>
  )
}

export default GameDetailPage
