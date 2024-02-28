import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import './pet.css'; // Assuming you have a common CSS file for both dogs and cats
import Footer from '../footer/footer';

const DOG_API_URL = 'https://api.thedogapi.com/v1/images/search?limit=5';
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10';

export default function Pets({ numberOfDogs, numberOfCats, showFooter = false }) {
  const [dogPets, setDogPets] = useState([]);
  const [catPets, setCatPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPetData = (apiUrl, numberOfPets, setPetsState) => {
    setLoading(true);
    fetch(`${apiUrl}${numberOfPets}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredPetData = data.filter((petData) => petData.breeds && petData.breeds.length > 0);
        setPetsState(filteredPetData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error:', error);
        setError('Please check your internet connection.');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (numberOfDogs > 0) {
      fetchPetData(DOG_API_URL, numberOfDogs, setDogPets);
    }

    if (numberOfCats > 0) {
      fetchPetData(CAT_API_URL, numberOfCats, setCatPets);
    }

    const timeoutId = setTimeout(() => {
      if (loading) {
        setError('Please check your internet connection.');
      }
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [numberOfDogs, numberOfCats, loading]);

  return (
    <>
      <Container className="mt-4">
        {loading ? (
          <h1 className='pet-h1'>Loading <Spinner animation="grow" /></h1>
        ) : (
          <>
            {error ? (
              <h1 className='pet-h1'>{error}</h1>
            ) : (
              <>
                <h1 className='pet-h1'>Pick a Companion...</h1>
                <Row>
                  {dogPets.slice(0, 5).map((dogData) => (
                    <Col key={dogData.id} md={4} lg={4} sm={5} className="mb-4 mt-5">
                      {dogData.breeds?.[0]?.name && (
                        <Link to={`/dogs/${(dogData.breeds[0].name)}/${dogData.id}`} className='link'>
                          <Card className="pet-card">
                            <Card.Img variant="" src={dogData.url} alt={`Dog ${dogData.id}`} className="img-fluids" />
                            <Card.Body>
                              <Card.Title>{dogData.breeds[0].name}</Card.Title>
                              {dogData.breeds[0]?.bred_for && <Card.Text className="text-ellipsis">Bred For: {dogData.breeds[0].bred_for}</Card.Text>}
                              {dogData.breeds[0]?.temperament && (
                                <Card.Text className="text-ellipsis">Temperament: {dogData.breeds[0].temperament}</Card.Text>
                              )}
                            </Card.Body>
                          </Card>
                        </Link>
                      )}
                    </Col>
                  ))}
                  {catPets.slice(0, 5).map((catData) => (
                    <Col key={catData.id} md={4} lg={4} sm={12} className="mb-4 mt-5">
                      {catData.breeds?.[0]?.name && (
                        <Link to={`/cats/${catData.id}`} className='link'>
                          <Card className="pet-card">
                            <Card.Img variant="" src={catData.url} alt={`Cat ${catData.id}`} className="img-fluids" />
                            <Card.Body>
                              <Card.Title>{catData.breeds[0].name}</Card.Title>
                              {catData.breeds[0]?.bred_for && <Card.Text className="text-ellipsis">Bred For: {catData.breeds[0].bred_for}</Card.Text>}
                              {catData.breeds[0]?.temperament && (
                                <Card.Text className="text-ellipsis">Temperament: {catData.breeds[0].temperament}</Card.Text>
                              )}
                            </Card.Body>
                          </Card>
                        </Link>
                      )}
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </>
        )}
      </Container>
      {showFooter && <Footer />}
    </>
  );
}
