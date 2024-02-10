import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Nav className='me-auto'>
        <Nav.Link href='#home'>Home</Nav.Link>
        <Nav.Link href='#link'>Link</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Footer
