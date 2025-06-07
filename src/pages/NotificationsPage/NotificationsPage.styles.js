import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--color-primary);
    border-radius: 2px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const MarkAllButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: #0056b3;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

export const NotificationsList = styled.div`
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const EmptyDescription = styled.p`
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`;
