import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
        setWelcomeMessage(`Thank you for choosing this website, ${matchingAdopter.name}!`);

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
          <form onSubmit={handleAdoptionSubmit} noValidate>
            <>
              <label>
                Your Name:
                <input type="text" name="name" required />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <br />
              <label className='d-flex flex-column'>
                Tell us about yourself:
                <textarea name="textarea" required></textarea>
              </label>
              <br />
              <label>
                Do you have children?
                <input type="text" name="childrenStatus" required />
              </label>
              <br />
              <label>
                If yes, how many?
                <select name="number" required>
                  <option value="Pick a number" className='w-50'>Choose</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <br />
              <label>
                Do you have a fenced compound?
                <input type="text" name="text" required />
              </label>
              <br />
              <Button className='mt-2' type="submit">Submit</Button>
            </>
          </form>
        )}

        {/* Message to guide user to check for correct spelling or create an account */}
        {showSignUpMessage && (
          <div className="mt-3">
            <p>
              Your name or email does not match our records.
              <br />
              Please check for correct spelling or  
              <br />
              <Button className='mt-2' variant="primary" onClick={redirectToSignUp}>
                create an account
              </Button>
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
