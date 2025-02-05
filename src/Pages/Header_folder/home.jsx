import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import './home.css';
import Card from 'react-bootstrap/Card';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import IMG from '../assests/mdi_paw.svg';
import IMG2 from '../assests/dog 1.png';
import TestimonialCards from '../body/carousel';
import Footer from '../footer/footer';

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsCollection = await firebase.firestore().collection('pets').get();
        const petsData = await Promise.all(
          petsCollection.docs.map(async (doc) => {
            const pet = doc.data();
            const imageUrl = await getDownloadURL(ref(firebase.storage(), `petImages/${pet.id}`));
            return { ...pet, imageUrl };
          })
        );
        setPets(petsData);
        setLoading(false);
      } catch (error) {
        setError('Please check your internet connection.');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setError('Please check your internet connection.');
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      <div className="home-hero text-center py-5">
        <h1 className="display-4 text-dark fw-bold mt-5">Your Favorite Pet Store</h1>
        <img src={IMG} alt="Pet Icon" className="img-fluid mt-3" style={{ height: '50px' }} />
        <p className="lead mt-3">Get your family a new member today! 🐾</p>
      </div>
      <div className="container my-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 text-center">
            <h2 className="fw-bold">Open your heart to a pet in need ❤️</h2>
            <p>
              Adopt a pet and make a friend for life. Every wagging tail and gentle purr is a thank you from a life
              you’ve changed.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img src={IMG2} alt="Dog" className="img-fluid rounded shadow" style={{ maxHeight: '300px' }} />
          </div>
        </div>

        <div className="stats-card bg-light rounded p-4 my-5 text-center shadow">
          <h3 className="mb-3 fw-bold">🐶 Our Impact 🐱</h3>
          <div className="d-flex justify-content-around flex-wrap">
            <div>
              <h4>Adopted Last Year</h4>
              <CountUp start={0} end={800} duration={4} className="fs-3 text-success fw-bold" />+
            </div>
            <div>
              <h4>Rescued Pets</h4>
              <CountUp start={0} end={500} duration={4} className="fs-3 text-warning fw-bold" />+
            </div>
            <div>
              <h4>Waiting for Homes</h4>
              <CountUp start={0} end={450} duration={4} className="fs-3 text-danger fw-bold" />+
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading pets...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center my-4 text-danger">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="container">
          {pets.length > 0 && <h2 className="text-center fw-bold my-4">🐾 Pets Available for Adoption 🐾</h2>}
          <div className="row justify-content-center">
            {pets.map((pet, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-10 col-11 my-3">
                <Link to={`/Storedpets/${encodeURIComponent(pet.name)}`} className="text-decoration-none">
                  <Card className="pet-card shadow-sm border-0 hover-zoom">
                    <Card.Img variant="top" src={pet.imageUrl} className="pet-img img-fluid" />
                    <Card.Body className="text-center">
                      <Card.Title className="fw-bold">{pet.name}</Card.Title>
                      <Card.Text>{pet.description}</Card.Text>
                      <p className="text-muted">Age: {pet.age} years</p>
                      <button className="btn btn-primary rounded-pill px-4">View Details</button>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <TestimonialCards />
      <Footer />
    </>
  );
}
