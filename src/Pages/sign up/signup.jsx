import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const SignupPage = () => {

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // Check additional conditions if needed
      // For now, assume the user is signed in as a seller
      // setIsSellerSignedIn(true);
    }
  }, []);

  return (
    <div>
      <h1 className='main-sign' style={{ position: 'relative', top: '50px', marginTop: '20px', fontSize:'25px' }}>Let us know who you are !! </h1>
      <div className="center-container ms-5">
        <div className='role-selection d-flex flex-wrap gap-5'>
            <Card className="text-center">
              <Card.Body>
                <Link to="/seller">
                  <Button variant="primary" block>
                    Sign Up as Pet Seller
                  </Button>
                </Link>
              </Card.Body>
            </Card>

          <Card className="text-center">
            <Card.Body>
              <Link to="/adopter">
                <Button variant="primary" block>Sign Up as Pet Adopter</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
