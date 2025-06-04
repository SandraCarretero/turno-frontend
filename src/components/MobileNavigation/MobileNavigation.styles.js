import styled from "styled-components"

export const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  z-index: 1000;

  @media (min-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 250px;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 0;
    border-top: none;
    border-right: 1px solid #e9ecef;
  }
`

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.2s;

  &.active {
    color: #007bff;
    background: #e7f3ff;
  }

  &:hover {
    color: #007bff;
    background: #f8f9fa;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    width: 200px;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
    margin: 0.25rem 1rem;
  }
`

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

export const AddButton = styled.div`
  width: 56px;
  height: 56px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: all 0.2s;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 48px;
    border-radius: 0.5rem;
    margin: 1rem;
  }
`
