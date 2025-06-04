import styled from "styled-components"

export const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`

export const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid ${(props) => props.color};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }
`

export const StatIcon = styled.div`
  background: ${(props) => props.color}15;
  color: ${(props) => props.color};
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StatContent = styled.div`
  flex: 1;
`

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #6c757d;
  margin: 0.25rem 0;
`

export const StatSubtext = styled.div`
  font-size: 0.8rem;
  color: #adb5bd;
`
