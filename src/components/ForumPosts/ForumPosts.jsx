import { Link } from "react-router-dom"
import { MessageCircle, Heart, Clock } from "lucide-react"
import {
  PostsList,
  PostCard,
  PostHeader,
  AuthorInfo,
  AuthorAvatar,
  AuthorName,
  PostDate,
  PostTitle,
  PostContent,
  PostFooter,
  PostStats,
  StatItem,
  LoadingText,
  CreatePostButton,
} from "./ForumPosts.styles"

const ForumPosts = ({ posts, loading }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return <LoadingText>Loading forum posts...</LoadingText>
  }

  return (
    <>
      <CreatePostButton to="/forum/new">Create New Post</CreatePostButton>
      <PostsList>
        {posts.map((post) => (
          <PostCard key={post._id} as={Link} to={`/forum/post/${post._id}`}>
            <PostHeader>
              <AuthorInfo>
                <AuthorAvatar
                  src={post.author.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={post.author.username}
                />
                <div>
                  <AuthorName>{post.author.username}</AuthorName>
                  <PostDate>
                    <Clock size={12} />
                    {formatDate(post.createdAt)}
                  </PostDate>
                </div>
              </AuthorInfo>
            </PostHeader>

            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content.substring(0, 150)}...</PostContent>

            <PostFooter>
              <PostStats>
                <StatItem>
                  <MessageCircle size={16} />
                  {post.replies.length}
                </StatItem>
                <StatItem>
                  <Heart size={16} />
                  {post.likes.length}
                </StatItem>
              </PostStats>
            </PostFooter>
          </PostCard>
        ))}
      </PostsList>
    </>
  )
}

export default ForumPosts
