import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';
import { FaPaw } from 'react-icons/fa';

export default function BasicExample() {
  const [expanded, setExpanded] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
    setShowLoginOptions(false);
  };

  const toggleLoginOptions = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark" fixed="top" className="shadow-lg py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleSelect} className="d-flex align-items-center gap-2 text-warning">
          <FaPaw size={28} />
          <span className="fw-bold fs-4">PET FINDER</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav" className="mt-3 mt-lg-0">
          <Nav className="mx-auto gap-4 text-uppercase fw-semibold" onSelect={handleSelect}>
            <Nav.Link as={Link} to="/" onClick={handleSelect} className="text-light hover:text-warning">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleSelect} className="text-light hover:text-warning">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/dogs" onClick={handleSelect} className="text-light hover:text-warning">
              Pets
            </Nav.Link>
            <Nav.Link as={Link} to="/own" onClick={handleSelect} className="text-light hover:text-warning">
              Paw-ssentials
            </Nav.Link>
          </Nav>
          <Nav onSelect={handleSelect} className="d-flex align-items-center gap-3 position-relative">
            <Button
              variant="outline-light"
              onClick={toggleLoginOptions}
              className="fw-bold px-4 py-2 rounded-pill shadow-sm position-relative"
            >
              Log In
            </Button>
            {showLoginOptions && (
              <div
                className="position-absolute bg-dark p-2 rounded shadow"
                style={{ top: '100%', right: 0, zIndex: 1000 }}
              >
                <Button as={Link} to="/Login" onClick={handleSelect} variant="warning" className="w-100 mb-2">
                  As Seller
                </Button>
                <Button as={Link} to="/Adopterlogin" onClick={handleSelect} variant="warning" className="w-100">
                  As Adopter
                </Button>
              </div>
            )}
            <Nav.Link as={Link} to="/signup/signup" onClick={handleSelect}>
              <Button variant="warning" className="fw-bold px-4 py-2 rounded-pill shadow-sm">
                Sign Up
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
