import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Tab = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: ${props =>
    props.$active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => (props.$active ? 'white' : 'var(--color-gray-600)')};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => (props.$active ? 'var(--color-primary-hover)' : 'var(--color-gray-300)')};
    color: ${props => (props.$active ? 'white' : 'var(--color-primary)')};
  }
`;
