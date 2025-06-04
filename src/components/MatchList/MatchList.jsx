import MatchCard from "../MatchCard/MatchCard"
import { ListContainer, LoadingText, EmptyState } from "./MatchList.styles"

const MatchList = ({ matches, loading }) => {
  if (loading) {
    return <LoadingText>Loading matches...</LoadingText>
  }

  if (!matches || matches.length === 0) {
    return (
      <EmptyState>
        <h3>No matches yet</h3>
        <p>Start tracking your board game sessions!</p>
      </EmptyState>
    )
  }

  return (
    <ListContainer>
      {matches.map((match) => (
        <MatchCard key={match._id} match={match} />
      ))}
    </ListContainer>
  )
}

export default MatchList
