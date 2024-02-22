import React, { useEffect, useState } from 'react';
import IMG from '../assests/mdi_paw.svg';
import IMG2 from '../assests/dog 1.png';
import './home.css';
import Card from 'react-bootstrap/Card';
import TestimonialCards from '../body/carousel';
import Footer from '../footer/footer';
import Storycard from '../../story-card/Storycard';
import Pets from './pet';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Import Firebase core module
import 'firebase/compat/firestore'; // Import Firestore
import { getDownloadURL, ref } from 'firebase/storage'; // Import Storage functions

export default function Home() {
  const [pets, setPets] = useState([]);

  // Function to add a new pet
  const addNewPet = (newPet) => {
    // Update the local state
    setPets((prevPets) => [newPet, ...prevPets]);

    // Update the local storage
    try {
      const updatedPets = JSON.stringify([newPet, ...pets]);
      localStorage.setItem('pets', updatedPets);
    } catch (error) {
      console.error('Error updating pets in local storage:', error);
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsCollection = await firebase.firestore().collection('pets').get();
        const petsData = await Promise.all(petsCollection.docs.map(async (doc) => {
          const pet = doc.data();
          // Get the image URL from Firebase Storage
          const imageRef = ref(firebase.storage(), `petImages/${doc.id}`);
          const imageUrl = await getDownloadURL(imageRef);
          // Add the image URL to the pet data
          return { ...pet, imageUrl };
        }));
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <>
      <div className='home-bodies'>
        <div className='large'>
          <p>Your Favorite Pet Store</p>
          <img src={IMG} className='icon' alt='Icon' />
        </div>
        <div className='contained'>
          <div className='con ms-3'>
            <h1 className='home-h'>Get your family a new member.</h1>
            <p>
              Open your doors and hearts to pets in need of a home, and they
              will be thankful to you for the rest of their lives.
            </p>
          </div>
          <div className='contianeds'>
            <img src={IMG2} alt='' />
            <div>
              <Card className='lll col-12'>
                <Card.Body className='home-texts'>
                  <Card.Title>800+</Card.Title>
                  <Card.Title>500+</Card.Title>
                  <Card.Title>450+</Card.Title>
                  <div className='home-textss'>
                    <Card.Text>Adopted last year</Card.Text>
                    <Card.Text>Rescued</Card.Text>
                    <Card.Text>Waiting for a home</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Display pets information fetched from Firestore */}
      <div className='container-fluid mt-5 w-100' style={{ color: 'black'}}>
        {pets.length > 0 && <h2 className='text-center'>Pets Available for Adoption</h2>}
        <div className='row d-flex justify-content-center'>
          {pets.map((pet, index) => (
            <div key={index} className='col-lg-4 col-10 mt-4'>
              <Link style={{ textDecoration: 'none' }} to={`/Storedpets/${encodeURIComponent(pet.name)}`}>
                <Card>
                  <Card.Body>
                    {/* Use the image URL for the src attribute */}
                    <Card.Img variant="top" src={pet.imageUrl} alt={pet.name} />
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>Description: {pet.description}</Card.Text>
                    <Card.Text>Age: {pet.age}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='container-fluid mt-5 w-100'>
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-8 col-12'>
            <Storycard/>
          </div>
        </div>
      </div>

      <Pets numberOfDogs={10} showFooter={false} addNewPet={addNewPet} />
      <Pets numberOfCats={100} showFooter={false} addNewPet={addNewPet} />
      <TestimonialCards />
      <Footer />
    </>
  );
}
