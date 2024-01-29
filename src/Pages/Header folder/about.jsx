import React from 'react';
// import IMG from '../assets/catss.png';
import './about.css';
import Footer from '../footer/footer';

export default function About() {
  return (
    <>
      <div className="container w-100">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className='first text-center'>
              <div className='first-texts'>
                <h1 className='firsts-h1'>Welcome to PET FINDER</h1>
                <p className='firsts-p'>Where we connect pet enthusiasts with their future companions. Founded in 2023, 
                PET FINDER is a trusted platform that brings together reliable sellers and caring adopters. Our mission is to facilitate responsible pet ownership and provide a secure space for finding your perfect furry friend.</p>
              </div>
            </div>
            <div style={{ color: 'black' }}>
              <h2>Key Features:</h2>
              <h4>Paw-ssentials:</h4>
              <p>Our educational platform dedicated to teaching proper pet ownership. Explore a wealth of resources to ensure a happy and healthy life for your pets.</p>
              <h4>Home Page: </h4>
              <p>Discover a diverse selection of pets added by trustworthy sellers. Our home page showcases pets from reputable sources, making it easy for you to find your ideal companion.</p>
              <h4>Sign Up Page:</h4>
              <p>Choose your path! Whether you're looking to become a responsible seller or a loving adopter, our sign-up page offers two distinct slots for your journey. Join PET FINDER today and embark on a delightful adventure with pets.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
