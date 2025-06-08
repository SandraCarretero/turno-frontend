'use client';

import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../../services/api';
import {
  PageContainer,
  Title,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  RefreshButton
} from './StatsPage.styles';
import { RefreshCw } from 'lucide-react';
import StatsOverview from '../../components/StatsOverview/StatsOverview';
import Loader from '../../components/Loader/Loader';

const StatsPage = () => {
  const {
    data: stats,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => userAPI.getUserStats()
  });

  console.log('stats', stats)

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingText>Cargando tus estadísticas de juego...</LoadingText>
          <Loader />
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
      <StatsOverview stats={statsData} />
    </PageContainer>
  );
};

export default StatsPage;
