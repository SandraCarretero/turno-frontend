'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../../services/api';
import {
  PageContainer,
  Title,
  Section,
  SectionTitle,
  ChartContainer,
  TabsContainer,
  Tab,
  FilterContainer,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  NoDataMessage,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  RefreshButton
} from './StatsPage.styles';
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Star,
  TrendingUp,
  BarChart3,
  LineChart,
  RefreshCw
} from 'lucide-react';
import StatsOverview from '../../components/StatsOverview/StatsOverview';
import StatsCharts from '../../components/StatsCharts/StatsCharts';
import Loader from '../../components/Loader/Loader';

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('all');

  const {
    data: stats,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => userAPI.getUserStats()
  });

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <Loader />
          <LoadingText>Cargando tus estadísticas de juego...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Title>Tus Estadísticas</Title>
        <ErrorContainer>
          <p>
            Error al cargar las estadísticas. Por favor, inténtalo de nuevo.
          </p>
          <RefreshButton onClick={() => refetch()}>
            <RefreshCw size={16} />
            Reintentar
          </RefreshButton>
        </ErrorContainer>
      </PageContainer>
    );
  }

  const statsData = stats?.data || {};

  return (
    <PageContainer>
      <Title>Tus Estadísticas</Title>

      {/* Tabs Navigation */}
      <TabsContainer>
        <Tab
          $active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp size={16} style={{ marginRight: '0.5rem' }} />
          Resumen
        </Tab>
        <Tab
          $active={activeTab === 'games'}
          onClick={() => setActiveTab('games')}
        >
          <BarChart3 size={16} style={{ marginRight: '0.5rem' }} />
          Juegos
        </Tab>
        <Tab
          $active={activeTab === 'players'}
          onClick={() => setActiveTab('players')}
        >
          <Users size={16} style={{ marginRight: '0.5rem' }} />
          Jugadores
        </Tab>
        <Tab
          $active={activeTab === 'time'}
          onClick={() => setActiveTab('time')}
        >
          <LineChart size={16} style={{ marginRight: '0.5rem' }} />
          Tiempo
        </Tab>
      </TabsContainer>

      {/* Filters */}
      <FilterContainer>
        <FilterGroup>
          <FilterLabel>Periodo:</FilterLabel>
          <FilterSelect
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
          >
            <option value="all">Todo el tiempo</option>
            <option value="month">Último mes</option>
            <option value="year">Último año</option>
            <option value="week">Última semana</option>
          </FilterSelect>
        </FilterGroup>
      </FilterContainer>

      {/* Content based on active tab */}
      {activeTab === 'overview' && <StatsOverview stats={statsData} />}

      {activeTab === 'games' && (
        <Section>
          <SectionTitle>
            <BarChart3 size={20} />
            Estadísticas por Juego
          </SectionTitle>
          <ChartContainer>
            {statsData.gameStats && statsData.gameStats.length > 0 ? (
              <StatsCharts stats={statsData} chartType="games" />
            ) : (
              <NoDataMessage>
                No hay suficientes datos para mostrar estadísticas por juego.
              </NoDataMessage>
            )}
          </ChartContainer>
        </Section>
      )}

      {activeTab === 'players' && (
        <Section>
          <SectionTitle>
            <Users size={20} />
            Estadísticas por Jugador
          </SectionTitle>
          <ChartContainer>
            {statsData.playerStats && statsData.playerStats.length > 0 ? (
              <StatsCharts stats={statsData} chartType="players" />
            ) : (
              <NoDataMessage>
                No hay suficientes datos para mostrar estadísticas por jugador.
              </NoDataMessage>
            )}
          </ChartContainer>
        </Section>
      )}

      {activeTab === 'time' && (
        <Section>
          <SectionTitle>
            <LineChart size={20} />
            Tiempo de Juego
          </SectionTitle>
          <ChartContainer>
            {statsData.timeStats && statsData.timeStats.length > 0 ? (
              <StatsCharts stats={statsData} chartType="time" />
            ) : (
              <NoDataMessage>
                No hay suficientes datos para mostrar estadísticas de tiempo.
              </NoDataMessage>
            )}
          </ChartContainer>
        </Section>
      )}
    </PageContainer>
  );
};

export default StatsPage;
