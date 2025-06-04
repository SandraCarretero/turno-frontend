import styled from "styled-components"

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`

export const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #007bff;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;

  &:hover {
    background: #f8f9fa;
  }
`

export const ProfileHeader = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`

export const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e9ecef;
  flex-shrink: 0;
`

export const UserDetails = styled.div`
  flex: 1;

  p {
    color: #6c757d;
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
`

export const Username = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const FriendStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
  
  background: ${(props) => (props.status === "accepted" ? "#28a74515" : "#ffc10715")};
  color: ${(props) => (props.status === "accepted" ? "#28a745" : "#ffc107")};
`

export const UserStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`

export const StatItem = styled.div`
  text-align: center;
`

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #007bff;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 500;
  margin-top: 0.25rem;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${(props) => (props.variant === "secondary" ? "#6c757d" : "#007bff")};
  color: white;

  &:hover:not(:disabled) {
    background: ${(props) => (props.variant === "secondary" ? "#545b62" : "#0056b3")};
    transform: translateY(-1px);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const Section = styled.section`
  margin-bottom: 2rem;
`

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
`

export const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 3rem;
  font-size: 1.1rem;
`

export const ErrorMessage = styled.div`
  text-align: center;
  color: #dc3545;
  padding: 3rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const EmptyMatches = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
    color: #6c757d;
    margin: 0;
    font-size: 1rem;
  }
`
