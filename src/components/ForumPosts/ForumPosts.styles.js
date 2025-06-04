import styled from "styled-components"
import { Link } from "react-router-dom"

export const CreatePostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`

export const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const PostCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

export const AuthorName = styled.div`
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
`

export const PostDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6c757d;
`

export const PostTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`

export const PostContent = styled.p`
  color: #6c757d;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`

export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6c757d;
  font-size: 0.875rem;
`

export const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 2rem;
`
