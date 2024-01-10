import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export function BasicExample() {
  return (
    <Navbar expand="lg" bg="light"  data-bs-theme="dark" className="bg-body-tertiary fixed-top" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          PET FINDER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="PETS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/dogs">
                Dogs
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cat">
                Cats
              </NavDropdown.Item>
            </NavDropdown>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to='/signup/signup'>Sign up</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to='Own'>Paw-ssentials</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to='Search'>Furry Friends Services</Nav.Link>
          </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
