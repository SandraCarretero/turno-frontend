import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-primary);
  background: transparent;
  border: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
  text-decoration: none;

  &:hover {
    background: #f8f9fa;
    transform: translateX(-2px);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-2px);
  }
`;

export const MatchHeader = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export const GameImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const GameImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 968px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

export const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);

  svg {
    color: white;
  }
`;

export const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const GameTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

export const GameTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 80px;
    height: 3px;
    background: var(--color-primary);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    text-align: center;

    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const GameSubtitle = styled.p`
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
`;

export const MatchMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const MatchMeta = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const MetaItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    color: ${props => props.$statusColor || 'var(--color-primary)'};
    background: white;
    padding: 0.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (width >= 768px) {
    width: 45%;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  background: ${props => {
    if (props.$variant === 'danger') return '#dc3545';
    if (props.$variant === 'secondary') return 'transparent';
    return 'var(--color-primary)';
  }};

  color: ${props => {
    if (props.$variant === 'secondary') return 'var(--color-primary)';
    return 'white';
  }};

  border: ${props => {
    if (props.$variant === 'secondary') return '2px solid var(--color-primary)';
    if (props.$variant === 'danger') return '2px solid #dc3545';
    return '2px solid var(--color-primary)';
  }};

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.$variant === 'danger') return '#c82333';
      if (props.$variant === 'secondary') return 'var(--color-primary)';
      return 'var(--color-primary-hover, #0056b3)';
    }};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${props => {
      if (props.$variant === 'danger')
        return '0 4px 12px rgba(220, 53, 69, 0.3)';
      return '0 4px 12px rgba(0, 123, 255, 0.3)';
    }};
  }

  &:disabled {
    background: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

export const MatchContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Section = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f8f9fa;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
  }

  svg {
    color: var(--color-primary);
  }
`;

export const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PlayerCard = styled.div`
  background: ${props =>
    props.$isWinner
      ? 'linear-gradient(135deg, #d4edda 0%, #f8f9fa 100%)'
      : 'white'};
  border: 2px solid ${props => (props.$isWinner ? '#28a745' : '#e9ecef')};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

export const PlayerName = styled.div`
  font-weight: 600;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const PlayerScore = styled.div`
  color: #6c757d;
  font-size: 0.875rem;
`;

export const GuestBadge = styled.span`
  font-size: 0.7rem;
  color: #6c757d;
  display: block;
  margin-top: 0.25rem;
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  display: inline-block;
`;

export const SyncedBadge = styled.span`
  font-size: 0.7rem;
  color: #28a745;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  background: #d4edda;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  display: inline-flex;
`;

export const WinnerBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #28a745;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
  }
`;

export const TeamContainer = styled.div`
  padding: 1.5rem;
  background: ${props =>
    props.$isWinner
      ? 'linear-gradient(135deg, #d4edda 0%, #f8f9fa 100%)'
      : 'white'};
  border: 2px solid
    ${props => (props.$isWinner ? '#28a745' : props.$teamColor || '#e9ecef')};
  border-radius: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e9ecef;
`;

export const TeamName = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

export const TeamWinnerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #28a745;
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
  }
`;

export const CooperativeResult = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${props =>
    props.$success
      ? 'linear-gradient(135deg, #d4edda 0%, #f8f9fa 100%)'
      : 'linear-gradient(135deg, #f8d7da 0%, #f8f9fa 100%)'};
  border: 2px solid ${props => (props.$success ? '#28a745' : '#dc3545')};
  border-radius: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

export const CooperativeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #28a745;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const CooperativeTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => (props.$success ? '#155724' : '#721c24')};
`;

export const CooperativeText = styled.p`
  margin: 0;
  color: ${props => (props.$success ? '#155724' : '#721c24')};
  font-size: 0.95rem;
`;

export const WinnersDisplay = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #28a745;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem;
  background: #d4edda;
  border-radius: 0.75rem;
  border: 1px solid #c3e6cb;
`;

export const MatchNotes = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 4px solid var(--color-primary);
  padding: 1.5rem;
  border-radius: 0.75rem;
  color: #333;
  line-height: 1.6;
  font-style: italic;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const MatchDetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (width >= 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const MatchDetailItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const MatchDetailLabel = styled.strong`
  font-size: 0.9rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MatchDetailValue = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

export const MatchDetailLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-primary-hover, #0056b3);
    text-decoration: underline;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 3rem;
  font-size: 1.1rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: #dc3545;
  padding: 3rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f5c6cb;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 450px;
  width: 100%;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 40px;
    height: 3px;
    background: #dc3545;
    border-radius: 2px;
  }
`;

export const ModalText = styled.p`
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${props => {
    if (props.$variant === 'danger') return '#dc3545';
    if (props.$variant === 'secondary') return 'transparent';
    return 'var(--color-primary)';
  }};

  color: ${props => {
    if (props.$variant === 'secondary') return '#6c757d';
    return 'white';
  }};

  border: ${props => {
    if (props.$variant === 'secondary') return '2px solid #6c757d';
    if (props.$variant === 'danger') return '2px solid #dc3545';
    return '2px solid var(--color-primary)';
  }};

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.$variant === 'danger') return '#c82333';
      if (props.$variant === 'secondary') return '#f8f9fa';
      return 'var(--color-primary-hover, #0056b3)';
    }};
    transform: translateY(-2px);
    box-shadow: ${props => {
      if (props.$variant === 'danger')
        return '0 4px 12px rgba(220, 53, 69, 0.3)';
      if (props.$variant === 'secondary') return 'none';
      return '0 4px 12px rgba(0, 123, 255, 0.3)';
    }};
  }

  &:disabled {
    background: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;
