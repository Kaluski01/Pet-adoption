import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './signup.css';

const SignupPage = () => {
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // Add logic if needed for already signed-in users
    }
  }, []);

  return (
    <div className="signup-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <h1 className="text-center mb-5 main-sign">🐾 Let us know who you are !!</h1>
        <Row className="justify-content-center g-4">
          <Col md={5} sm={12}>
            <Card className="custom-card shadow-lg border-0">
              <Card.Body className="d-flex flex-column align-items-center">
                <h4 className="mb-3 fw-bold text-dark">Pet Seller</h4>
                <Link to="/seller">
                  <Button variant="warning" className="signup-btn px-4 py-2">
                    Sign Up as Seller
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} sm={12}>
            <Card className="custom-card shadow-lg border-0">
              <Card.Body className="d-flex flex-column align-items-center">
                <h4 className="mb-3 fw-bold text-dark">Pet Adopter</h4>
                <Link to="/adopter">
                  <Button variant="danger" className="signup-btn px-4 py-2">
                    Sign Up as Adopter
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
