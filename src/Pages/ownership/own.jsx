import React from 'react';
import './own.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import image1 from '../assests/dogs.avif';
import image2 from '../assests/catss.webp';
import image3 from '../assests/fun.webp';
import image4 from '../assests/well.webp';
import Footer from '../footer/footer';

const EducationalContentCard = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="essentianls mt-1">
        <Container >
          <h1 className='mt-5 p-5'>Pet Training</h1>
          <Row className='custom-row mt-4'>
            <Col lg={6} sm={12} className='custom-col mx-auto'>
              <div className="d-flex flex-wrap justify-content-center">
                {/* first card */}
                <Card className='paw-card m-2'>
                  <Card.Img className='kkk' style={{ width: '100%' }} src={image1} />
                  <Card.Body className='gap-5'>
                    <Card.Title>Educational Content</Card.Title>
                    <Card.Text className='text'>
                      Discover valuable insights on pet care, training, and more. Learn how to provide the best for your furry friend.
                    </Card.Text>
                    <Button variant="primary" href="https://www.greensboroncvet.com/site/friendly-animal-clinic-blog/2022/06/15/wellness-tips-for-pets" target="_blank">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
                {/* second card */}
                <Card className='paw-card m-2'>
                  <Card.Img style={{ width: '100%', height: '400px' }} src={image4} />
                  <Card.Body className='gap-5'>
                    <Card.Title>Health and Wellness</Card.Title>
                    <Card.Text className='text'>
                      Explore articles on maintaining your pet's health and ensuring their overall well-being. Your guide to a happy, healthy pet.
                    </Card.Text>
                    <Button variant="primary" href="https://www.greensboroncvet.com/site/friendly-animal-clinic-blog/2022/06/15/wellness-tips-for-pets" target="_blank">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
                {/* third card */}
                <Card className='paw-card m-2'>
                  <Card.Img style={{ width: '100%', height: '300px' }} src={image2} />
                  <Card.Body>
                    <Card.Title>Training and Behavior</Card.Title>
                    <Card.Text className='text'>
                      Master the art of training and understand your pet's behavior. Build a strong bond through effective training techniques.
                    </Card.Text>
                    <Button variant="primary" href="https://www.diyk9.com/" target="_blank">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
                {/* fourth card */}
                <Card className='paw-card m-2'>
                  <Card.Img style={{ width: '100%', height: '300px' }} src={image3} />
                  <Card.Body>
                    <Card.Title>Pet-Friendly Activities</Card.Title>
                    <Card.Text className='text'>
                      Explore exciting activities to enjoy with your pet. Create lasting memories through fun and engaging experiences.
                    </Card.Text>
                    <Button variant="primary" href="https://www.helpanimals.co.uk/post/44-fun-activities-to-do-with-your-dog" target="_blank">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default EducationalContentCard;
