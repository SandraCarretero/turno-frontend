import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AddGameButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background: #1e7e34;
  }
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const GameCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  height: max-content;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const GameImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

export const GameInfo = styled.div`
  padding: 0.7rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 40%;
`;

export const GameTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const GameMeta = styled.div`
  display: flex;
  gap: 1rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6c757d;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
    margin: 0 0 1.5rem 0;
  }
`;
