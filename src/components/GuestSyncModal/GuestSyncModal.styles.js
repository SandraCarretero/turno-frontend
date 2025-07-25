import styled, { keyframes } from "styled-components"

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
`

export const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
`

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`

export const ModalBody = styled.div`
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  background: #fafafa;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  svg {
    color: #6c757d;
    flex-shrink: 0;
  }
`

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #adb5bd;
  }
`

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  margin-top: 1rem;
`

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
  cursor: ${(props) => (props.$noHover ? "default" : "pointer")};
  transition: all 0.2s ease;
  background: white;

  &:hover {
    background: ${(props) => (props.$noHover ? "white" : "#f8f9fa")};
    border-color: ${(props) => (props.$noHover ? "#e9ecef" : "var(--color-primary)")};
    transform: ${(props) => (props.$noHover ? "none" : "translateY(-1px)")};
    box-shadow: ${(props) => (props.$noHover ? "none" : "0 2px 8px rgba(0, 0, 0, 0.1)")};
  }
`

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const UserName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`

export const UserEmail = styled.span`
  font-size: 0.85rem;
  color: #6c757d;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #6c757d;
  flex: 1;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--color-primary);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.9rem;
    margin: 0;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
  flex: 1;

  svg {
    color: #dee2e6;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #495057;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
    max-width: 300px;
  }
`

export const SyncSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  flex: 1;

  svg {
    color: #28a745;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #28a745;
    margin: 0 0 0.75rem 0;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    color: #495057;
    max-width: 400px;
  }
`

export const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
`

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${(props) => (props.$variant === "secondary" ? "transparent" : "var(--color-primary)")};
  color: ${(props) => (props.$variant === "secondary" ? "var(--color-primary)" : "white")};
  border: ${(props) =>
    props.$variant === "secondary" ? "2px solid var(--color-primary)" : "2px solid var(--color-primary)"};

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$variant === "secondary" ? "var(--color-primary)" : "var(--color-primary-hover, #0056b3)"};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  &:disabled {
    background: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`
