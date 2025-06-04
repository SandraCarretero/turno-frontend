import styled from "styled-components"

export const NotificationContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border-left: 4px solid ${(props) => (props.isRead ? "#e9ecef" : "#007bff")};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SenderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`

export const SenderAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`

export const SenderName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`

export const NotificationTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.25rem;
`

export const NotificationIcon = styled.div`
  background: ${(props) => props.color}15;
  color: ${(props) => props.color};
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NotificationBody = styled.div`
  padding-left: 3.25rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`

export const NotificationMessage = styled.p`
  color: #333;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
`

export const NotificationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-left: 3.25rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #e9ecef;
    color: #495057;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const ReadIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 8px;
  height: 8px;
  background: #007bff;
  border-radius: 50%;
`
