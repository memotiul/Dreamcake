import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GiClick } from "react-icons/gi";

const Carousel = ({ customers = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [review, setReview] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const updateSlidesToShow = () => {
      setSlidesToShow(window.innerWidth >= 1024 ? 3 : 1);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // ✅ Use customers data directly instead of fetching from /api/reviews
  useEffect(() => {
    if (customers.length > 0) {
      setReview([...customers, ...customers.slice(0, slidesToShow)]);
    }
  }, [customers, slidesToShow]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [review.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + slidesToShow >= review.length ? slidesToShow : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? review.length - slidesToShow : prev - 1
    );
  };

  return (
    <div className="mt-8 lg:px-24">
      <div className="text-center text-white">
        <h2 className="text-3xl">Customer Reviews</h2>
        <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
      </div>

      <div className="relative w-full overflow-hidden px-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          }}
        >
          {(review || []).map((r, index) => (
            <div
              key={index}
              className={`w-full ${
                slidesToShow === 1 ? "sm:w-full" : "lg:w-1/3"
              } p-6 flex-shrink-0`}
            >
              <div className="group relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-xl rounded-3xl overflow-hidden">
                <div className="relative overflow-hidden h-48 lg:h-52 p-4">
                  <img
                    src={
                      r.image ? `/images/${r.image}` : "/images/default-image.png"
                    }
                    alt={r.name}
                    className="w-16 h-12 rounded-full border border-white"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black py-1 px-3 rounded-lg shadow-lg">
                    Regular
                  </div>
                </div>
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-base font-bold mb-2">{r.name}</h3>
                  <p className="text-xs mb-3">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2"
        >
          Prev
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
