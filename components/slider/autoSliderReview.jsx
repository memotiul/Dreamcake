import { useState, useEffect } from "react";
import { GiClick } from "react-icons/gi";
import { useRouter } from "next/router";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [review, setReview] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1); // Default to 1 image for mobile view

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReview([...data, ...data.slice(0, slidesToShow)]); // Duplicate first slides at the end
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();

    // Set the number of images to show based on screen size
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // Show 3 images for lg and xl screens
      } else {
        setSlidesToShow(1); // Show 1 image for smaller screens
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, [slidesToShow]);

  // Handle auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentIndex, review.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= review.length
        ? slidesToShow // Reset to the first slide after last
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? review.length - slidesToShow : prevIndex - 1
    );
  };

  const getVisiblereview = () => {
    return review.slice(currentIndex, currentIndex + slidesToShow);
  };
  const router = useRouter();
  const handleNavigation = (type) => {
    router.push(`/products?type=${type}`);
  };
  return (
    <div className="mt-8 lg:px-24">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center md:w-full xs:px-8 xxs:px-8 xxss:px-8">
          <h2 className="text-3xl text-white">Customer Review</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm text-center">
            Thank you to all of our loyal customers.. THANK YOU! It has been a
            pleasure creating your many celebration cakes and treats. We
            appreciate your continued support. We love to read your notes and
            reviews. We are truly grateful and very blessed indeed... Love,
            Patty and staff!!
          </p>
        </div>
      </div>
      <div className="relative w-full overflow-hidden px-8">
        {/* Slider container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          }}
        >
          {review.map((reviews, index) => (
            <div
              key={index}
              className={`w-full ${
                slidesToShow === 1 ? "sm:w-full" : "lg:w-1/3"
              } p-6 flex-shrink-0`}
            >
              <div className="group relative bg-gradient-to-r shadow-xl from-gray-700 via-gray-800 to-gray-900 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <div className="relative overflow-hidden h-48 lg:h-52 p-4">
                  <img
                    src={
                      reviews.image
                        ? `/images/${reviews.image}`
                        : "/images/default-image.png"
                    }
                    alt={reviews.name}
                    className="w-16 h-12 rounded-full border border-white"
                  />

                  {/* Animated floating box */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black  py-1 px-3 rounded-lg shadow-lg">
                    Regular
                  </div>
                </div>

                {/* Overlay for reviews details */}

                <div className="absolute bottom-0 p-4 text-white ">
                  <h3 className="text-base font-bold mb-2">{reviews.name}</h3>
                  <p className="text-xs mb-3"> {reviews.description}</p>
                  <p className="text-sm font-bold">${index + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 "
        >
          Prev
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
