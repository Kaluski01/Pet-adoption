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
  
    // Assuming you have more form fields, add additional validation logic here
    const isFormValid = e.target.checkValidity();
  
    if (isFormValid) {
      // Check if the adopter has an account
      const adopterInfo = localStorage.getItem('users');
  
      if (!adopterInfo) {
        // Show a message to guide the user to create an account
        setShowSignUpMessage(true);
        return;
      }
  
      // Parse the adopterInfo from JSON
      const adopterData = JSON.parse(adopterInfo);
  
      // Retrieve the input values from the form
      const adopterName = e.target.elements.name.value;
      const adopterEmail = e.target.elements.email.value;
  
      // Check if the entered name and email match any adopter's data
      const matchingAdopter = adopterData.find(
        (adopter) =>
          adopter.name.toLowerCase() === adopterName.trim().toLowerCase() &&
          adopter.email.toLowerCase() === adopterEmail.trim().toLowerCase()
      );
  
      if (matchingAdopter) {
        // Set welcome message
        setWelcomeMessage(`Thank you for choosing our website. We appreciate your interest in adopting a pet. Rest assured, we'll review your application promptly and get back to you shortly. In the meantime, feel free to explore our pet listings and keep in touch with the seller using the contact information provided on the pet details page. We look forward to connecting with you further.  ${matchingAdopter.name}`);
  
  
        // Handle adoption submission logic here
        setFormCompleted(true);
  
        // Additional logic if needed
      } else {
        // Show a message to guide the user to check for correct spelling or create an account
        setShowSignUpMessage(true);
      }
    }
  };
  
  const redirectToSignUp = () => {
    // Redirect to the sign-up page with a custom message as a query parameter
    window.location.href = '/signup/signup?message=Please create an account to access pets';
  };

  return (
    <Modal show={showDogCard} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Adoption Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formCompleted ? (
          <div>
            {/* Display welcome message */}
            <p>{welcomeMessage}</p>
          </div>
        ) : (
          <Form onSubmit={handleAdoptionSubmit} noValidate>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>

            <Form.Group controlId="formAbout">
              <Form.Label>Tell us about yourself</Form.Label>
              <Form.Control as="textarea" name="textarea" rows={3} placeholder="Tell us about yourself" required />
            </Form.Group>

            <Form.Group controlId="formChildren">
              <Form.Label>Do you have children?</Form.Label>
              <Form.Control type="text" name="childrenStatus" required />
            </Form.Group>

            <Form.Group controlId="formChildrenNumber">
              <Form.Label>If yes, how many?</Form.Label>
              <Form.Control as="select" name="number" required>
                <option value="">Choose...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFencedCompound">
              <Form.Label>Do you have a fenced compound?</Form.Label>
              <Form.Control type="text" name="text" required />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        )}

        {/* Message to guide user to check for correct spelling or create an account */}
        {showSignUpMessage && (
          <div className="mt-3">
            <p>
              Your name or email does not match our records.
              <br />
              Please check for correct spelling or{' '}
              <Button variant="primary" onClick={redirectToSignUp}>
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
