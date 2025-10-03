import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DogCard from '../singleDog/adopt';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import Spinner from 'react-bootstrap/Spinner';

export default function StoredPets() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDogCard, setShowDogCard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleAdoptClick = () => {
    setSpinner(true);
    setTimeout(() => {
      setShowDogCard(true);
      setSpinner(false);
    }, 2000);
  };

  const handleBackClick = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChatClick = () => {
    if (selectedPet?.ownerId) {
      navigate(`/chat/${selectedPet.ownerId}`);
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petSnapshot = await firebase.firestore().collection('pets').where('name', '==', name).get();
        if (!petSnapshot.empty) {
          const petDoc = petSnapshot.docs[0];
          const petData = petDoc.data();
          const imageUrl = await getDownloadURL(ref(firebase.storage(), `petImages/${petData.id}`));
          setSelectedPet({ ...petData, imageUrl });
        } else {
          setSelectedPet(null);
        }
      } catch (error) {
        console.error('Error fetching pet:', error);
        setSelectedPet(null);
      }
    };

    fetchPet();
  }, [name]);

  return (
    <div className="container py-5">
      {/* Header with spacing below navbar */}
      <h1 className="display-5 fw-bold text-center text-dark mb-4 mt-5">🐾 Meet Your New Friend 🐾</h1>

      {selectedPet ? (
        <div className="card shadow-lg border-0 rounded-4 mx-auto p-4" style={{ maxWidth: '700px' }}>
          <img
            src={selectedPet.imageUrl}
            alt={selectedPet.name}
            className="card-img-top rounded-4"
            style={{ height: '350px', objectFit: 'cover' }}
          />

          <div className="card-body text-dark">
            <h3 className="fw-bold mb-3">{selectedPet.name}</h3>

            <ul className="list-unstyled text-dark fs-6">
              {selectedPet.description && (
                <li>
                  <strong>Description:</strong> {selectedPet.description}
                </li>
              )}
              {selectedPet.age && (
                <li>
                  <strong>Age:</strong> {selectedPet.age} years
                </li>
              )}
              {selectedPet.weight && (
                <li>
                  <strong>Weight:</strong> {selectedPet.weight} kg
                </li>
              )}
              {selectedPet.height && (
                <li>
                  <strong>Height:</strong> {selectedPet.height} cm
                </li>
              )}
              {selectedPet.price && (
                <li>
                  <strong>Price:</strong> <span className="fw-bold text-success">${selectedPet.price}</span>
                </li>
              )}
              {(selectedPet.ownerName || selectedPet.ownerPhone) && (
                <li>
                  <strong>Owner:</strong> {selectedPet.ownerName || 'N/A'} 📞 {selectedPet.ownerPhone || 'N/A'}
                </li>
              )}
            </ul>
          </div>

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-between gap-2 mt-4">
            <button
              className="btn btn-outline-secondary fw-bold px-4 py-2 rounded-pill"
              type="button"
              disabled={isSubmitting}
              onClick={handleBackClick}
            >
              {isSubmitting ? <Spinner animation="border" size="sm" /> : '⬅️ Back'}
            </button>

            <button
              className="btn btn-primary fw-bold px-4 py-2 rounded-pill"
              type="button"
              onClick={handleChatClick}
              disabled={!selectedPet?.ownerId}
            >
              💬 Chat with Seller
            </button>

            <button
              className="btn btn-success fw-bold px-4 py-2 rounded-pill"
              type="button"
              disabled={spinner}
              onClick={handleAdoptClick}
            >
              {spinner ? <Spinner animation="border" size="sm" /> : '🐶 Adopt Me'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 fw-semibold">Loading pet information...</p>
        </div>
      )}

      <DogCard showDogCard={showDogCard} setShowDogCard={setShowDogCard} />
    </div>
  );
}
