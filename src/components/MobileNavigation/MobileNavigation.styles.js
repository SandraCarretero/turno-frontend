import styled from 'styled-components';

export const NavigationShade = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(0deg, #fff, transparent);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

export const NavigationContainer = styled.nav`
  width: 90%;
  margin: 0 auto;
  position: fixed;
  bottom: 5px;
  border-radius: 28px;
  left: 0;
  right: 0;
  background: var(--color-primary);
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
`;

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
    color: var(--color-secondary);
    background: var(--color-secondary);
  }

  @media (hover: hover) {
    &:hover {
      color: var(--color-secondary);
      background: var(--color-primary-hover);
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    width: 200px;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
    margin: 0.25rem 1rem;
  }
`;

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
`;

export const NavLabel = styled.span`
  display: none;
  @media (width >= 768px) {
    font-size: 0.75rem;
    font-weight: 500;
    font-size: 1rem;
  }
`;

export const AddButton = styled.div`
  position: relative;
  bottom: 17px;
  transform: scale(1.5);
  background: var(--color-secondary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  padding: 10px;

  @media (hover: hover) {
    &:hover {
      background: var(--color-secondary-hover);
    }
  }
`;
