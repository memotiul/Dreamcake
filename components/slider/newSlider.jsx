// components/Carousel.js
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const Carousel = ({ autoSlide = true, autoSlideInterval = 2000 }) => {
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

  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(next, autoSlideInterval);
      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, autoSlideInterval]);

  const getImagePath = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("/images/")) {
      return imagePath;
    }
    return imagePath;
  };
  return (
    <div className="overflow-hidden relative border border-white rounded">
      <div
        className="flex transition-transform ease-out duration-500 w-64 "
        style={{ transform: `translateX(-${curr * 50}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={
              slide && slide.startsWith("/images/")
                ? getImagePath(slide) // If image path already contains '/images/'
                : `/images/${getImagePath(slide || "default.jpg")}` // If image path does not contain '/images/', or fallback to 'default.jpg'
            }
            alt={`Slide ${index}`}
            className="w-24 xl:h-96 lg:h-96 md:h-96 xxs:h-64 xs:h-64 xxss:h-64 object-cover"
            style={{ minWidth: "80%" }}
          />
        ))}
      </div>
      {/* <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="p-1 rounded-full shadow  text-white ">
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={next} className="p-1 rounded-full shadow  text-white ">
          <FaChevronRight className="h-6 w-6" />
        </button>
      </div> */}

      {/* <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${curr === i ? 'p-2' : 'bg-opacity-50'}
              `}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Carousel;
