import { Link } from 'react-router-dom';
import { Users, Clock } from "lucide-react"
import {
  GameGrid,
  GameCard,
  GameImage,
  GameInfo,
  GameTitle,
  GameRank,
  LoadingText,
  GameMeta,
  MetaItem
} from './PopularGames.styles';

const PopularGames = ({ games = [], loading }) => {
  if (loading) {
    return <LoadingText>Cargando juegos...</LoadingText>;
  }

  if (!Array.isArray(games)) {
    return <LoadingText>No hay juegos disponibles</LoadingText>;
  }

  return (
    <div>
      <GameGrid>
        {games.map(game => (
          <GameCard key={game.bggId} as={Link} to={`/game/${game.bggId}`}>
            <GameRank>#{game.rank}</GameRank>
              <GameImage
                src={game.thumbnail.$?.value || game.thumbnail}
                alt={game.name}
              />
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
      </GameGrid>
    </div>
  );
};

export default PopularGames;
