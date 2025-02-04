import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import './dog.css';
import Footer from '../footer/footer';

export default function Dog({ numberOfDogs, showFooter = true  }) {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const API_URL = `https://api.thedogapi.com/v1/images/search?limit=50&api_key=Aaba64b2-6be8-46b0-a7ce-92034a670f0a`;

    const fetchDogData = () => {
      fetch(API_URL, {})
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((dogData) => {
          const filteredDogs = dogData
            .filter((dog) => dog.breeds && dog.breeds.length > 0 && dog.breeds[0]?.bred_for);

          console.log("Filtered Dog data:", filteredDogs);
          setDogs(filteredDogs);
        })
        .catch((error) => {
          console.error('Error fetching dog data:', error);
        });
    };

    // Initial fetch
    fetchDogData();

    // Set up interval for subsequent fetches (every 60 seconds)
    const intervalId = setInterval(() => {
      fetchDogData();
    }, 60000); // 60 seconds in milliseconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [numberOfDogs]);

  return (
    <>
      <Container className="dog">
        {dogs.length === 0 ? (
          <h1 className='dog-h1'>Loading <Spinner animation="grow" variant='primary' /></h1>
        ) : (
          <>
            <h1 className='dog-h1'>Pick a Companion...</h1>
            <Row>
              {dogs.map((dog) => (
                <Col key={dog.id} md={4} lg={4} sm={12} className="mb-4 mt-5">
                  {dog.breeds?.[0]?.name && (
                    <Link to={`/dogs/${dog.breeds[0].name}/${dog.id}`} className='link'>
                      <Card style={{ height: '400px' }} className='dog-card'>
                        <Card.Img variant="top" src={dog.url} alt={`Dog ${dog.id}`} className="img-fluid" />
                        <Card.Body>
                          <Card.Title>{dog.breeds[0].name}</Card.Title>
                          <Card.Text>Bred For: {dog.breeds[0]?.bred_for}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  )}
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