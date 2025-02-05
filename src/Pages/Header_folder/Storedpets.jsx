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
    }, 2000); // Simulating a delay (e.g., API call)
  };

  const handleBackClick = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/');
      setIsSubmitting(false);
    }, 1500); // Simulating a delay
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
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-5">🐾 Pet Information 🐾</h1>

      {selectedPet ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <img
            src={selectedPet.imageUrl}
            alt={selectedPet.name}
            className="w-full col-lg-7 col-12 h-64 object-cover rounded-md mb-4"
          />

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {selectedPet.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedPet.description}
            </p>
            <p>
              <strong>Age:</strong> {selectedPet.age} years
            </p>
            <p>
              <strong>Weight:</strong> {selectedPet.weight} kg
            </p>
            <p>
              <strong>Height:</strong> {selectedPet.height} cm
            </p>
            <p>
              <strong>Price:</strong> ${selectedPet.price}
            </p>
            <p>
              <strong>Owner:</strong> {selectedPet.ownerName} 📞 {selectedPet.ownerPhone}
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="btn btn-secondary fw-bold px-4 py-2 rounded-pill shadow-sm"
              type="button"
              disabled={isSubmitting}
              onClick={handleBackClick}
            >
              {isSubmitting ? <Spinner animation="border" size="sm" /> : '⬅️ Back'}
            </button>

            <button
              className="btn btn-success fw-bold px-4 py-2 rounded-pill shadow-sm"
              type="button"
              disabled={spinner}
              onClick={handleAdoptClick}
            >
              {spinner ? <Spinner animation="border" size="sm" /> : '🐾 Adopt Me! 🐶'}
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-center items-center h-40">
          <h4>
            Loading <Spinner animation="grow" variant="primary" />
          </h4>
        </div>
      )}

      <DogCard showDogCard={showDogCard} setShowDogCard={setShowDogCard} />
    </div>
  );
}
