import { useQuery } from "@tanstack/react-query"
import { userAPI } from "../../services/api"
import StatsOverview from "../../components/StatsOverview/StatsOverview"
import StatsCharts from "../../components/StatsCharts/StatsCharts"
import { PageContainer, Title } from "./StatsPage.styles"
import Loader from "../../components/Loader/Loader"

const StatsPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: userAPI.getUserStats,
  })

  if (isLoading) {
    return (
      <PageContainer>
        <Loader/>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Title>Your Gaming Statistics</Title>
      <StatsOverview stats={stats.data} />
      <StatsCharts stats={stats.data} />
    </PageContainer>
  )
}

export default StatsPage
