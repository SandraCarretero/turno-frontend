import { useParams, Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import { ArrowLeft, UserPlus, UserCheck, MessageCircle, Trophy } from "lucide-react"
import MatchCard from "../../components/MatchCard/MatchCard"
import toast from "react-hot-toast"
import {
  PageContainer,
  BackButton,
  ProfileHeader,
  UserInfo,
  UserDetails,
  Username,
  UserStats,
  StatItem,
  StatValue,
  StatLabel,
  ActionButtons,
  ActionButton,
  Section,
  SectionTitle,
  MatchesList,
  LoadingText,
  ErrorMessage,
  EmptyMatches,
  FriendStatus,
} from "./UserProfilePage.styles"
import UserAvatar from "../../components/UserAvatar/UserAvatar"

const UserProfilePage = () => {
  const { userId } = useParams()
  const { user: currentUser } = useAuth()
  const queryClient = useQueryClient()

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => userAPI.getUserProfile(userId),
    enabled: !!userId,
  })

  const sendFriendRequestMutation = useMutation({
    mutationFn: userAPI.sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", userId])
      toast.success("Friend request sent!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send friend request")
    },
  })

  const acceptFriendRequestMutation = useMutation({
    mutationFn: userAPI.acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", userId])
      queryClient.invalidateQueries(["auth", "me"])
      toast.success("Friend request accepted!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to accept friend request")
    },
  })

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingText>Loading profile...</LoadingText>
      </PageContainer>
    )
  }

  if (error || !profileData) {
    return (
      <PageContainer>
        <ErrorMessage>Failed to load user profile</ErrorMessage>
      </PageContainer>
    )
  }

  const { user: profileUser, matches } = profileData
  const isOwnProfile = currentUser?._id === profileUser._id

  // Check friendship status
  const friendshipStatus = () => {
    if (isOwnProfile) return "self"

    const friendship = profileUser.friends?.find((f) => f.user._id === currentUser._id)
    if (!friendship) return "none"

    return friendship.status // "pending" or "accepted"
  }

  const currentUserFriendship = currentUser?.friends?.find((f) => f.user === profileUser._id)
  const hasPendingRequest = currentUserFriendship?.status === "pending"

  const status = friendshipStatus()

  const handleSendFriendRequest = () => {
    sendFriendRequestMutation.mutate(profileUser._id)
  }

  const handleAcceptFriendRequest = () => {
    acceptFriendRequestMutation.mutate(profileUser._id)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <PageContainer>
      <BackButton as={Link} to="/">
        <ArrowLeft size={20} />
        Back
      </BackButton>

      <ProfileHeader>
        <UserInfo>
          <UserAvatar user={profileUser} size='big'/>
          <UserDetails>
            <Username>{profileUser.username}</Username>
            <p>Member since {formatDate(profileUser.createdAt)}</p>

            {status === "accepted" && (
              <FriendStatus status="accepted">
                <UserCheck size={16} />
                Friends
              </FriendStatus>
            )}
            {status === "pending" && (
              <FriendStatus status="pending">
                <UserPlus size={16} />
                Friend request pending
              </FriendStatus>
            )}
          </UserDetails>
        </UserInfo>

        <UserStats>
          <StatItem>
            <StatValue>{profileUser.games?.length || 0}</StatValue>
            <StatLabel>Games</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{matches?.length || 0}</StatValue>
            <StatLabel>Matches</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{profileUser.friends?.filter((f) => f.status === "accepted").length || 0}</StatValue>
            <StatLabel>Friends</StatLabel>
          </StatItem>
        </UserStats>

        {!isOwnProfile && (
          <ActionButtons>
            {status === "none" && (
              <ActionButton onClick={handleSendFriendRequest} disabled={sendFriendRequestMutation.isLoading}>
                <UserPlus size={16} />
                {sendFriendRequestMutation.isLoading ? "Sending..." : "Add Friend"}
              </ActionButton>
            )}

            {hasPendingRequest && (
              <ActionButton onClick={handleAcceptFriendRequest} disabled={acceptFriendRequestMutation.isLoading}>
                <UserCheck size={16} />
                {acceptFriendRequestMutation.isLoading ? "Accepting..." : "Accept Request"}
              </ActionButton>
            )}

          </ActionButtons>
        )}
      </ProfileHeader>

      <Section>
        <SectionTitle>
          <Trophy size={20} />
          Recent Matches ({matches?.length || 0})
        </SectionTitle>

        {matches && matches.length > 0 ? (
          <MatchesList>
            {matches.slice(0, 10).map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </MatchesList>
        ) : (
          <EmptyMatches>
            <p>{isOwnProfile ? "You haven't" : `${profileUser.username} hasn't`} recorded any matches yet.</p>
          </EmptyMatches>
        )}
      </Section>
    </PageContainer>
  )
}

export default UserProfilePage
