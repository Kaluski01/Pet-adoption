import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DogCard from '../singleDog/adopt';
import firebase from 'firebase/compat/app'; // Import Firebase core module
import 'firebase/compat/firestore'; // Import Firestore
import { getDownloadURL, ref } from 'firebase/storage'; // Import Storage functions
import Spinner from 'react-bootstrap/Spinner'

export default function StoredPets() {
  const { name } = useParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDogCard, setShowDogCard] = useState(false);

  const handleAdoptClick = () => {
    setShowDogCard(true);
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petSnapshot = await firebase.firestore().collection('pets').where('name', '==', name).get();
        if (!petSnapshot.empty) {
          const petDoc = petSnapshot.docs[0];
          const petData = petDoc.data();
          // Get the image URL from Firebase Storage
          const imageUrl = await getDownloadURL(ref(firebase.storage(), `petImages/${petData.id}`));
          // Add the image URL to the pet data
          const petWithImageUrl = { ...petData, imageUrl };
          setSelectedPet(petWithImageUrl);
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
    <div className='container mt-5 p-5'>
      <div className="row">
        <div className="col-lg-12 col-sm-6">
          <h1 style={{ color: 'black' }}>Pet Information</h1>
          {selectedPet ? (
            <div>
                <div className=''>     <img src={selectedPet.imageUrl} alt={selectedPet.name} className="w-50 h-50" /></div>
              <p>Name: {selectedPet.name}</p>
              <p>Description: {selectedPet.description}</p>
              <p>Age: {selectedPet.age}</p>
              <p>Weight: {selectedPet.weight}</p>
              <p>Height: {selectedPet.height}</p>
              <p>Price: {selectedPet.price} </p>
              <p>Owner Number: {selectedPet.ownerPhone}</p>
              {/* Add more details as needed */}
            </div>
          ) : (
            <p>  <Spinner animation='border' variant='primary' /></p>
          )}
        </div>
        <div>
          <Link to='/'>
            <button className='adopt'>Back</button>
          </Link>
          <button className='adopt' onClick={handleAdoptClick}>
            Adopt me!
          </button>
        </div>
        <DogCard showDogCard={showDogCard} setShowDogCard={setShowDogCard} />
      </div>
    </div>
  );
}
