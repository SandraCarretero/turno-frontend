import { NavLink } from "react-router-dom"
import { Home, User, BarChart3, Plus, Search } from "lucide-react"
import { NavigationContainer, NavItem, NavIcon, NavLabel, AddButton } from "./MobileNavigation.styles"

const MobileNavigation = () => {
  return (
    <NavigationContainer>
      <NavItem as={NavLink} to="/">
        <NavIcon>
          <Home size={20} />
        </NavIcon>
        <NavLabel>Home</NavLabel>
      </NavItem>

      <NavItem as={NavLink} to="/search">
        <NavIcon>
          <Search size={20} />
        </NavIcon>
        <NavLabel>Search</NavLabel>
      </NavItem>

      <AddButton as={NavLink} to="/add-match">
        <Plus size={24} />
      </AddButton>

      <NavItem as={NavLink} to="/stats">
        <NavIcon>
          <BarChart3 size={20} />
        </NavIcon>
        <NavLabel>Stats</NavLabel>
      </NavItem>

      <NavItem as={NavLink} to="/profile">
        <NavIcon>
          <User size={20} />
        </NavIcon>
        <NavLabel>Profile</NavLabel>
      </NavItem>
    </NavigationContainer>
  )
}

export default MobileNavigation
