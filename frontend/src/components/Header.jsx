import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
  const id = useSelector((state) => state.user.id)
  const name = useSelector((state) => state.user.name)
  const email = useSelector((state) => state.user.email)
  // const email = useSelector((state) => console.log(state))

  // TODO: Fetch from Store to get user info
  // const user = { name: 'Tim', email: 'hell@email.com' }
  // const user = {}

  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand href='#home'>Habit Tracker</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {name == '' ? (
              <LinkContainer to='/login'>
                <Nav.Link> Sign In</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <LinkContainer to='/habits'>
                  <Nav.Link>Habits</Nav.Link>
                </LinkContainer>

                <NavDropdown title={name} id='basic-nav-dropdown'>
                  <LinkContainer to='/accounts'>
                    <NavDropdown.Item href='#action/3.1'>
                      Account
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/settings'>
                    <NavDropdown.Item href='#action/3.2'>
                      Settings{' '}
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <LinkContainer to='/logout'>
                    <NavDropdown.Item href='#action/3.4'>
                      Log Out
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
