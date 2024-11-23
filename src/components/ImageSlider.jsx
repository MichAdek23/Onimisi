import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Sample images for the slider (replace these with actual product ads or trending images)
const sliderImages = [
  'https://via.placeholder.com/1200x400?text=Trending+Product+1',
  'https://via.placeholder.com/1200x400?text=Trending+Product+2',
  'https://via.placeholder.com/1200x400?text=Trending+Product+3',
];

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 5px;
  }
`;

const SliderImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      <SliderImage
        src={sliderImages[currentImage]}
        alt={`Trending Product ${currentImage + 1}`}
      />
    </SliderContainer>
  );
};

export default ImageSlider;
