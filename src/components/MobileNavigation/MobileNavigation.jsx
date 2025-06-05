import { NavLink } from "react-router-dom"
import { Home, UserRound, ChartNoAxesColumn, Plus, Search } from "lucide-react"
import { NavigationContainer, NavItem, NavIcon, NavLabel, AddButton } from "./MobileNavigation.styles"

const MobileNavigation = () => {
  return (
    <NavigationContainer>
      <NavItem as={NavLink} to="/">
        <NavIcon>
          <Home strokeWidth={3} size={20} />
        </NavIcon>
        <NavLabel>Home</NavLabel>
      </NavItem>

      <NavItem as={NavLink} to="/search">
        <NavIcon>
          <Search strokeWidth={3} size={20} />
        </NavIcon>
        <NavLabel>Search</NavLabel>
      </NavItem>

      <AddButton as={NavLink} to="/add-match">
        <Plus size={24} />
      </AddButton>

      <NavItem as={NavLink} to="/stats">
        <NavIcon>
          <ChartNoAxesColumn strokeWidth={3} size={20} />
        </NavIcon>
        <NavLabel>Stats</NavLabel>
      </NavItem>

      <NavItem as={NavLink} to="/profile">
        <NavIcon>
          <UserRound strokeWidth={2.5} size={20} />
        </NavIcon>
        <NavLabel>Profile</NavLabel>
      </NavItem>
    </NavigationContainer>
  )
}

export default MobileNavigation
