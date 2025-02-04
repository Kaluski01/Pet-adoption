import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import './cat.css';
import Footer from '../footer/footer';

// const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=200&api_key=live_krqgL373oBzRUWqxu8OEApuXvFP4V283MEvYC8kTqMq4cHr3MsNs5y1QBjqK8K0B';

// Cat component
export default function Cat({ numberOfCat,showFooter = true }) {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    const urlWithLimit = `https://api.thecatapi.com/v1/images/search?limit=1000&api_key=live_krqgL373oBzRUWqxu8OEApuXvFP4V283MEvYC8kTqMq4cHr3MsNs5y1QBjqK8K0B`;
  
    fetch(urlWithLimit)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredCatData = data.filter((catData) => catData.breeds && catData.breeds.length > 0);
        setCat(filteredCatData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error:', error);
        setLoading(false);
      });
  };  

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 200000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Container className="mt-4">
        {loading ? (
          <h1 className='cat-h1'>Loading <Spinner animation="grow" variant='primary' /></h1>
        ) : (
          <>
            <h1 className='cat-h1'>Pick a Companion...</h1>
            <Row>
              {cat?.map((catData) => (
                <Col key={catData.id} md={4} lg={4} sm={12} className="mb-4 mt-5">
                  {catData.breeds?.[0]?.name && (
                    <Link to={`/${catData.name}/${catData.id}`} className='link'>
                      <Card style={{ height: '400px' }} className='cat-card'>
                        <Card.Img variant="" style={{ height: '300px' }} src={catData.url} alt={`Dog ${catData.id}`} className="img-fluids" />
                        <Card.Body>
                          <Card.Title>{catData.breeds[0].name}</Card.Title>
                          {catData.breeds[0]?.bred_for && <Card.Text>Bred For: {catData.breeds[0].bred_for}</Card.Text>}
                          {catData.breeds[0]?.temperament && (
                            <Card.Text>Temperament: {catData.breeds[0].temperament}</Card.Text>
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
      </Container>
      {showFooter && <Footer />}
    </>
  );
}
