import React from 'react';
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
        'I adopted my furry friend from this wonderful pet store, and it has brought so much joy to my life. The staff was helpful, and the process was smooth. Highly recommended!',
      image: image1,
    },
    {
      name: 'Jane Smith',
      content:
        'Rescuing my pet from here was a life-changing experience. The dedication of the staff to find loving homes for animals in need is commendable. My pet has become an inseparable part of our family.',
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

  return (
    <div className="testimonial-container  py-5">
      <h1 className="testimonial-title text-center mb-4 fw-bold">What Our Adopters Say</h1>
      <div className="carousel-wrapper container">
        <Carousel controls={false} indicators={true} interval={5000} pause={false}>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex flex-column align-items-center text-center">
                {/* Profile Image */}
                <img
                  className="testimonial-image rounded-circle mb-3 shadow"
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />

                {/* Testimonial Text */}
                <div className="bg-light rounded p-4 shadow w-75 mx-auto">
                  <h3 className="testimonial-name fw-bold">{testimonial.name}</h3>
                  <p className="testimonial-content fst-italic mb-0">"{testimonial.content}"</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialCards;
