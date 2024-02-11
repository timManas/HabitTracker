import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Nav className='me-auto'>
        <Nav.Link>About</Nav.Link>
        <Nav.Link>Policy</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Footer
