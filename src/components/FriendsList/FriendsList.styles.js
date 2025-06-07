import styled from 'styled-components';

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

export const FriendsContainer = styled.div`
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Friends = styled.li`
  width: 100%;
  padding-block: 10px;
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;
