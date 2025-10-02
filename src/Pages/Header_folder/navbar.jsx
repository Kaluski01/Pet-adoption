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
    <Navbar
      expanded={expanded}
      expand="lg"
      style={{ backgroundColor: '#FFF5E1' }} // warm cream
      fixed="top"
      className="shadow-lg py-3"
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={handleSelect}
          className="d-flex align-items-center gap-2"
          style={{ color: '#A0522D', fontWeight: 'bold' }} // warm brown text
        >
          <FaPaw size={28} color="#FF7F50" /> {/* warm coral paw */}
          <span className="fw-bold fs-4">PET FINDER</span>
        </Navbar.Brand>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav" className="mt-3 mt-lg-0">
          {/* Links */}
          <Nav className="mx-auto gap-4 text-uppercase fw-semibold" onSelect={handleSelect}>
            <Nav.Link as={Link} to="/" onClick={handleSelect} style={{ color: '#8B5E3C' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleSelect} style={{ color: '#8B5E3C' }}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/dogs" onClick={handleSelect} style={{ color: '#8B5E3C' }}>
              Pets
            </Nav.Link>
            <Nav.Link as={Link} to="/own" onClick={handleSelect} style={{ color: '#8B5E3C' }}>
              Paw-ssentials
            </Nav.Link>
          </Nav>

          {/* Buttons */}
          <Nav onSelect={handleSelect} className="d-flex align-items-center gap-3 position-relative">
            <Button
              onClick={toggleLoginOptions}
              style={{
                backgroundColor: '#FF7F50',
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              Log In
            </Button>

            {showLoginOptions && (
              <div
                className="position-absolute p-2 rounded shadow"
                style={{ top: '100%', right: 0, zIndex: 1000, backgroundColor: '#FFF5E1' }}
              >
                <Button
                  as={Link}
                  to="/Login"
                  onClick={handleSelect}
                  style={{ backgroundColor: '#FFD700', border: 'none', marginBottom: '0.5rem' }}
                  className="w-100"
                >
                  As Seller
                </Button>
                <Button
                  as={Link}
                  to="/Adopterlogin"
                  onClick={handleSelect}
                  style={{ backgroundColor: '#FFD700', border: 'none' }}
                  className="w-100"
                >
                  As Adopter
                </Button>
              </div>
            )}

            <Nav.Link as={Link} to="/signup/signup" onClick={handleSelect}>
              <Button
                style={{
                  backgroundColor: '#FFD700',
                  border: 'none',
                  fontWeight: 'bold',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '50px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}
              >
                Sign Up
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
