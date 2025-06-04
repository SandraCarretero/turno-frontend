import { Link } from "react-router-dom"
import { Plus, Users, Clock } from "lucide-react"
import {
  CollectionContainer,
  AddGameButton,
  GamesGrid,
  GameCard,
  GameImage,
  GameInfo,
  GameTitle,
  GameMeta,
  MetaItem,
  EmptyState,
} from "./GameCollection.styles"

const GameCollection = ({ games }) => {
  if (!games || games.length === 0) {
    return (
      <EmptyState>
        <h3>No games in collection</h3>
        <p>Start building your board game collection!</p>
      </EmptyState>
    )
  }

  return (
    <CollectionContainer>
      <GamesGrid>
        {games.map((game) => (
          <GameCard key={game.bggId} as={Link} to={`/game/${game.bggId}`}>
            <GameImage src={game.image || "/placeholder.svg?height=120&width=120"} alt={game.name} />
            <GameInfo>
              <GameTitle>{game.name}</GameTitle>
              <GameMeta>
                <MetaItem>
                  <Users size={12} />
                  {game.minPlayers}-{game.maxPlayers}
                </MetaItem>
                <MetaItem>
                  <Clock size={12} />
                  {game.playingTime}min
                </MetaItem>
              </GameMeta>
            </GameInfo>
          </GameCard>
        ))}
      </GamesGrid>
    </CollectionContainer>
  )
}

export default GameCollection
