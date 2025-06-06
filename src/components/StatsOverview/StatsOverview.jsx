'use client';

import {
  OverviewContainer,
  OverviewCard,
  CardHeader,
  CardTitle,
  CardIcon,
  CardContent,
  MainStat,
  MainValue,
  MainUnit,
  SubStats,
  SubStat,
  SubStatLabel,
  SubStatValue,
  ProgressBar,
  ProgressFill,
  TrendIndicator,
  RecentActivity,
  ActivityTitle,
  ActivityList,
  ActivityItem,
  ActivityGame,
  ActivityDate
} from './StatsOverview.styles';
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  Target,
  Award
} from 'lucide-react';

const StatsOverview = ({ stats = {} }) => {
  const {
    totalMatches = 0,
    totalWins = 0,
    totalPlayTime = 0,
    uniqueGames = 0,
    winRate = 0,
    averageScore = 0,
    favoriteGame = null,
    recentMatches = [],
    monthlyGrowth = 0,
    weeklyMatches = 0
  } = stats;

  // Función para validar y formatear números
  const safeNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // Función para formatear porcentajes
  const formatPercentage = value => {
    const num = safeNumber(value, 0);
    return num.toFixed(1);
  };

  // Calcular winRate si no viene en los datos
  const calculatedWinRate =
    totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;
  const finalWinRate = safeNumber(winRate) || calculatedWinRate;

  const formatPlayTime = minutes => {
    const totalMinutes = safeNumber(minutes, 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return { hours, minutes: mins };
  };

  const playTime = formatPlayTime(totalPlayTime);

  const formatDate = dateString => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <OverviewContainer>
      {/* Partidas y Victorias */}
      <OverviewCard $accentColor="#007bff">
        <CardHeader>
          <CardTitle $iconColor="#007bff">
            <Trophy size={20} />
            Rendimiento General
          </CardTitle>
          <CardIcon $color="#007bff">
            <Target size={20} />
          </CardIcon>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>{safeNumber(totalWins)}</MainValue>
            <MainUnit>/ {safeNumber(totalMatches)} victorias</MainUnit>
          </MainStat>
          <ProgressBar>
            <ProgressFill $percentage={finalWinRate} $color="#007bff" />
          </ProgressBar>
          <SubStats>
            <SubStat>
              <SubStatLabel>Tasa de victoria</SubStatLabel>
              <SubStatValue>{formatPercentage(finalWinRate)}%</SubStatValue>
            </SubStat>
            <SubStat>
              <SubStatLabel>Puntuación promedio</SubStatLabel>
              <SubStatValue>{safeNumber(averageScore)}</SubStatValue>
            </SubStat>
          </SubStats>
          {safeNumber(monthlyGrowth) !== 0 && (
            <TrendIndicator
              $positive={monthlyGrowth > 0}
              $negative={monthlyGrowth < 0}
            >
              {monthlyGrowth > 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {Math.abs(safeNumber(monthlyGrowth))}% este mes
            </TrendIndicator>
          )}
        </CardContent>
      </OverviewCard>

      {/* Tiempo de Juego */}
      <OverviewCard $accentColor="#6f42c1">
        <CardHeader>
          <CardTitle $iconColor="#6f42c1">
            <Clock size={20} />
            Tiempo de Juego
          </CardTitle>
          <CardIcon $color="#6f42c1">
            <Calendar size={20} />
          </CardIcon>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>{playTime.hours}</MainValue>
            <MainUnit>horas {playTime.minutes}min</MainUnit>
          </MainStat>
          <SubStats>
            <SubStat>
              <SubStatLabel>Partidas esta semana</SubStatLabel>
              <SubStatValue>{safeNumber(weeklyMatches)}</SubStatValue>
            </SubStat>
            <SubStat>
              <SubStatLabel>Promedio por partida</SubStatLabel>
              <SubStatValue>
                {safeNumber(totalMatches) > 0
                  ? Math.round(
                      safeNumber(totalPlayTime) / safeNumber(totalMatches)
                    )
                  : 0}{' '}
                min
              </SubStatValue>
            </SubStat>
          </SubStats>
        </CardContent>
      </OverviewCard>

      {/* Juegos y Colección */}
      <OverviewCard $accentColor="#28a745">
        <CardHeader>
          <CardTitle $iconColor="#28a745">
            <Star size={20} />
            Tu Colección
          </CardTitle>
          <CardIcon $color="#28a745">
            <Award size={20} />
          </CardIcon>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>{safeNumber(uniqueGames)}</MainValue>
            <MainUnit>juegos diferentes</MainUnit>
          </MainStat>
          <SubStats>
            <SubStat>
              <SubStatLabel>Juego favorito</SubStatLabel>
              <SubStatValue>{favoriteGame?.name || 'N/A'}</SubStatValue>
            </SubStat>
            {favoriteGame && (
              <SubStat>
                <SubStatLabel>Partidas jugadas</SubStatLabel>
                <SubStatValue>
                  {safeNumber(favoriteGame.playCount)}
                </SubStatValue>
              </SubStat>
            )}
          </SubStats>
        </CardContent>
      </OverviewCard>

      {/* Actividad Reciente */}
      <OverviewCard $accentColor="#fd7e14">
        <CardHeader>
          <CardTitle $iconColor="#fd7e14">
            <Users size={20} />
            Actividad Reciente
          </CardTitle>
          <CardIcon $color="#fd7e14">
            <Calendar size={20} />
          </CardIcon>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>
              {Array.isArray(recentMatches) ? recentMatches.length : 0}
            </MainValue>
            <MainUnit>partidas recientes</MainUnit>
          </MainStat>
          <RecentActivity>
            <ActivityTitle>Últimas Partidas</ActivityTitle>
            <ActivityList>
              {Array.isArray(recentMatches) && recentMatches.length > 0 ? (
                recentMatches.slice(0, 4).map((match, index) => (
                  <ActivityItem key={match._id || index}>
                    <ActivityGame>
                      {match.game?.name || 'Juego desconocido'}
                    </ActivityGame>
                    <ActivityDate>{formatDate(match.date)}</ActivityDate>
                  </ActivityItem>
                ))
              ) : (
                <ActivityItem>
                  <span style={{ color: '#6c757d', fontStyle: 'italic' }}>
                    No hay partidas recientes
                  </span>
                </ActivityItem>
              )}
            </ActivityList>
          </RecentActivity>
        </CardContent>
      </OverviewCard>
    </OverviewContainer>
  );
};

export default StatsOverview;
