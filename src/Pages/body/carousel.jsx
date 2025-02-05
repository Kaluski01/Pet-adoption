import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../assests/mans.webp';
import image2 from '../assests/lady.webp';
import image3 from '../assests/last.webp';
import image4 from '../assests/we.jpg';
import './carousel.css';

const TestimonialCards = () => {
  const testimonials = [
    {
      name: 'John Doe',
      content:
        '"I adopted my furry friend from this wonderful pet store, and it has brought so much joy to my life. The staff was helpful, and the process was smooth. Highly recommended!"',
      image: image1,
    },
    {
      name: 'Jane Smith',
      content:
        'Rescuing my pet from here was a life-changing experience. The dedication of the staff to find loving homes for animals in need is commendable. My pet has become an inseparable part of our family."',
      image: image2,
    },
    {
      name: 'Margaret Yugee',
      content:
        "Waiting for my pet to find its forever home was worth it. The store's commitment to finding the right matches and providing a caring environment for pets is truly remarkable. My home feels complete with my new furry friend.",
      image: image3,
    },
    {
      name: 'Alice Williams',
      content:
        'Getting a new member for our family from this pet store was an amazing decision. The variety of pets and the caring atmosphere made the adoption process enjoyable. Our pet has brought so much happiness and love into our home.',
      image: image4,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="testimonial-container bg-warning mt-4">
      <h1 className="testimonial-title">Testimonials</h1>
      <div className="carousel-wrapper">
        <Carousel controls={false} interval={10000} activeIndex={activeIndex} onSelect={() => {}}>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index} className="">
              <img className="testimonial-image" src={testimonial.image} alt={`Testimonial ${index}`} />
              <Carousel.Caption className="testimonial-caption  col-10 mt-5">
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-content w-100">{testimonial.content}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialCards;
