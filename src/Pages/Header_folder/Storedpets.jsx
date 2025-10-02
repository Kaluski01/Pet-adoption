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
    navigate(`/chat/${selectedPet.ownerId}`);
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
      <h1 className="display-5 fw-bold text-center text-dark mt-5">🐾 Meet Your New Friend 🐾</h1>

      {selectedPet ? (
        <div className="card shadow-lg border-0 rounded-4 mx-auto p-4" style={{ maxWidth: '700px' }}>
          <img
            src={selectedPet.imageUrl}
            alt={selectedPet.name}
            className="card-img-top rounded-4 object-fit-cover"
            style={{ height: '350px', objectFit: 'cover' }}
          />

          <div className="card-body text-dark">
            <h3 className="fw-bold mb-3">{selectedPet.name}</h3>

            <ul className="list-unstyled text-muted">
              <p>
                <strong>Description:</strong> {selectedPet.description}
              </p>
              <p>
                <strong>Age:</strong> {selectedPet.age}
              </p>
              <p>
                <strong>Weight:</strong> {selectedPet.weight}
              </p>
              <p>
                <strong>Height:</strong> {selectedPet.height}
              </p>
              <p>
                <strong>Price:</strong> <span className="fw-bold text-success">${selectedPet.price}</span>
              </p>
              <p>
                <strong>Owner:</strong> {selectedPet.ownerName} 📞 {selectedPet.ownerPhone}
              </p>
            </ul>
          </div>

          {/* Buttons */}
          <div className="d-flex flex-wrap gap-3 mt-4">
            <button
              className="btn btn-outline-secondary fw-bold px-4 py-2 rounded-pill"
              type="button"
              disabled={isSubmitting}
              onClick={handleBackClick}
            >
              {isSubmitting ? <Spinner animation="border" size="sm" /> : '⬅️ Back'}
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
