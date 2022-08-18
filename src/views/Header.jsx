import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { useTask } from "../context/TaskContext"
import { useNavigate } from "react-router-dom"
import image from "../image-not-found.webp"

const Header = () => {

  const navigate = useNavigate()

  const { user, logout } = useTask()

  const handleClick = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Navbar bg="light" className="row mb-3 border-black border">
      <h1 className="text-center col-10">
        {user?.displayName || user?.email}
      </h1>
      <Nav bg="light" className="col-1">
        {
          user && (<NavDropdown
            title={
              <img
                src={user?.photoURL || image}
                className="border rounded-circle w-75" />
            } >
            <NavDropdown.Item onClick={handleClick} >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          )}
      </Nav>
    </Navbar>
  )
}

export default Header
