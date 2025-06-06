import styled from "styled-components"

export const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const OverviewCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
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

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

export const CardTitle = styled.h3`
  font-size: 1.1rem;
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

export const CardIcon = styled.div`
  background: ${(props) => props.$color || "var(--color-primary)"}15;
  color: ${(props) => props.$color || "var(--color-primary)"};
  padding: 0.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${(props) => props.$color || "var(--color-primary)"}20;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const MainStat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

export const MainValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
`

export const MainUnit = styled.div`
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
`

export const SubStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const SubStat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
`

export const SubStatLabel = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
`

export const SubStatValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`

export const ProgressFill = styled.div`
  height: 100%;
  background: ${(props) => props.$color || "var(--color-primary)"};
  width: ${(props) => props.$percentage || 0}%;
  border-radius: 4px;
  transition: width 0.3s ease;
`

export const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.$positive ? "#28a745" : props.$negative ? "#dc3545" : "#6c757d")};
  margin-top: 0.5rem;

  svg {
    color: inherit;
  }
`

export const RecentActivity = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
`

export const ActivityTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #6c757d;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6c757d;
`

export const ActivityGame = styled.span`
  font-weight: 500;
  color: #333;
`

export const ActivityDate = styled.span`
  font-size: 0.8rem;
  color: #adb5bd;
`
