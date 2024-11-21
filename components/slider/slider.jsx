// components/Carousel.js
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const Carousel = ({ autoSlide = true, autoSlideInterval = 2000 }) => {
  const slides = [
    // "/images/b2.png",
    "/images/b4.png",
    "/images/b8.png",
    "/images/b10.png",
    // '/images/s2.png',
    // '/images/s6.png',
    // '/images/cake.png',
    // '/images/cake2.png',
    // '/images/pasta.png',
    // "/images/burger-1.png",
    // "/images/burger-2.png",
    // "/images/burger-3.png",
    // "/images/burger-4.png",
    // "/images/burger-5.png",
    "/images/burger-6.png",
  ];

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

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500 w-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
            style={{ minWidth: "100%" }}
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
