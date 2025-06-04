import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartSection, ChartTitle, ChartsGrid } from "./StatsCharts.styles"

const StatsCharts = ({ stats }) => {
  if (!stats) return null

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const monthlyData = monthNames.map((month, index) => {
    const monthStat = stats.monthlyStats?.find((stat) => stat._id === index + 1)
    return {
      month,
      games: monthStat?.totalGames || 0,
      wins: monthStat?.wins || 0,
    }
  })

  const winLossData = [
    { name: "Wins", value: stats.wins, color: "#28a745" },
    { name: "Losses", value: stats.totalMatches - stats.wins, color: "#dc3545" },
  ]

  return (
    <ChartsGrid>
      <ChartSection>
        <ChartTitle>Monthly Gaming Activity</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="games" fill="#007bff" name="Total Games" />
              <Bar dataKey="wins" fill="#28a745" name="Wins" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>

      <ChartSection>
        <ChartTitle>Win/Loss Ratio</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={winLossData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>
    </ChartsGrid>
  )
}

export default StatsCharts
