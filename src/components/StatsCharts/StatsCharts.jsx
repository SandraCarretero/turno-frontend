import { useState } from 'react';
import {
  ChartsContainer,
  ChartCard,
  ChartHeader,
  ChartTitle,
  ChartActions,
  ChartButton,
  ChartContent,
  MockChart,
  ChartLegend,
  LegendItem,
  LegendColor,
  ChartStats,
  ChartStat,
  ChartStatValue,
  ChartStatLabel,
  FullWidthChart,
  NoDataMessage
} from './StatsCharts.styles';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Trophy,
  Users,
  Clock
} from 'lucide-react';

const StatsCharts = ({ stats = {}, chartType = 'overview' }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartView, setChartView] = useState('bar');

  const {
    monthlyMatches = [],
    gameStats = [],
    playerStats = [],
    winRateOverTime = [],
    totalMatches = 0,
    totalWins = 0,
    averageGameDuration = 0,
    mostPlayedGame = null
  } = stats;

  const renderOverviewCharts = () => (
    <>
      {/* Partidas por Mes */}
      <ChartCard $accentColor="#007bff">
        <ChartHeader $accentColor="#007bff">
          <ChartTitle $iconColor="#007bff">
            <BarChart3 size={20} />
            Partidas por Mes
          </ChartTitle>
          <ChartActions>
            <ChartButton
              $active={chartView === 'bar'}
              onClick={() => setChartView('bar')}
            >
              Barras
            </ChartButton>
            <ChartButton
              $active={chartView === 'line'}
              onClick={() => setChartView('line')}
            >
              Línea
            </ChartButton>
          </ChartActions>
        </ChartHeader>
        <ChartContent>
          {monthlyMatches.length > 0 ? (
            <MockChart>
              <BarChart3 size={48} />
              <div>Gráfico de partidas mensuales</div>
              <small>Aquí iría el gráfico real con los datos</small>
            </MockChart>
          ) : (
            <NoDataMessage>
              No hay suficientes datos para mostrar el gráfico mensual
            </NoDataMessage>
          )}
        </ChartContent>
        <ChartStats>
          <ChartStat>
            <ChartStatValue>{monthlyMatches.length}</ChartStatValue>
            <ChartStatLabel>Meses</ChartStatLabel>
          </ChartStat>
          <ChartStat>
            <ChartStatValue>
              {Math.max(...monthlyMatches.map(m => m.count || 0), 0)}
            </ChartStatValue>
            <ChartStatLabel>Máximo</ChartStatLabel>
          </ChartStat>
          <ChartStat>
            <ChartStatValue>
              {monthlyMatches.length > 0
                ? Math.round(
                    monthlyMatches.reduce((acc, m) => acc + (m.count || 0), 0) /
                      monthlyMatches.length
                  )
                : 0}
            </ChartStatValue>
            <ChartStatLabel>Promedio</ChartStatLabel>
          </ChartStat>
        </ChartStats>
      </ChartCard>

      {/* Tasa de Victoria */}
      <ChartCard $accentColor="#28a745">
        <ChartHeader $accentColor="#28a745">
          <ChartTitle $iconColor="#28a745">
            <TrendingUp size={20} />
            Tasa de Victoria
          </ChartTitle>
          <ChartActions>
            <ChartButton
              $active={timeRange === 'week'}
              onClick={() => setTimeRange('week')}
            >
              Semana
            </ChartButton>
            <ChartButton
              $active={timeRange === 'month'}
              onClick={() => setTimeRange('month')}
            >
              Mes
            </ChartButton>
            <ChartButton
              $active={timeRange === 'year'}
              onClick={() => setTimeRange('year')}
            >
              Año
            </ChartButton>
          </ChartActions>
        </ChartHeader>
        <ChartContent>
          {winRateOverTime.length > 0 ? (
            <MockChart>
              <LineChart size={48} />
              <div>Evolución de la tasa de victoria</div>
              <small>Gráfico de línea temporal</small>
            </MockChart>
          ) : (
            <NoDataMessage>
              No hay suficientes datos para mostrar la evolución
            </NoDataMessage>
          )}
        </ChartContent>
        <ChartLegend>
          <LegendItem>
            <LegendColor $color="#28a745" />
            Victorias
          </LegendItem>
          <LegendItem>
            <LegendColor $color="#dc3545" />
            Derrotas
          </LegendItem>
        </ChartLegend>
      </ChartCard>

      {/* Juegos Más Jugados */}
      <FullWidthChart $accentColor="#6f42c1">
        <ChartHeader $accentColor="#6f42c1">
          <ChartTitle $iconColor="#6f42c1">
            <PieChart size={20} />
            Juegos Más Jugados
          </ChartTitle>
          <ChartActions>
            <ChartButton $active={true}>Top 10</ChartButton>
          </ChartActions>
        </ChartHeader>
        <ChartContent $height="400px">
          {gameStats.length > 0 ? (
            <MockChart>
              <PieChart size={64} />
              <div>Distribución de juegos jugados</div>
              <small>Gráfico circular con los juegos más populares</small>
            </MockChart>
          ) : (
            <NoDataMessage>
              No hay suficientes datos de juegos para mostrar
            </NoDataMessage>
          )}
        </ChartContent>
        <ChartStats>
          <ChartStat>
            <ChartStatValue>{gameStats.length}</ChartStatValue>
            <ChartStatLabel>Juegos</ChartStatLabel>
          </ChartStat>
          <ChartStat>
            <ChartStatValue>{mostPlayedGame?.name || 'N/A'}</ChartStatValue>
            <ChartStatLabel>Favorito</ChartStatLabel>
          </ChartStat>
          <ChartStat>
            <ChartStatValue>{mostPlayedGame?.playCount || 0}</ChartStatValue>
            <ChartStatLabel>Partidas</ChartStatLabel>
          </ChartStat>
          <ChartStat>
            <ChartStatValue>{averageGameDuration}</ChartStatValue>
            <ChartStatLabel>Min/Partida</ChartStatLabel>
          </ChartStat>
        </ChartStats>
      </FullWidthChart>
    </>
  );

  const renderGameCharts = () => (
    <FullWidthChart $accentColor="#fd7e14">
      <ChartHeader $accentColor="#fd7e14">
        <ChartTitle $iconColor="#fd7e14">
          <Trophy size={20} />
          Estadísticas Detalladas por Juego
        </ChartTitle>
      </ChartHeader>
      <ChartContent $height="500px">
        <MockChart>
          <Trophy size={64} />
          <div>Análisis detallado por juego</div>
          <small>Victorias, derrotas, puntuaciones promedio por juego</small>
        </MockChart>
      </ChartContent>
    </FullWidthChart>
  );

  const renderPlayerCharts = () => (
    <FullWidthChart $accentColor="#e83e8c">
      <ChartHeader $accentColor="#e83e8c">
        <ChartTitle $iconColor="#e83e8c">
          <Users size={20} />
          Estadísticas con Otros Jugadores
        </ChartTitle>
      </ChartHeader>
      <ChartContent $height="500px">
        <MockChart>
          <Users size={64} />
          <div>Análisis de compañeros de juego</div>
          <small>Victorias y derrotas contra otros jugadores</small>
        </MockChart>
      </ChartContent>
    </FullWidthChart>
  );

  const renderTimeCharts = () => (
    <FullWidthChart $accentColor="#20c997">
      <ChartHeader $accentColor="#20c997">
        <ChartTitle $iconColor="#20c997">
          <Clock size={20} />
          Análisis de Tiempo de Juego
        </ChartTitle>
      </ChartHeader>
      <ChartContent $height="500px">
        <MockChart>
          <Clock size={64} />
          <div>Patrones de tiempo de juego</div>
          <small>Duración de partidas, horarios preferidos, etc.</small>
        </MockChart>
      </ChartContent>
    </FullWidthChart>
  );

  return (
    <ChartsContainer>
      {chartType === 'overview' && renderOverviewCharts()}
      {chartType === 'games' && renderGameCharts()}
      {chartType === 'players' && renderPlayerCharts()}
      {chartType === 'time' && renderTimeCharts()}
    </ChartsContainer>
  );
};

export default StatsCharts;
