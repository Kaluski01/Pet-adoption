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

  useEffect(() => {
    // Add animation class on page load
    const elements = document.querySelectorAll('.animated-section');
    elements.forEach((el) => el.classList.add('fade-in'));
  }, []);

  return (
    <>
      <div className="home-bodies">
        <div className="large">
          <p>Your Favorite Pet Store</p>
          <img src={IMG} className="icon" alt="Icon" />
        </div>
        <div className="contained animated-section">
          <div className="con">
            <h1 className="home-h">Get your family a new member.</h1>
            <p className="subtext">
              Open your doors and hearts to pets in need of a home, and they will be thankful to you for the rest of
              their lives.
            </p>
          </div>
          <div className="contianeds">
            <img src={IMG2} alt="Dog" className="main-image" />
            <Card className="lll">
              <Card.Body className="home-texts">
                <Card.Title>
                  <h3>
                    Adopted last year: <CountUp start={0} end={800} duration={5} />+
                  </h3>
                </Card.Title>
                <Card.Title>
                  <h3>
                    Rescued: <CountUp start={0} end={500} duration={5} />+
                  </h3>
                </Card.Title>
                <Card.Title>
                  <h3>
                    Waiting for a home: <CountUp start={0} end={450} duration={5} />+
                  </h3>
                </Card.Title>
                {/* <div className="home-textss">
                  <Card.Text>
                    Adopted last year: <CountUp start={0} end={800} duration={2.5} />+
                  </Card.Text>
                  <Card.Text>
                    Rescued: <CountUp start={0} end={500} duration={2.5} />+
                  </Card.Text>
                  <Card.Text>
                    Waiting for a home: <CountUp start={0} end={450} duration={2.5} />+
                  </Card.Text>
                </div> */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          Loading <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!loading && error && (
        <div className="text-center mt-3">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="container" style={{ color: 'black' }}>
          {pets.length > 0 && <h2 className="text-center p-5">Pets Available for Adoption</h2>}
          <div className="row justify-content-center">
            {pets.map((pet, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-10 col-11 mt-5">
                <Link style={{ textDecoration: 'none' }} to={`/Storedpets/${encodeURIComponent(pet.name)}`}>
                  <Card className="pet-card">
                    <div className="">
                      <Card.Img variant="top" className="img-fluid" src={pet.imageUrl} alt={pet.name} />
                    </div>
                    <Card.Body>
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
      )}

      <TestimonialCards />
      <Footer />
    </>
  );
}
