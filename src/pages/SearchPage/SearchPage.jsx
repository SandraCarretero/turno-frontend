import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Dices, X } from 'lucide-react';
import { userAPI, gameAPI } from '../../services/api';
import {
  PageContainer,
  Header,
  Title,
  SearchContainer,
  SearchTypeToggle,
  ToggleButton,
  SearchInputContainer,
  SearchInput,
  ClearButton,
  ResultsContainer,
  ResultsHeader,
  ResultsCount,
  ResultsList,
  ResultItem,
  ResultImage,
  ResultInfo,
  ResultTitle,
  ResultSubtitle,
  LoadingText,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription
} from './SearchPage.styles';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('users');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['searchUsers', debouncedQuery],
    queryFn: async () => {
      const response = await userAPI.searchUsers(debouncedQuery);
      return response?.data || [];
    },

    enabled: debouncedQuery.length >= 2 && searchType === 'users'
  });

  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: ['searchGames', debouncedQuery],
    queryFn: async () => {
      const response = await gameAPI.searchGames(debouncedQuery);
      console.log('Games response:', response);
      return response ?? [];
    },
    enabled: debouncedQuery.length >= 2 && searchType === 'games'
  });

  const handleResultClick = result => {
    if (searchType === 'users') {
      navigate(`/user/${result._id}`);
    } else {
      navigate(`/game/${result.bggId}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  const isLoading = searchType === 'users' ? usersLoading : gamesLoading;
  const results = searchType === 'users' ? users : games;
  const hasQuery = debouncedQuery.length >= 2;
  const hasResults = results.length > 0;

  const searchTypeLabels = {
  users: 'usuarios',
  games: 'juegos',
};

  return (
    <PageContainer>
      <Header>
        <Title>
          <Search size={24} />
          Search
        </Title>
      </Header>

      <SearchContainer>
        <SearchTypeToggle>
          <ToggleButton
            $active={searchType === 'users'}
            onClick={() => setSearchType('users')}
          >
            <Users size={16} />
            Usuarios
          </ToggleButton>
          <ToggleButton
            $active={searchType === 'games'}
            onClick={() => setSearchType('games')}
          >
            <Dices size={16} />
            Juegos
          </ToggleButton>
        </SearchTypeToggle>

        <SearchInputContainer>
          <SearchInput
            type="text"
            placeholder={`Buscar ${searchTypeLabels[searchType]}...`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <ClearButton onClick={clearSearch}>
              <X size={16} />
            </ClearButton>
          )}
        </SearchInputContainer>
      </SearchContainer>

      <ResultsContainer>
        {!hasQuery ? (
          <EmptyState>
            <EmptyIcon>
              {searchType === 'users' ? (
                <Users size={48} />
              ) : (
                <Dices size={48} />
              )}
            </EmptyIcon>
            <EmptyTitle>Empieza a buscar</EmptyTitle>
            <EmptyDescription>
              Escribe al menos 2 caracteres para buscar {' '}
               {searchTypeLabels[searchType]}
            </EmptyDescription>
          </EmptyState>
        ) : isLoading ? (
          <LoadingText>Buscando {searchTypeLabels[searchType]}...</LoadingText>
        ) : hasResults ? (
          <>
            <ResultsList>
              {results.map(result => (
                <ResultItem
                  key={result._id || result.bggId}
                  onClick={() => handleResultClick(result)}
                >
                  {searchType === 'users' ? (
                    <UserAvatar user={result} />
                  ) : (
                    <ResultImage src={result.image} alt={result.name} />
                  )}
                  <ResultInfo>
                    <ResultTitle>
                      {searchType === 'users' ? result.username : result.name}
                    </ResultTitle>
                    <ResultSubtitle>
                      {searchType === 'users'
                        ? result.email
                        : `${result.minPlayers}-${result.maxPlayers} players • ${result.playingTime}min`}
                    </ResultSubtitle>
                  </ResultInfo>
                </ResultItem>
              ))}
            </ResultsList>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <Search size={48} />
            </EmptyIcon>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              No {searchType} found for "{debouncedQuery}". Try a different
              search term.
            </EmptyDescription>
          </EmptyState>
        )}
      </ResultsContainer>
    </PageContainer>
  );
};

export default SearchPage;
