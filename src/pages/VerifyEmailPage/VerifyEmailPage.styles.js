import styled, { keyframes } from "styled-components"

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`

export const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`

export const IconContainer = styled.div`
  margin-bottom: 1.5rem;
  color: ${(props) => {
    switch (props.status) {
      case "success":
        return "#28a745"
      case "error":
        return "#dc3545"
      case "loading":
        return "#007bff"
      default:
        return "#6c757d"
    }
  }};
`

export const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  display: inline-block;
`

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`

export const Message = styled.p`
  color: #6c757d;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`
