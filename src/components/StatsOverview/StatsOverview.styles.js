import styled from 'styled-components';

export const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

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
    background: ${props => props.$accentColor || '#007bff'};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${props => props.$iconColor || '#007bff'};
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MainStat = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const MainValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
`;

export const MainUnit = styled.div`
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
`;

export const SubStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SubStat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
`;

export const SubStatLabel = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
  flex: 1;
`;

export const SubStatValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.$color || '#007bff'};
  width: ${props => props.$percentage || 0}%;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const GameCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
  margin: 1rem 0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const GameImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const GameInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const GameName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.2;
`;

export const GameCount = styled.div`
  font-size: 0.8rem;
  color: #6f42c1;
  font-weight: 500;
  background: #6f42c115;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  display: inline-block;
  width: fit-content;
`;

export const PartnerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 0.75rem;
  border: 1px solid #ffeaa7;
  margin: 1rem 0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(253, 126, 20, 0.2);
  }
`;

export const PartnerInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PartnerName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
  line-height: 1.2;
`;

export const PartnerCount = styled.div`
  font-size: 0.8rem;
  color: #fd7e14;
  font-weight: 500;
  background: #fd7e1415;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  display: inline-block;
  width: fit-content;
`;
