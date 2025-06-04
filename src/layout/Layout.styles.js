import styled from "styled-components"

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  padding-bottom: 80px; /* Space for mobile navigation */
  max-width: 100%;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding-bottom: 1rem;
    margin-left: 250px; /* Space for desktop sidebar */
  }
`
