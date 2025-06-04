import styled from "styled-components"

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 2rem;
`

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
    margin: 0;
  }
`
