import Image from "next/image";
import { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/**
 * Carousel component for NextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices.
 */
export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 2000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const fetchImages = async () => {
    try {
      const response = await fetch("/api/allTableImage");
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Failed to load images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleNextSlide = () => {
    let newSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(handleNextSlide, autoSlideInterval);
      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, autoSlideInterval, currentSlide]);

  const getImagePath = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("/images/")) {
      return imagePath;
    }
    return imagePath;
  };
  return (
    <div className="relative">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
      />
      <div className="w-[45vw] h-[60vh] flex overflow-hidden relative m-auto">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative w-full h-full"
        >
          {slides.map((slide, index) => {
            return (
              index === currentSlide && (
                <Image
                  key={index}
                  src={
                    slide && slide.startsWith("/images/")
                      ? getImagePath(slide) // If image path already contains '/images/'
                      : `/images/${getImagePath(slide || "default.jpg")}` // If image path does not contain '/images/', or fallback to 'default.jpg'
                  }
                  alt={`Slide ${index}`}
                  layout="fill"
                  className="animate-fadeIn"
                  objectFit="cover"
                />
              )
            );
          })}
        </Swipe>
      </div>
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
      />
    </div>
  );
}
