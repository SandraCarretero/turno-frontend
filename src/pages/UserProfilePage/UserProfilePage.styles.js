import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;

  &:hover {
    background: #f8f9fa;
  }
`;

export const ProfileHeader = styled.div`
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const UserColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e9ecef;
  flex-shrink: 0;
`;

export const UserDetails = styled.div`
  flex: 1;

  p {
    color: #6c757d;
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
`;

export const Username = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FriendStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;

  background: ${props =>
    props.status === 'accepted' ? '#28a74515' : '#ffc10715'};
  color: ${props => (props.status === 'accepted' ? '#28a745' : '#ffc107')};
`;

export const UserStats = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  justify-content: space-between;

  @media (width >= 768px) {
    justify-content: flex-start;
    gap: 50px;
  }
`;

export const StatItem = styled.div``;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  background: ${props =>
    props.variant === 'secondary' ? 'transparent' : 'var(--color-secondary)'};
  color: ${props =>
    props.variant === 'secondary'
      ? 'var(--color-secondary)'
      : 'var(--color-white)'};
  border: ${props =>
    props.variant === 'secondary'
      ? '1px solid var(--color-secondary)'
      : 'var(--color-secondary)'};

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${props =>
        props.variant === 'secondary'
          ? 'var(--color-secondary)'
          : 'var(--color-secondary-hover)'};
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

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
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
  padding: 3rem;
  font-size: 1.1rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: #dc3545;
  padding: 3rem;
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
    margin: 0;
    font-size: 1rem;
  }
`;
