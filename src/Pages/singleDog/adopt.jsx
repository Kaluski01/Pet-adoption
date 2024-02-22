import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function DogCard({ showDogCard, setShowDogCard }) {
  const [formCompleted, setFormCompleted] = useState(false);
  const [showSignUpMessage, setShowSignUpMessage] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const closeModal = () => {
    setShowDogCard(false);
  };

  const handleAdoptionSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Handle form submission
      // For demonstration purposes, skipping actual form submission logic

      // Simulate submission success
      setWelcomeMessage(`Thank you for your submission, ${e.target.elements.name.value}. We will review your application and get back to you shortly.`);
      setFormCompleted(true);
    }
  };

  const redirectToSignUp = () => {
    // Redirect to sign-up page
    // For demonstration purposes, skipping actual redirection logic
    setShowSignUpMessage(false); // Close the message
  };

  return (
    <Modal show={showDogCard} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Adoption Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formCompleted ? (
          <p>{welcomeMessage}</p>
        ) : (
          <Form onSubmit={handleAdoptionSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formAbout">
              <Form.Label>Tell us about yourself</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Tell us about yourself" required />
            </Form.Group>

            <Form.Group controlId="formChildren">
              <Form.Label>Do you have children?</Form.Label>
              <Form.Control type="text" placeholder="Yes/No" required />
            </Form.Group>

            <Form.Group controlId="formChildrenNumber">
              <Form.Label>If yes, how many?</Form.Label>
              <Form.Control as="select" required>
                <option>Choose...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFencedCompound">
              <Form.Label>Do you have a fenced compound?</Form.Label>
              <Form.Control type="text" placeholder="Yes/No" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}

        {showSignUpMessage && (
          <div className="mt-3">
            <p>
              Your name or email does not match our records.
              <br />
              Please check for correct spelling or{' '}
              <Button className="mt-2" variant="primary" onClick={redirectToSignUp}>
                create an account
              </Button>{' '}
              to access pets.
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
