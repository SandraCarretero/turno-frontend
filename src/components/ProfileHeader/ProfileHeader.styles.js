import styled from 'styled-components';

export const HeaderContainer = styled.div`
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-direction: row;
`;

export const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;

  &:hover > div {
    opacity: 1;
  }
`;

export const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--coolor-primary);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e9ecef;
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const Username = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
`;

export const Email = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
`;

export const Stats = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  justify-content: space-between;
`;

export const StatItem = styled.div`
`;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }

  &:nth-child(2) {
    background: #28a745;

    &:hover {
      background: #1e7e34;
    }
  }
`;
