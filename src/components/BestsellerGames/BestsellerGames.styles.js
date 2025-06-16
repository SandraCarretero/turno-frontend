import styled from 'styled-components';

export const GameGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
`;

export const GameCard = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 120px;
  object-fit: cover;
`;

export const GameInfo = styled.div`
  padding: 0.7rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
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
  
  export const LoadingText = styled.div`
    text-align: center;
    color: #6c757d;
    font-style: italic;
    padding: 2rem;
  `;