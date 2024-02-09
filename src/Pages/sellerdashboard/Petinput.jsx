import React, { useState, useEffect } from 'react';

const PetCard = () => {
  const [addedPets, setAddedPets] = useState([]);

  useEffect(() => {
    // Fetch the user's added pets from local storage or any other data source
    const storedPets = JSON.parse(localStorage.getItem('pets'));
  
    // Fetch the current user from local storage
    const currentUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedPets && currentUser) {
      // Filter the added pets by the current user's first name
      const addedPetsByUser = storedPets.filter(pet => pet.ownername === currentUser.firstname);
  
      // Set the added pets array
      setAddedPets(addedPetsByUser);
    }
  }, []);
  
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Pets Added</h5>
        <p className="card-text">{addedPets.length}</p>
        <ul>
          {addedPets.map((pet, index) => (
            <li key={index}>{pet.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PetCard;
