import { Outlet } from "react-router-dom"
import { useSocket } from "../context/SocketContext"
import { useEffect } from "react"
import MobileNavigation from "../components/MobileNavigation/MobileNavigation"
import Header from "../components/Header/Header"
import { LayoutContainer, MainContent } from "./Layout.styles"

const Layout = () => {
  const { joinForum } = useSocket()

  useEffect(() => {
    joinForum()
    return () => {
      // leaveForum() // Uncomment if needed
    }
  }, [joinForum])

  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <MobileNavigation />
    </LayoutContainer>
  )
}

export default Layout
