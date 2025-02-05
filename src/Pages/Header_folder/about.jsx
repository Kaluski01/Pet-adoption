import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import './about.css'; // Ensure you link the CSS file

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on page load
  }, []);

  return (
    <>
      <div className="about-container">
        <div className="content-wrapper text-center text-white p-8 mt-5">
          <h1 className="text-4xl font-bold mb-4">Welcome to PET FINDER</h1>
          <p className="text-lg mb-6">
            Where we connect pet enthusiasts with their future companions. Founded in 2023, PET FINDER is a trusted
            platform that brings together reliable sellers and caring adopters. Our mission is to facilitate responsible
            pet ownership and provide a secure space for finding your perfect furry friend.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
          <div className="mb-4">
            <h4 className="text-lg font-bold">Paw-ssentials:</h4>
            <p>
              Our educational platform dedicated to teaching proper pet ownership. Explore a wealth of resources to
              ensure a happy and healthy life for your pets.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-bold">Home Page:</h4>
            <p>
              Discover a diverse selection of pets added by trustworthy sellers. Our home page showcases pets from
              reputable sources, making it easy for you to find your ideal companion.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Sign Up Page:</h4>
            <p>
              Choose your path! Whether you're looking to become a responsible seller or a loving adopter, our sign-up
              page offers two distinct slots for your journey. Join PET FINDER today and embark on a delightful
              adventure with pets.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
