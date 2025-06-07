import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
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
  color: #333;
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
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  background: ${props => {
    if (props.variant === 'secondary') return 'var(--color-gray-600)';
    if (props.variant === 'danger') return 'var(--color-danger)';
    return 'var(--color-secondary)';
  }};
  color: white;

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.variant === 'secondary') return '#545b62';
      if (props.variant === 'danger') return '#af0c1b';
      return 'var(--color-secondary-hover);';
    }};
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;
