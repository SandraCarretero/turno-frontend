import styled from "styled-components"

export const PageContainer = styled.div`
  max-width: 900px;
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

export const MatchHeader = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`

export const GameInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

export const GameImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const GameDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const GameTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const MatchMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
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
  
  background: ${(props) => {
    if (props.variant === "danger") return "#dc3545"
    if (props.variant === "secondary") return "#6c757d"
    return "#007bff"
  }};
  color: white;

  &:hover:not(:disabled) {
    background: ${(props) => {
      if (props.variant === "danger") return "#c82333"
      if (props.variant === "secondary") return "#545b62"
      return "#0056b3"
    }};
    transform: translateY(-1px);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const MatchContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Section = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f8f9fa;
`

export const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const PlayerCard = styled.div`
  background: ${(props) => (props.isWinner ? "#28a74508" : "#f8f9fa")};
  border: 2px solid ${(props) => (props.isWinner ? "#28a745" : "#e9ecef")};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`

export const PlayerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
`

export const PlayerName = styled.div`
  font-weight: 600;
  color: #333;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #007bff;
  }
`

export const PlayerScore = styled.div`
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const WinnerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #28a745;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
`

export const MatchNotes = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #333;
  line-height: 1.6;
  font-style: italic;
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

export const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`

export const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`

export const ModalText = styled.p`
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 2rem;
`

export const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  background: ${(props) => {
    if (props.variant === "danger") return "#dc3545"
    if (props.variant === "secondary") return "#6c757d"
    return "#007bff"
  }};
  color: white;

  &:hover:not(:disabled) {
    background: ${(props) => {
      if (props.variant === "danger") return "#c82333"
      if (props.variant === "secondary") return "#545b62"
      return "#0056b3"
    }};
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`
