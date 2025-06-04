import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import MobileNavigation from "../components/MobileNavigation/MobileNavigation"
import Header from "../components/Header/Header"
import { LayoutContainer, MainContent } from "./Layout.styles"

const Layout = () => {

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
