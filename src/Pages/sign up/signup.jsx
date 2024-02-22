import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

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
    <div style={{ paddingTop: '150px', marginTop: '20px' }}>
      <h1 className='main-sign' style={{ fontSize: '25px' }}>Let us know who you are !!</h1>
      <div className="container">
        <div className='row'>
          <div className='col-md-6'>
            <Card className="text-center">
              <Card.Body>
                <Link to="/seller">
                  <Button variant="primary" block>
                    Sign Up as Pet Seller
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-6'>
            <Card className="text-center">
              <Card.Body>
                <Link to="/adopter">
                  <Button variant="primary" block>
                    Sign Up as Pet Adopter
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
