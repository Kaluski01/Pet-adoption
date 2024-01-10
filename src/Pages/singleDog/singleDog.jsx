import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './singledog.css';
import DogCard from './adopt';
import Footer from '../footer/footer';
import { Link} from 'react-router-dom';
export default function SingleDog() {
  const [dog, setDog] = useState(null);
  const { name } = useParams();
  const [showDogCard, setShowDogCard] = useState(false);

  const handleAdoptClick = () => {
    setShowDogCard(true);
  };

  useEffect(() => {
    const fetchDogData = () => {
      fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=Aaba64b2-6be8-46b0-a7ce-92034a670f0a`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((breeds) => {
          // Check if breeds is not an empty array
          if (Array.isArray(breeds) && breeds.length > 0) {
            const breedId = breeds[0].id;
            return fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&api_key=Aaba64b2-6be8-46b0-a7ce-92034a670f0a`);
          } else {
            throw new Error('Breed not found');
          }
        })
        .then((response) => response.json())
        .then((dogData) => {
          // Check if dogData is not an empty array
          if (Array.isArray(dogData) && dogData.length > 0) {
            setDog(dogData[0]); // Set the first dog in the array
          } else {
            setDog(null); // Set to null if no dog is found
          }
        })
        .catch((error) => {
          console.error('Error fetching dog data:', error);
        });
    };

    fetchDogData();
  }, [name]);

  return (
      <>
         <div className='container'>
        <div className="row">
          <div className="col-lg-12 mb-5">
            {dog ? (
              <div className='mt-3 p-5 mb-5 w-100 d-flex flex-wrap'>
                <img src={dog.url} alt={dog.id} className="img-fluid w-75 h-50" />
                <div className='w-100'>
                <h2>{dog.breeds?.[0]?.name}</h2>
                {/* {dog.description && <p>{dog.description}</p>} */}
                <ul className=''>
                  <li className='dog-list'>Bred For: {dog.breeds?.[0]?.bred_for}</li>
                  <li className='dog-list'>Weight: {dog?.breeds?.[0]?.weight?.metric}</li>
                  <li className='dog-list'>Height: {dog?.breeds?.[0]?.height?.metric}</li>
                  <li className='dog-list'>Lifespan: {dog?.breeds?.[0]?.life_span}</li>
                  <li className='dog-list'>Temparament: {dog?.breeds?.[0]?.temperament} </li>
                  <li className='dog-list'>BreedGrroup: {dog?.breeds?.[0]?.breed_group}</li>
                </ul>
                <Link to='/Dog'><button className='adopt'>Back</button></Link>
                <button className='adopt' onClick={handleAdoptClick}>Adopt me!</button>
                <DogCard showDogCard={showDogCard} setShowDogCard={setShowDogCard} />
              </div>
          </div>
      ) : (
        <h1>Loading</h1>
      )}
          </div>
        </div>
    </div>
    <Footer/>
      </>

  )
}
