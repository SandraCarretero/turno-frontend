import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -100px;
    right: -100px;
    backdrop-filter: blur(10px);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    bottom: -200px;
    left: -200px;
    backdrop-filter: blur(10px);
    z-index: 0;
  }
`;

export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 18px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.75rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: var(--color-secondary);
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PasswordStrength = styled.div`
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.$strength || 0}%;
    background: ${props => {
      if (props.$strength < 30) return '#e53935';
      if (props.$strength < 70) return '#ffb300';
      return '#43a047';
    }};
    transition: width 0.3s ease, background 0.3s ease;
  }
`;

export const PasswordStrengthText = styled.div`
  font-size: 0.75rem;
  color: ${props => {
    if (props.$strength < 30) return '#e53935';
    if (props.$strength < 70) return '#ffb300';
    return '#43a047';
  }};
  margin-top: 0.25rem;
  text-align: right;
`;

export const Button = styled.button`
  padding: 1rem;
  background: var(--color-secondary);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(106, 17, 203, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
  }
`;

export const TermsText = styled.div`
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  margin-top: 1rem;

  a {
    color: var(--color-secondary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #666;
  font-size: 0.95rem;

  a {
    color: var(--color-secondary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
  }
`;
