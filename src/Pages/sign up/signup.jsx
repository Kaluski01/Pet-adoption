import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './signup.css'; // Import the custom styles

const SignupPage = () => {
  useEffect(() => {
    // Check if user is already signed in
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // Implement logic for handling signed-in users
      // For example:
      // setIsSellerSignedIn(true);
    }
  }, []);

  return (
    <div className="signup-container">
      <h1 className="main-sign">Let us know who you are !!</h1>
      <div className="card-container">
        <div className="signup-card">
          <Card className="text-center custom-card">
            <Card.Body>
              <Link to="/seller">
                <Button variant="primary" className="signup-btn">
                  Sign Up as Pet Seller
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="signup-card">
          <Card className="text-center custom-card">
            <Card.Body>
              <Link to="/adopter">
                <Button variant="primary" className="signup-btn">
                  Sign Up as Pet Adopter
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
