import { Trophy, Calendar, Users, Target } from "lucide-react"
import {
  OverviewContainer,
  StatCard,
  StatIcon,
  StatContent,
  StatValue,
  StatLabel,
  StatSubtext,
} from "./StatsOverview.styles"

const StatsOverview = ({ stats }) => {
  if (!stats) return null

  const statCards = [
    {
      icon: <Trophy size={24} />,
      value: stats.totalMatches,
      label: "Total Matches",
      subtext: `${stats.matchesThisMonth} this month`,
      color: "#007bff",
    },
    {
      icon: <Target size={24} />,
      value: `${stats.winRate}%`,
      label: "Win Rate",
      subtext: `${stats.wins} wins`,
      color: "#28a745",
    },
    {
      icon: <Calendar size={24} />,
      value: stats.uniqueGamesThisMonth,
      label: "Games This Month",
      subtext: "Unique games played",
      color: "#ffc107",
    },
    {
      icon: <Users size={24} />,
      value: stats.mostPlayedWithFriend?.count || 0,
      label: "Top Gaming Buddy",
      subtext: stats.mostPlayedWithFriend?.user?.username || "None yet",
      color: "#6f42c1",
    },
  ]

  return (
    <OverviewContainer>
      {statCards.map((stat, index) => (
        <StatCard key={index} color={stat.color}>
          <StatIcon color={stat.color}>{stat.icon}</StatIcon>
          <StatContent>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
            <StatSubtext>{stat.subtext}</StatSubtext>
          </StatContent>
        </StatCard>
      ))}
    </OverviewContainer>
  )
}

export default StatsOverview
