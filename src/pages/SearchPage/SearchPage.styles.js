import styled from "styled-components"

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  min-height: calc(100vh - 140px);
`

export const Header = styled.div`
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const SearchContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

export const SearchTypeToggle = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 0.75rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  gap: 0.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const ToggleButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${(props) => (props.$active ? "#007bff" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#6c757d")};

  &:hover {
    background: ${(props) => (props.$active ? "#0056b3" : "#e9ecef")};
    color: ${(props) => (props.$active ? "white" : "#007bff")};
  }
`

export const SearchInputContainer = styled.div`
  position: relative;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #007bff;
    background: white;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`

export const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #495057;
  }
`

export const ResultsContainer = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  overflow: hidden;
`

export const ResultsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f8f9fa;
`

export const ResultsCount = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #6c757d;
  margin: 0;
`

export const ResultsList = styled.div`
  max-height: 500px;
  overflow-y: auto;
`

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.2s;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`

export const ResultImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #e9ecef;
`

export const ResultInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const ResultTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ResultSubtitle = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 3rem;
  font-size: 1.1rem;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
`

export const EmptyIcon = styled.div`
  margin-bottom: 1.5rem;
  opacity: 0.5;
`

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`

export const EmptyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
`
