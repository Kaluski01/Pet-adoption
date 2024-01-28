import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DogCard from '../singleDog/adopt';
export default function StoredPets() {
  const { name } = useParams();
  const [storedPets, setStoredPets] = useState([]);
  const [showDogCard, setShowDogCard] = useState(false);

  const handleAdoptClick = () => {
    setShowDogCard(true);
  };

  useEffect(() => {
    // Retrieve stored pets from local storage
    const storedPetsString = localStorage.getItem('pets');
    const parsedStoredPets = storedPetsString ? JSON.parse(storedPetsString) : [];
    setStoredPets(parsedStoredPets);
  }, []);

  // Find the pet with the matching name
  const selectedPet = storedPets.find((pet) => pet.name === name);

  return (
    <div className='container mt-5 p-5'>
      <div className="row">
        <div className="col-lg-12 col-sm-6">
          <h1 style={{ color: 'black' }}>Pet Information</h1>
          {selectedPet ? (
            <div>
              <img src={selectedPet.image} alt={selectedPet.name} className="img-fluid w-50 h-50" />
              <p>Name: {selectedPet.name}</p>
              <p>Description: {selectedPet.description}</p>
              <p>Age: {selectedPet.Age}</p>
              <p>Weight: {selectedPet.weight}</p>
              <p>Height: {selectedPet.height}</p>
              <p>Price: {selectedPet.price} </p>
              <p>Owner Number: {selectedPet.ownerphone}</p>
              {/* Add more details as needed */}
            </div>
          ) : (
            <p>Pet not found.</p>
          )}
        </div>
        <button className='adopt' onClick={handleAdoptClick}>
                    Adopt me!
        </button>
        <DogCard showDogCard={showDogCard} setShowDogCard={setShowDogCard} />
      </div>
    </div>
  );
  
}
