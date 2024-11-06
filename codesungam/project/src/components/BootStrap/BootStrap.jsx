import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import img1 from '../Images/img1.jpg';
import img2 from '../Images/img2.jpg';
import img3 from '../Images/img3.jpg';

function CollegeCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="carousel-image d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First Slide Label</h5>
          <p>Description for the first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second Slide Label</h5>
          <p>Description for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image d-block w-100"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third Slide Label</h5>
          <p>Description for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CollegeCarousel;
