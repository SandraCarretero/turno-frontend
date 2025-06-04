import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { userAPI, gameAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  SearchContainer,
  SearchInput,
  SearchButton,
  ClearButton,
  SearchResults,
  SearchResult,
  ResultImage,
  ResultInfo,
  ResultTitle,
  ResultSubtitle,
  NoResults
} from './SearchBar.styles';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchType, setSearchType] = useState('users'); // 'users' or 'games'
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { data: users = [] } = useQuery({
    queryKey: ['searchUsers', query],
    queryFn: () => userAPI.searchUsers(query),
    enabled: query.length >= 2 && searchType === 'users'
  });

  const { data: games = [] } = useQuery({
    queryKey: ['searchGames', query],
    queryFn: () => gameAPI.searchGames(query),
    enabled: query.length >= 2 && searchType === 'games'
  });

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = e => {
    setQuery(e.target.value);
    setIsOpen(e.target.value.length >= 2);
  };

  const handleResultClick = result => {
    if (searchType === 'users') {
      navigate(`/user/${result._id}`);
    } else {
      navigate(`/game/${result.bggId}`);
    }
    setQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  const results = searchType === 'users' ? users : games;

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        placeholder={`Search ${searchType}...`}
        value={query}
        onChange={handleInputChange}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
      />

      <SearchButton
        onClick={() =>
          setSearchType(searchType === 'users' ? 'games' : 'users')
        }
      >
        <Search size={16} />
      </SearchButton>

      {query && (
        <ClearButton onClick={clearSearch}>
          <X size={16} />
        </ClearButton>
      )}

      {isOpen && (
        <SearchResults>
          {results.length > 0 ? (
            results.map(result => (
              <SearchResult
                key={result._id || result.bggId}
                onClick={() => handleResultClick(result)}
              >
                <ResultImage
                  src={
                    searchType === 'users'
                      ? result.avatar || '/placeholder.svg?height=40&width=40'
                      : result.thumbnail ||
                        '/placeholder.svg?height=40&width=40'
                  }
                  alt={searchType === 'users' ? result.username : result.name}
                />
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
              </SearchResult>
            ))
          ) : (
            <NoResults>No {searchType} found</NoResults>
          )}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
