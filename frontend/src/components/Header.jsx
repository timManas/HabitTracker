import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Header = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Navbar.Brand href='#home'>Habit Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#link'>Habits</Nav.Link>
          <NavDropdown title='UserName' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Account</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>Settings </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
