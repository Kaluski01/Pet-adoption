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
    if (!loading) return;
    const timeout = setTimeout(() => {
      setError('Loading is taking too long. Please check your internet connection.');
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      {/* ✅ Hero Section with warm gradient */}
      <div
        className="home-hero d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          background: 'linear-gradient(135deg, #ffe5b4 0%, #fff5e6 100%)', // warm peach → cream
          minHeight: '85vh',
          padding: '3rem 1rem',
        }}
      >
        <h1 className="display-3 fw-bold mb-3 text-dark">
          Find Your <span style={{ color: '#ff7f50' }}>Furry Friend</span> 🐾
        </h1>
        <p className="lead text-secondary mb-4">Adopt a loving companion today and give them a forever home ❤️</p>
        <img src={IMG} alt="Pet Icon" style={{ height: '60px' }} className="mb-4" />
        <Link
          to="/dog"
          className="btn btn-lg rounded-pill shadow px-4 fw-bold"
          style={{ backgroundColor: '#ffb347', color: '#fff' }}
        >
          Browse Pets
        </Link>
      </div>

      {/* ✅ About Section */}
      <div className="container my-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h2 className="fw-bold mb-3" style={{ color: '#e67300' }}>
              Open Your Heart ❤️
            </h2>
            <p className="text-muted">
              Every wagging tail and gentle purr is a thank-you from a life you’ve changed. Adopt a pet and make a
              friend for life.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img src={IMG2} alt="Dog" className="img-fluid" style={{ maxHeight: '320px' }} />
          </div>
        </div>

        {/* ✅ Stats Section */}
        <div className="rounded-4 p-5 my-5 w-100 text-center shadow" style={{ backgroundColor: '#fffaf0' }}>
          <h3 className="fw-bold mb-4 d-flex justify-content-around text-dark">🐶 Our Impact 🐱</h3>
          <div className="row">
            <div className="col-md-4 mb-4">
              <h4 className="text-muted">Adopted Last Year</h4>
              <CountUp end={800} duration={3} className="fs-2 fw-bold" style={{ color: '#ff7f50' }} />+
            </div>
            <div className="col-md-4 mb-4">
              <h4 className="text-muted">Rescued Pets</h4>
              <CountUp end={500} duration={3} className="fs-2 fw-bold" style={{ color: '#e67300' }} />+
            </div>
            <div className="col-md-4 mb-4">
              <h4 className="text-muted">Waiting for Homes</h4>
              <CountUp end={450} duration={3} className="fs-2 fw-bold" style={{ color: '#cc5500' }} />+
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Pets Section */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" style={{ color: '#e67300' }} />
          <p className="mt-2">Loading pets...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center my-5 text-danger">
          <h4>{error}</h4>
        </div>
      )}

      {!loading && !error && (
        <div className="container my-5">
          {pets.length > 0 && <h2 className="text-center fw-bold mb-5 text-dark">🐾 Pets Available for Adoption 🐾</h2>}
          <div className="row">
            {pets.map((pet, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-10 mx-auto mb-4">
                <Link to={`/Storedpets/${encodeURIComponent(pet.name)}`} className="text-decoration-none">
                  <Card className="pet-card border-0 shadow-lg h-100 hover-zoom" style={{ backgroundColor: '#fff5e6' }}>
                    <Card.Img
                      variant="top"
                      src={pet.imageUrl}
                      className="pet-img img-fluid rounded-top"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <Card.Body className="text-center">
                      <Card.Title className="fw-bold text-dark">{pet.name}</Card.Title>
                      <Card.Text className="text-muted">{pet.description}</Card.Text>
                      <p className="text-secondary">Age: {pet.age} years</p>
                      <button
                        className="btn rounded-pill px-4"
                        style={{ border: '2px solid #ff7f50', color: '#ff7f50', backgroundColor: 'white' }}
                      >
                        View Details
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Testimonials & Footer */}
      <TestimonialCards />
      <Footer />
    </>
  );
}
