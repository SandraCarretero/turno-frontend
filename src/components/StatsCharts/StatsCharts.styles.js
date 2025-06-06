import styled from "styled-components"

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const ChartCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.$accentColor || "var(--color-primary)"};
  }
`

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: ${(props) => props.$accentColor || "var(--color-primary)"};
    border-radius: 1px;
  }
`

export const ChartTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${(props) => props.$iconColor || "var(--color-primary)"};
  }
`

export const ChartActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const ChartButton = styled.button`
  padding: 0.5rem;
  background: ${(props) => (props.$active ? "var(--color-primary)" : "#f8f9fa")};
  color: ${(props) => (props.$active ? "white" : "#6c757d")};
  border: 1px solid ${(props) => (props.$active ? "var(--color-primary)" : "#e9ecef")};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background: ${(props) => (props.$active ? "var(--color-primary)" : "#e9ecef")};
    color: ${(props) => (props.$active ? "white" : "#333")};
  }
`

export const ChartContent = styled.div`
  height: ${(props) => props.$height || "300px"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MockChart = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 0.75rem;
  border: 2px dashed #dee2e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #6c757d;
  font-size: 0.95rem;
  gap: 0.5rem;

  svg {
    color: #dee2e6;
    margin-bottom: 0.5rem;
  }
`

export const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
`

export const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${(props) => props.$color || "var(--color-primary)"};
`

export const ChartStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
`

export const ChartStat = styled.div`
  text-align: center;
`

export const ChartStatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
`

export const ChartStatLabel = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const FullWidthChart = styled(ChartCard)`
  grid-column: 1 / -1;
`

export const NoDataMessage = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 0.75rem;
  border: 2px dashed #dee2e6;
`
