import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './navbar.css'
import { useState } from 'react';

export default function BasicExample() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleSelect}>
          PET FINDER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse className="mx-auto"  id="basic-navbar-nav">
          <Nav onSelect={handleSelect}>
            <Nav.Link as={Link} to="/" onClick={handleSelect}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleSelect}>
              About us
            </Nav.Link>
            <NavDropdown title="PETS" id="basic-nav-dropdown" className="mb-0"> {/* Add mb-0 class */}
              <NavDropdown.Item as={Link} to="/dogs" onClick={handleSelect}>
                Dogs
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cats" onClick={handleSelect}>
                Cats
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto" onSelect={handleSelect}>
            <Nav.Link as={Link} onClick={handleSelect}  to='/signup/signup'>
              Sign up
            </Nav.Link>
            <Nav.Link as={Link} onClick={handleSelect} to='Own'>
              Paw-ssentials
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
