import React, { useState, useEffect } from 'react';
import IMG from '../assests/paw-removebg-preview.png';
import './home.css';
import Signup from '../sign up/signup';
// import { Carousel } from 'react-bootstrap';
// import MyCarousel from '../body/carousel';
import TestimonialCards from '../body/carousel';
import Footer from '../footer/footer';

export default function Home() {
  const id = 'BIZiWPLqX';
  const Api = `https://api.thedogapi.com/v1/images/${id}`;
  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(Api)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImg(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [Api]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    // height: `${img?.height}px`, // Set the container height dynamically
    // padding:`${(img?.height / img?.width)}`, // Set the aspect ratio dynamically
    paddingTop:`10px`,
    paddingLeft: `5px`,
    paddingRight: `5px`,
  };

  const backgroundImage = {
    backgroundImage: `url(${img?.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    width: '100%',
    height: '600px',
  };

  return (
      <>
          <div className='home-body'>
          <div className=''>
      {error && <p>Error: {error}</p>}
      {img && (
        <div style={containerStyle}>
          <div className='large' style={backgroundImage}>
            <p>Your Favourite Pet Store</p>
            <img src={IMG} className='icon' alt='Icon' />
          </div>
        </div>
      )}
      </div>
    {/* <Signup/> */}
    <TestimonialCards/>
    <Footer/>
          </div>
      </>

  );
}
