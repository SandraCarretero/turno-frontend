import styled from 'styled-components';

export const GameGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
`;

export const GameCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  position: relative;
  min-width: 200px;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const GameRank = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: var(--color-secondary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 1;
`;

export const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const GameInfo = styled.div`
  padding: 1rem;
`;

export const GameTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 2rem;
`;
