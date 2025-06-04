import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { authAPI } from "../../services/api"
import { CheckCircle, XCircle, Loader } from "lucide-react"
import {
  PageContainer,
  Card,
  IconContainer,
  Title,
  Message,
  ActionButton,
  LoadingSpinner,
} from "./VerifyEmailPage.styles"

const VerifyEmailPage = () => {
  const { token } = useParams()
  const [status, setStatus] = useState("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authAPI.verifyEmail(token)
        setStatus("success")
        setMessage(response.data.message || "Email verified successfully!")
      } catch (error) {
        setStatus("error")
        setMessage(error.response?.data?.message || "Email verification failed")
      }
    }

    if (token) {
      verifyEmail()
    } else {
      setStatus("error")
      setMessage("Invalid verification link")
    }
  }, [token])

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <IconContainer status="loading">
              <LoadingSpinner>
                <Loader size={48} />
              </LoadingSpinner>
            </IconContainer>
            <Title>Verifying your email...</Title>
            <Message>Please wait while we verify your email address.</Message>
          </>
        )

      case "success":
        return (
          <>
            <IconContainer status="success">
              <CheckCircle size={48} />
            </IconContainer>
            <Title>Email Verified!</Title>
            <Message>{message}</Message>
            <ActionButton as={Link} to="/login">
              Continue to Login
            </ActionButton>
          </>
        )

      case "error":
        return (
          <>
            <IconContainer status="error">
              <XCircle size={48} />
            </IconContainer>
            <Title>Verification Failed</Title>
            <Message>{message}</Message>
            <ActionButton as={Link} to="/register">
              Back to Registration
            </ActionButton>
          </>
        )

      default:
        return null
    }
  }

  return (
    <PageContainer>
      <Card>{renderContent()}</Card>
    </PageContainer>
  )
}

export default VerifyEmailPage
