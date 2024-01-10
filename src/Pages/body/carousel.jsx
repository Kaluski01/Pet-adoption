import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import image1 from '../assests/mans.webp'
import image2 from '../assests/lady.webp'
import image3 from '../assests/last.webp'
import image4 from '../assests/we.jpg'
const TestimonialCard = ({ name, content,image }) => {
  return (
    <Card className='w-75 h-25 mx-auto'>
      {Image &&  <Card.Img style={{height:'400px'}} src={image} alt={`image of ${name}`}/>}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const TestimonialCards = () => {
  const testimonials = [
    { name: 'John Doe', content: 'Testimonial 1', image: image1 },
    { name: 'Jane Smith', content: 'Testimonial 2', image: image2 },
    { name: 'Margaret Yugee', content: 'Testimonial 3', image: image4 },
    { name: 'Alice Williams', content: 'Testimonial 4', image: image3},
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000); 

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="  bg-dark w-75 mx-auto mb-5 p-5">
      <h1 className='test'>Testimonials</h1>
      <TestimonialCard {...testimonials[activeIndex]} />
    </div>
  );
};

export default TestimonialCards;