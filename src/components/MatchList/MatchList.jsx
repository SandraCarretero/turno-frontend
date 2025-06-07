import MatchCard from '../MatchCard/MatchCard';
import { ListContainer, LoadingText, EmptyState } from './MatchList.styles';

const MatchList = ({ matches, loading }) => {
  if (loading) {
    return <LoadingText>Cargando partidas...</LoadingText>;
  }

  if (!matches || matches.length === 0) {
    return (
      <EmptyState>
        <h3>No hay partidas aún</h3>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {[...matches]
        .sort((a, b) => new Date(b.date) - new Date(a.date)) 
        .map(match => (
          <MatchCard key={match._id} match={match} />
        ))}
    </ListContainer>
  );
};

export default MatchList;
