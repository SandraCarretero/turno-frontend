import styled from 'styled-components';

export const NavigationShade = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(0deg, #fff, transparent);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;

  @media (width >= 768px) {
    background: none;
    pointer-events: none;
  }
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

  @media (width >= 768px) {
    height: 80dvh;
    width: max-content;
    flex-direction: column;
    align-items: stretch;
    left: 0;
    margin: initial;
    margin-left: 40px;
    top: 100px;
    pointer-events: all;
  }

  @media (width >= 768px) and (width <= 1280px) {
    height: 75dvh;
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

  @media (width >= 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
    margin: 0.25rem 1rem;
    cursor: pointer;
  }

  @media (width >= 768px) and (width <= 1280px) {
    padding: 0.7rem 1rem;
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
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: var(--color-white);
  }

  @media (width >= 768px) and (width <= 1280px) {
    font-size: 0.8rem;
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

  @media (width >= 768px) {
    position: static;
    height: max-content;
    width: max-content;
    transform: scale(1);
    padding: 1rem;
    margin: 0.25rem 1rem;
    border-radius: 0.5rem;
  }

  @media (width >= 768px) and (width <= 1280px) {
    padding: 0.7rem 1rem;
  }
`;
