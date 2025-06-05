import styled from 'styled-components';

export const CardContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const GameInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export const GameImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
`;

export const GameDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GameTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

export const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const InfoIcon = styled.div`
  color: #6c757d;
  display: flex;
  align-items: center;
`;

export const InfoText = styled.span`
  font-size: 0.875rem;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

export const Player = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

export const PlayerAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PlayerName = styled.span`
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
`;

export const WinnerBadge = styled.div`
  background: #ffc107;
  color: #333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  left: 20px;
  z-index: 1;
`;
