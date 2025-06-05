import styled from "styled-components"

export const PageContainer = styled.div`
  max-width: 1000px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Section = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

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
  
  svg {
    color: var(--color-primary);
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`

export const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`

export const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #fafafa;
  width: ${(props) => props.$width || "auto"};

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`

export const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #fafafa;
  cursor: pointer;
  width: ${(props) => props.$width || "120px"};

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }
`

export const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  background: #fafafa;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`

export const GameSearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

export const GameSearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 1rem;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  background: #fafafa;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
  }

  &::placeholder {
    color: #adb5bd;
    font-weight: 500;
  }
`

export const SearchStatus = styled.div`
  padding: 12px;
  font-size: 14px;
  color: ${(props) => (props.$error ? "#dc2626" : "#666")};
  background: ${(props) => (props.$error ? "#fef2f2" : "transparent")};
  border: ${(props) => (props.$error ? "1px solid #fecaca" : "none")};
  border-radius: ${(props) => (props.$error ? "6px" : "0")};
  margin: ${(props) => (props.$error ? "8px 0" : "0")};
`

export const GameSearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  max-height: 350px;
  overflow-y: auto;
  z-index: 100;
  margin-top: 0.5rem;
`

export const GameSearchResult = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  &:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
`

export const GameImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const GameInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const GameName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
`

export const GameMeta = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 500;
`

export const SelectedGame = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 1rem;
  border: 2px solid var(--color-primary);
  margin-bottom: 1rem;
`

export const PlayersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 1rem;
  border: 1px solid #e9ecef;
  flex-wrap: wrap;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 150px;
`

export const PlayerName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`

export const SyncButton = styled.button`
  font-size: 0.75rem;
  background-color: #e6f0ff;
  color: var(--color-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.25rem;
  display: inline-block;

  &:hover {
    background-color: #cce0ff;
  }
`

export const RemovePlayerButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);

  &:hover {
    background: #c82333;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
  }
`

export const AddPlayerContainer = styled.div`
  position: relative;
  background: #f8f9fa;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px dashed #dee2e6;
`

export const PlayerSearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`

export const PlayerSearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  max-height: 250px;
  overflow-y: auto;
  z-index: 100;
  margin-top: 0.5rem;
`

export const PlayerSearchResult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }
`

export const AddGuestButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
`

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: var(--color-primary);
  cursor: pointer;
`

export const CheckboxLabel = styled.label`
  font-weight: 500;
  color: #333;
  cursor: pointer;
  user-select: none;
  font-size: 0.95rem;
`

export const CooperativeResultContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`

export const CooperativeResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  svg {
    color: #28a745;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
`

export const CooperativeResultOptions = styled.div`
  display: flex;
  gap: 1rem;
`

export const CooperativeResultOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  span {
    font-weight: 500;
    color: ${(props) => (props.$success ? "#28a745" : props.$error ? "#dc3545" : "inherit")};
  }
`

export const TeamWinnersContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`

export const TeamWinnersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  svg {
    color: #007bff;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
`

export const TeamWinnersButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

export const TeamWinnerButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  background: ${(props) => (props.$isWinner ? "#28a745" : "white")};
  border-color: ${(props) => (props.$isWinner ? "#1e7e34" : "#007bff")};
  color: ${(props) => (props.$isWinner ? "white" : "#007bff")};
  box-shadow: ${(props) => (props.$isWinner ? "0 4px 8px rgba(40, 167, 69, 0.3)" : "0 2px 4px rgba(0, 123, 255, 0.1)")};
`

export const TeamWinnersNote = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  margin: 0.75rem 0 0 0;

  span {
    color: #28a745;
    font-weight: 500;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${(props) => {
    if (props.$variant === "secondary") return "transparent"
    if (props.$variant === "link") return "transparent"
    return "var(--color-primary)"
  }};
  
  color: ${(props) => {
    if (props.$variant === "secondary") return "var(--color-primary)"
    if (props.$variant === "link") return "#007bff"
    return "white"
  }};
  
  border: ${(props) => {
    if (props.$variant === "secondary") return "2px solid var(--color-primary)"
    if (props.$variant === "link") return "none"
    return "2px solid var(--color-primary)"
  }};

  font-size: ${(props) => (props.$variant === "link" ? "0.75rem" : "1rem")};
  min-width: ${(props) => (props.$variant === "link" ? "auto" : "150px")};
  padding: ${(props) => (props.$variant === "link" ? "0.25rem 0.5rem" : "1rem 2rem")};

  &:hover:not(:disabled) {
    background: ${(props) => {
      if (props.$variant === "link") return "#f8f9fa"
      return props.$variant === "secondary" ? "var(--color-primary)" : "var(--color-primary-hover, #0056b3)"
    }};
    color: ${(props) => (props.$variant === "link" ? "#0056b3" : "white")};
    transform: ${(props) => (props.$variant === "link" ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) => (props.$variant === "link" ? "none" : "0 4px 12px rgba(0, 123, 255, 0.3)")};
  }

  &:disabled {
    background: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f8d7da;
  border-radius: 0.5rem;
  border: 1px solid #f5c6cb;
`
