import { Link } from 'react-router-dom';
import {
  GameGrid,
  GameCard,
  GameImage,
  GameInfo,
  GameTitle,
  GameRank,
  LoadingText
} from './BestsellerGames.styles';

const BestsellerGames = ({ games = [], loading }) => {
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
            
            <GameImage
              src={game.thumbnail.$?.value || game.thumbnail}
              alt={game.name}
            />
            <GameInfo>
              <GameTitle>{game.name}</GameTitle>
            </GameInfo>
          </GameCard>
        ))}
      </GameGrid>
    </div>
  );
};

export default BestsellerGames;
