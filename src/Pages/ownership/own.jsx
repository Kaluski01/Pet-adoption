import React from 'react';
import './own.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import image1 from '../assests/dogs.avif';
import image2 from '../assests/catss.webp';
import image3 from '../assests/fun.webp';
import image4 from '../assests/well.webp';

const EducationalContentCard = () => {
  return (
    <div className="educational-section">
      <Container>
        <h1 className="section-title mt-5">Pet Training</h1>
        <Row className="cards-row">
          {/* Card 1 */}
          <Col md={6} lg={4} className="d-flex justify-content-center">
            <Card className="custom-card">
              <Card.Img variant="top" src={image1} className="card-image" />
              <Card.Body>
                <Card.Title>Educational Content</Card.Title>
                <Card.Text>
                  Discover valuable insights on pet care, training, and more. Learn how to provide the best for your
                  furry friend.
                </Card.Text>
                <Button
                  variant="primary"
                  href="https://www.greensboroncvet.com/site/friendly-animal-clinic-blog/2022/06/15/wellness-tips-for-pets"
                  target="_blank"
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md={6} lg={4} className="d-flex justify-content-center">
            <Card className="custom-card">
              <Card.Img variant="top" src={image4} className="card-image" />
              <Card.Body>
                <Card.Title>Health and Wellness</Card.Title>
                <Card.Text>
                  Explore articles on maintaining your pet's health and ensuring their overall well-being.
                </Card.Text>
                <Button
                  variant="primary"
                  href="https://www.greensboroncvet.com/site/friendly-animal-clinic-blog/2022/06/15/wellness-tips-for-pets"
                  target="_blank"
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md={6} lg={4} className="d-flex justify-content-center">
            <Card className="custom-card">
              <Card.Img variant="top" src={image2} className="card-image" />
              <Card.Body>
                <Card.Title>Training and Behavior</Card.Title>
                <Card.Text>
                  Master the art of training and understand your pet's behavior. Build a strong bond through training.
                </Card.Text>
                <Button variant="primary" href="https://www.diyk9.com/" target="_blank">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 4 */}
          <Col md={6} lg={4} className="d-flex justify-content-center">
            <Card className="custom-card">
              <Card.Img variant="top" src={image3} className="card-image" />
              <Card.Body>
                <Card.Title>Pet-Friendly Activities</Card.Title>
                <Card.Text>
                  Explore exciting activities to enjoy with your pet. Create lasting memories through fun experiences.
                </Card.Text>
                <Button
                  variant="primary"
                  href="https://www.helpanimals.co.uk/post/44-fun-activities-to-do-with-your-dog"
                  target="_blank"
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EducationalContentCard;
