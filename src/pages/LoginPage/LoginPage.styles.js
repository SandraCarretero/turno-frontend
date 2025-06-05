import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: radial-gradient(circle at 20% 30%, #ffd56f 0%, transparent 40%),
    radial-gradient(circle at 80% 20%, #ff8a80 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, #64b5f6 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, #9575cd 0%, transparent 50%);
  background-color: #c5e3ff9c;
  background-blend-mode: screen;
`;

export const FormContainer = styled.div`
  background: var(--color-white);
  padding: 2rem;
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  max-width: 400px;
  min-height: 80dvh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary-dark);
  font-size: 1.75rem;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: var(--color-dark);
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: var(--color-gray-600);
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  background: var(--color-secondary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-secondary-hover);
  }

  &:disabled {
    background: var(--color-gray-600);
    cursor: not-allowed;
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--color-gray-600);

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-danger);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
