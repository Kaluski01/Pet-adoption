import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './navbar.css';
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
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" onSelect={handleSelect}>
            <Nav.Link as={Link} to="/" onClick={handleSelect}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleSelect}>
              About us
            </Nav.Link>
            <NavDropdown title="PETS" id="basic-nav-dropdown" className="mb-0">
              <NavDropdown.Item as={Link} to="/dogs" onClick={handleSelect}>
                Dogs
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} onClick={handleSelect} to='Own'>
              Paw-ssentials
            </Nav.Link>
          </Nav>
          <Nav onSelect={handleSelect}>
          <Nav.Item className="ml-lg-2">
              <Nav.Link as={Link} onClick={handleSelect} to='/signup/signup'>
                <Button type="submit">Sign up</Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
