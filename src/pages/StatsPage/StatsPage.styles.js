import styled from "styled-components"

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--color-primary);
    border-radius: 2px;
  }
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const StatCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StatTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
  margin: 0;
`

export const StatIcon = styled.div`
  background: ${(props) => props.$color || "var(--color-primary)"}15;
  color: ${(props) => props.$color || "var(--color-primary)"};
  padding: 0.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${(props) => props.$color || "var(--color-primary)"}20;
`

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
`

export const StatSubtext = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
`

export const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.$positive ? "#28a745" : "#dc3545")};
  margin-top: 0.5rem;
`

export const Section = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  margin-bottom: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f8f9fa;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
  }

  svg {
    color: var(--color-primary);
  }
`

export const ChartContainer = styled.div`
  height: ${(props) => props.$height || "400px"};
  margin-bottom: 1.5rem;
`

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6c757d;
  font-size: 1.1rem;
  font-weight: 500;
  background: #f8f9fa;
  border-radius: 1rem;
  border: 2px dashed #dee2e6;
`

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StatsListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

export const StatsListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const StatsListItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const StatsListItemName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
`

export const StatsListItemValue = styled.div`
  font-weight: 700;
  color: var(--color-primary);
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  background: var(--color-primary)15;
  border-radius: 2rem;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`

export const LoadingText = styled.div`
  margin-top: 1.5rem;
  color: #6c757d;
  font-size: 1.1rem;
  font-weight: 500;
`

export const ErrorContainer = styled.div`
  text-align: center;
  color: #dc3545;
  padding: 3rem 2rem;
  background: #f8d7da;
  border-radius: 1rem;
  border: 1px solid #f5c6cb;
  margin: 2rem 0;
`

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem auto;

  &:hover {
    background: var(--color-primary-hover, #0056b3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
`
