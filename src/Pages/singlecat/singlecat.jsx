import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './singlecat.css';
import { Link } from 'react-router-dom';
import DogCard from '../singleDog/adopt';
import Footer from '../footer/footer';


export default function SingleCat() {
  const [cat, setCat] = useState(null);
  const { id } = useParams();

  const [showDogCard, setShowDogCard] = useState(false);

  const handleAdoptClick = () => {
    setShowDogCard(true);
  };

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        // Fetch cat information by cat ID
        const catResponse = await fetch(`https://api.thecatapi.com/v1/images/${id}?api_key=live_krqgL373oBzRUWqxu8OEApuXvFP4V283MEvYC8kTqMq4cHr3MsNs5y1QBjqK8K0B`);
        if (!catResponse.ok) {
          throw new Error(`Failed to fetch cat information. Status: ${catResponse.status}`);
        }
        const catData = await catResponse.json();

        if (catData.length === 0) {
          throw new Error('Cat not found');
        }

        setCat(catData); // Set the cat data
      } catch (error) {
        console.error('Error fetching cat data:', error);
        setCat(null);
      }
    };

    fetchCatData();
  }, [id]);

  // Log cat data to the console for debugging
  useEffect(() => {
    console.log('Cat Data:', cat);
  }, [cat]);

  return (
      <>
      <div className='container mx-auto'>
      <div className="row">
        <div className="col-lg-12">
          <h1 className='mt-5' style={{color:'black'}}>{cat?.breeds?.[0]?.name}</h1>
          {cat ? (
            <div className='cat-details py-5  w-100 d-flex flex-wrap'>
              <img src={cat.url} alt={cat.id} className=" w-75" style={{height:'350px'}} />
              <div className=''>
              {cat.description && <p>{cat.description}</p>}
              <ul className='cat-li'>
                <li className='cat-li'>Weight: {cat?.breeds?.[0]?.weight?.metric} Kg</li>
                <li className='cat-li'>Height: {cat?.breeds?.[0]?.height?.metric || 'not available'}</li>
                <li className='cat-li'>Lifespan: {cat?.breeds?.[0]?.life_span} Years</li>
                <li className='cat-li'>Temparament: {cat?.breeds?.[0]?.temperament} </li>
                <li className='cat-li'>Country Code: {cat?.country_code}</li>
                <li className='cat-li'>Description: {cat?.description}</li>
                {/* <li className='cat-li'>Country code: {cat?.country_code}</li> */}
                {/* <li className='cat-li'>Description: {cat?.description}</li> */}
              </ul>
              <Link to='/Cat'><button className='adopt1'>Back</button></Link>
                <button className='adopt1' onClick={handleAdoptClick}>Adopt me!</button>
                <DogCard showDogCard={showDogCard} setShowDogCard={setShowDogCard} />
              </div>
            </div>
          ) : (
            <p>No information available for this cat.</p>
          )}
        </div>
      </div>
    </div>
    <Footer/>
      </>
  );
}
