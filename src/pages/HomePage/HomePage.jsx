import { useQuery } from "@tanstack/react-query"
import { gameAPI } from "../../services/api"
import PopularGames from "../../components/PopularGames/PopularGames"
import { PageContainer, Section, SectionTitle } from "./HomePage.styles"

const HomePage = () => {
  const { data: popularGames = [], isLoading: gamesLoading } = useQuery({
    queryKey: ["popularGames"],
    queryFn: gameAPI.getPopularGames,
  })
  
  const { data: bestsellers = [], isLoading: bestsellersLoading } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: gameAPI.getBestsellers,
  })

  return (
    <PageContainer>
      <Section>
        <SectionTitle>Top juegos</SectionTitle>
        <PopularGames games={popularGames} loading={gamesLoading} />
      </Section>

      <Section>
        <SectionTitle>Bestsellers</SectionTitle>
        <PopularGames games={bestsellers} loading={bestsellersLoading}/>
      </Section>
    </PageContainer>
  )
}

export default HomePage
