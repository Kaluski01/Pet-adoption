import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DogCard({ showDogCard, setShowDogCard }) {
  const [formCompleted, setFormCompleted] = useState(false);

  const closeModal = () => {
    setShowDogCard(false);
  };

  const handleAdoptionSubmit = (e) => {
    e.preventDefault();

    // Assuming you have more form fields, add additional validation logic here
    const isFormValid = e.target.checkValidity();
    
    if (isFormValid) {
      // Handle adoption submission logic here
      setFormCompleted(true);
      // Additional logic if needed
    }
  };

  return (
    <Modal show={showDogCard} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Adoption Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formCompleted ? (
          <p>Please check your email for a token</p>
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
                <input type="number" name="number" required />
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
