import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
`;

export const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 18px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NotificationButton = styled.button`
  position: relative;
  padding: 0.5rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6c757d;

  &:hover {
    background: #f8f9fa;
    color: var(--color-primary);
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-secondary);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
`;
