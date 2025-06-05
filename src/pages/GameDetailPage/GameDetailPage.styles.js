import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
`;

export const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;

  &:hover {
    background: #f8f9fa;
  }
`;
export const GameHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.6rem;
  border-radius: 1rem;
`;

export const GameImage = styled.img`
  width: 150px;
  aspect-ratio: 1;
  border-radius: 0.75rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const GameInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GameTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
`;

export const GameMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const GameDescription = styled.div`
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.6rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  justify-content: center;
  margin-bottom: 2.6rem;

  background: ${props =>
    props.variant === 'secondary' ? 'transparent' : 'var(--color-secondary)'};
  color: ${props =>
    props.variant === 'secondary' ? 'var(--color-secondary)' : 'var(--color-white)'};
  border: ${props =>
    props.variant === 'secondary' ? '1px solid var(--color-secondary)' : 'var(--color-secondary)'};

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${props =>
        props.variant === 'secondary' ? 'var(--color-secondary)' : 'var(--color-secondary-hover)'};
      transform: translateY(-1px);
      color: var(--color-white);
    }
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const GameStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const StatIcon = styled.div`
  background: ${(props) => props.$color}15;
  color: ${(props) => props.$color};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${(props) => props.$color}20;
`

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 500;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
`;

export const GameCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Category = styled.span`
  background: var(--color-primary-transparent);
  color: var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const GameMechanics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Mechanic = styled.span`
  background: var(--color-secondary-transparent);
  color: var(--color-secondary);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 2rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: #dc3545;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const EmptyMatches = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
    color: #6c757d;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
`;
