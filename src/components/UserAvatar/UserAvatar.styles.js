import styled from 'styled-components';

export const AvatarImage = styled.img`
  width: ${props =>
    props.$size === 'small' ? '45px' : props.$size === 'big' ? '80px' : '50px'};
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  width: ${props =>
    props.$size === 'small' ? '30px' : props.$size === 'big' ? '80px' : '50px'};
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props =>
    props.$size === 'small' ? '12px' : props.$size === 'big' ? '20px' : '16px'};
  text-transform: uppercase;
`;
