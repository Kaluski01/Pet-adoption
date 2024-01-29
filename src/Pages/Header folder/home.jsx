import React, { useEffect, useState } from 'react';
import IMG from '../assests/mdi_paw.svg';
import IMG2 from '../assests/dog 1.png';
import './home.css';
import Card from 'react-bootstrap/Card';
import TestimonialCards from '../body/carousel';
import Footer from '../footer/footer';
import Pets from './pet';
// import SellerDash from '../seller dashboard/sellerdash'; 
import { Link } from 'react-router-dom';

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    try {
      const storedPets = localStorage.getItem('pets');
      if (storedPets) {
        setPets(JSON.parse(storedPets));
      }
    } catch (error) {
      console.error('Error loading pets from local storage:', error);
    }
  }, []);

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
              <Card className='lll'>
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

      {/* Display pets information from local storage */}
      <div className='container-fluid mt-5 w-100' style={{ color: 'black' }}>
        {pets.length > 0 && <h2 className='text-center'>Recently Added Pets</h2>}
        <div className='row d-flex justify-content-center'>
          {pets.map((pet, index) => (
            <div key={index} className='col-lg-4 col-sm-12'>
              <Link style={{ textDecoration: 'none' }} to={`/Storedpets/${encodeURIComponent(pet.name)}`}>
                <Card>
                  <Card.Body>
                    <Card.Img variant="top" src={pet.image} alt={pet.name} />
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>Description: {pet.description}</Card.Text>
                    <Card.Text>Age: {pet.Age}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <SellerDash addNewPet={addNewPet} /> */}
      <Pets numberOfDogs={10} showFooter={false} addNewPet={addNewPet} />
      <Pets numberOfCats={100} showFooter={false} addNewPet={addNewPet} />
      <TestimonialCards />
      <Footer />
    </>
  );
}
