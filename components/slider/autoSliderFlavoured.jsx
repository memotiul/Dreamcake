import { useState, useEffect } from "react";
import { GiClick } from "react-icons/gi";
import { useRouter } from "next/router";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flavoured, setFlavoured] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1); // Default to 1 image for mobile view

  useEffect(() => {
    const fetchFlavoured = async () => {
      try {
        const response = await fetch("/api/moreFlavoured");
        const data = await response.json();
        setFlavoured([...data, ...data.slice(0, slidesToShow)]); // Duplicate first slides at the end
      } catch (error) {
        console.error("Error fetching flavoured:", error);
      }
    };

    fetchFlavoured();

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
  }, [currentIndex, flavoured.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= flavoured.length
        ? slidesToShow // Reset to the first slide after last
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flavoured.length - slidesToShow : prevIndex - 1
    );
  };

  const getVisibleflavoured = () => {
    return flavoured.slice(currentIndex, currentIndex + slidesToShow);
  };
  const router = useRouter();
  const handleNavigation = (type) => {
    router.push(`/products?type=${type}`);
  };
  return (
    <div className="mt-8 lg:px-24">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center">
          <h2 className="text-3xl text-white">More Flavoured</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm w-full">
            Pine Apple, Chocolate Cake, Fruit Cake, Vanilla Cake, Strawberry
            Cake, Lemon Cake, Mango Cake, Butter Scotch and much more!!
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
          {flavoured.map((product, index) => (
            <div
              key={index}
              className={`w-full ${
                slidesToShow === 1 ? "sm:w-full" : "lg:w-1/3"
              } p-4 flex-shrink-0`}
            >
              <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent  transition-opacity duration-500">
                  <div className="absolute bottom-0 p-4 text-white font-bold">
                    <h3 className="text-xl font-bold">{product.description}</h3>

                    <p className="text-sm">Weight: {product.fromweightage}</p>

                    {/* Add to Cart Button */}

                    <button
                      onClick={() => handleNavigation(product.name)}
                      className="relative mb-2 lg:mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold lg:py-3 lg:px-8 py-2 px-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      <span className="absolute inset-0 bg-yellow-400 opacity-50 rounded-full blur-lg transition-all duration-500 ease-in-out group-hover:opacity-75"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        <GiClick className="lg:text-2xl text-lg animate-bounce" />
                        <span className="lg:text-base text-sm">See more</span>
                      </span>
                    </button>
                  </div>
                  <p className="text-white lg:text-lg absolute lg:right-4 lg:bottom-5 right-2 bottom-0 text-sm">
                    Start @ just Rs. {product.fromprice}
                  </p>
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
