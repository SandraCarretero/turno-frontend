import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { gameAPI, matchAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import { ArrowLeft, Plus, Users, Clock, Star, TrendingUp, Calendar, Trophy } from "lucide-react"
import MatchCard from "../../components/MatchCard/MatchCard"
import toast from "react-hot-toast"
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
  MatchesList,
  LoadingText,
  ErrorMessage,
  EmptyMatches,
  GameCategories,
  Category,
  GameMechanics,
  Mechanic,
} from "./GameDetailPage.styles"

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
  console.log("gameId:", gameId)

  const addToCollectionMutation = useMutation({
    mutationFn: gameAPI.addGameToCollection,
    onSuccess: () => {
      setIsInCollection(true)
      queryClient.invalidateQueries(["userProfile"])
      toast.success("Game added to collection!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add game")
    },
  })

  const removeFromCollectionMutation = useMutation({
    mutationFn: gameAPI.removeGameFromCollection,
    onSuccess: () => {
      setIsInCollection(false)
      queryClient.invalidateQueries(["userProfile"])
      toast.success("Game removed from collection!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove game")
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

  if (gameLoading) {
    return (
      <PageContainer>
        <LoadingText>Loading game details...</LoadingText>
      </PageContainer>
    )
  }

  if (gameError || !game) {
    return (
      <PageContainer>
        <ErrorMessage>Failed to load game details</ErrorMessage>
      </PageContainer>
    )
  }

  const matches = matchesData?.matches || []

  return (
    <PageContainer>
      <BackButton as={Link} to="/">
        <ArrowLeft size={20} />
        Back to Home
      </BackButton>

      <GameHeader>
        <GameImage src={game.image} alt={game.name} />
        <GameInfo>
          <GameTitle>{game.name}</GameTitle>
          <GameMeta>
            <MetaItem>
              <Users size={16} />
              {game.minPlayers}-{game.maxPlayers} players
            </MetaItem>
            <MetaItem>
              <Clock size={16} />
              {game.playingTime} minutes
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

          {game.description && (
            <GameDescription
              dangerouslySetInnerHTML={{
                __html: game.description.replace(/&[^;]+;/g, "").substring(0, 300) + "...",
              }}
            />
          )}

          <ActionButtons>
            <ActionButton
              onClick={handleToggleCollection}
              disabled={addToCollectionMutation.isLoading || removeFromCollectionMutation.isLoading}
              variant={isInCollection ? "secondary" : "primary"}
            >
              <Plus size={16} />
              {isInCollection ? "Remove from Collection" : "Add to Collection"}
            </ActionButton>
            <ActionButton as={Link} to="/add-match" state={{ selectedGame: game }}>
              <Trophy size={16} />
              Log a Match
            </ActionButton>
          </ActionButtons>
        </GameInfo>
      </GameHeader>

      <GameStats>
        <StatCard>
          <StatIcon color="#007bff">
            <Users size={24} />
          </StatIcon>
          <StatValue>
            {game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers}-${game.maxPlayers}`}
          </StatValue>
          <StatLabel>Players</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon color="#28a745">
            <Clock size={24} />
          </StatIcon>
          <StatValue>{game.playingTime}</StatValue>
          <StatLabel>Minutes</StatLabel>
        </StatCard>

        {game.rating > 0 && (
          <StatCard>
            <StatIcon color="#ffc107">
              <Star size={24} />
            </StatIcon>
            <StatValue>{game.rating.toFixed(1)}</StatValue>
            <StatLabel>BGG Rating</StatLabel>
          </StatCard>
        )}

        {game.complexity > 0 && (
          <StatCard>
            <StatIcon color="#6f42c1">
              <TrendingUp size={24} />
            </StatIcon>
            <StatValue>{game.complexity.toFixed(1)}</StatValue>
            <StatLabel>Complexity</StatLabel>
          </StatCard>
        )}
      </GameStats>

      {game.categories && game.categories.length > 0 && (
        <Section>
          <SectionTitle>Categories</SectionTitle>
          <GameCategories>
            {game.categories.slice(0, 8).map((category, index) => (
              <Category key={index}>{category}</Category>
            ))}
          </GameCategories>
        </Section>
      )}

      {game.mechanics && game.mechanics.length > 0 && (
        <Section>
          <SectionTitle>Mechanics</SectionTitle>
          <GameMechanics>
            {game.mechanics.slice(0, 8).map((mechanic, index) => (
              <Mechanic key={index}>{mechanic}</Mechanic>
            ))}
          </GameMechanics>
        </Section>
      )}

    </PageContainer>
  )
}

export default GameDetailPage
