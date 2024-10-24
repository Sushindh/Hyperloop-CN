import React, { useState, useEffect } from "react";


const images = [
  "https://via.placeholder.com/600x300?text=Image+1",
  "https://via.placeholder.com/600x300?text=Image+2",
  "https://via.placeholder.com/600x300?text=Image+3",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Previous Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md focus:outline-none"
      >
        &#10094;
      </button>

      {/* Image */}
      <div className="w-full h-64">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md focus:outline-none"
      >
        &#10095;
      </button>

      {/* Dots for navigation */}
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
