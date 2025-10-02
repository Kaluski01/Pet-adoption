import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import Footer from '../footer/footer';

export default function PetsPage({ showFooter = true }) {
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
      <Container className="dog">
        {loading ? (
          <div className="text-center d-flex mt-5 p-5">
            <Spinner animation="grow" variant="primary" />
            <p className="">Loading pets...</p>
          </div>
        ) : error ? (
          <div className="text-center m-5 text-danger">
            <h4>{error}</h4>
          </div>
        ) : (
          <>
            <h1 className="dog-h1 text-center fw-bold mt-5 p-5">Pick a Companion...</h1>
            <Row>
              {pets.map((pet) => (
                <Col key={pet.id} md={4} lg={4} sm={12} className="mb-4 mt-1">
                  <Link to={`/Storedpets/${encodeURIComponent(pet.name)}`} className="text-decoration-none">
                    <Card
                      className="dog-card shadow-lg border-0 h-100 transition-all duration-300 hover:scale-105"
                      style={{ borderRadius: '20px', overflow: 'hidden' }}
                    >
                      <div style={{ height: '250px', overflow: 'hidden' }}>
                        <Card.Img
                          variant="top"
                          src={pet.imageUrl}
                          alt={pet.name}
                          className="img-fluid"
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      </div>
                      <Card.Body className="text-center p-3">
                        <Card.Title className="fw-bold fs-5 text-dark">{pet.name}</Card.Title>
                        <Card.Text className="text-muted" style={{ minHeight: '60px' }}>
                          {pet.description}
                        </Card.Text>
                        <p className="text-secondary fw-semibold">🐾 Age: {pet.age} years</p>
                        <button className="btn btn-primary btn-sm rounded-pill px-3">Adopt Me</button>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      {showFooter && <Footer />}
    </>
  );
}
