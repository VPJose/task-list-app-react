import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { useTask } from "../context/TaskContext"
import { useNavigate } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()

  const { user, logout } = useTask()

  const name = !user ? null : user.displayName ? user.displayName : user.email

  const handleClick = async () => {
    await logout()
    navigate('/')
  }

  return (
    <Navbar bg="light" className="row mb-3">
      <h1 className="text-center col-10">
        Welcome {name}
      </h1>
      <Nav bg="light" className="col-1">
        {
          user ? (<NavDropdown title={name} >
            <NavDropdown.Item onClick={handleClick} >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>

            </>)
        }
      </Nav>
    </Navbar>
  )
}

export default Header
