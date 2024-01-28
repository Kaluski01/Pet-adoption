import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../assests/mans.webp';
import image2 from '../assests/lady.webp';
import image3 from '../assests/last.webp';
import image4 from '../assests/we.jpg';

const TestimonialCard = ({ name, content, image }) => {
  return (
    <Card className="testimonial-card" style={{ height: '450px'}}>
      {image && <Card.Img className="card-image" style={{ height: '250px' }} src={image} alt={`image of ${name}`} />}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const TestimonialCards = () => {
  const testimonials = [
    { name: 'John Doe', content: '"I adopted my furry friend from this wonderful pet store, and it has brought so much joy to my life. The staff was helpful, and the process was smooth. Highly recommended!"', image: image1 },
    { name: 'Jane Smith', content: 'Rescuing my pet from here was a life-changing experience. The dedication of the staff to find loving homes for animals in need is commendable. My pet has become an inseparable part of our family."', image: image2 },
    { name: 'Margaret Yugee', content: "Waiting for my pet to find its forever home was worth it. The store's commitment to finding the right matches and providing a caring environment for pets is truly remarkable. My home feels complete with my new furry friend.", image: image4 },
    { name: 'Alice Williams', content: "Getting a new member for our family from this pet store was an amazing decision. The variety of pets and the caring atmosphere made the adoption process enjoyable. Our pet has brought so much happiness and love into our home.", image: image3 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="container-fluid bg-dark mb-5 p-5" style={{paddingBottom:'50px'}}>
      <h1 className="test text-center">Testimonials</h1>
      <div className="row">
        <div className="col-lg-8 col-12 mx-auto mt-5">
          <Carousel controls={false} interval={10000} activeIndex={activeIndex} onSelect={() => {}}>
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index} className="d-flex align-items-center justify-content-center">
                <TestimonialCard {...testimonial} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCards;
