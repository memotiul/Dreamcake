import { useState, useEffect } from "react";
import { PiShoppingCartFill } from "react-icons/pi"; // Import shopping cart icon
import { MdOutlineFullscreen } from "react-icons/md";

const Carousel = ({ addToCartHandler }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snacks, setSnacks] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1); // Default to 1 image for mobile view
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const response = await fetch("/api/snacks");
        const data = await response.json();
        setSnacks([...data, ...data.slice(0, slidesToShow)]); // Duplicate first slides at the end
      } catch (error) {
        console.error("Error fetching snacks:", error);
      }
    };

    fetchSnacks();

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
    }, 7000); // Slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentIndex, snacks.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= snacks.length
        ? slidesToShow // Reset to the first slide after last
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? snacks.length - slidesToShow : prevIndex - 1
    );
  };

  const getVisibleSnacks = () => {
    return snacks.slice(currentIndex, currentIndex + slidesToShow);
  };
  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };
  return (
    <div className="lg:px-24">
      <div className="flex flex-row gap-8 text-gray-300 mt-8 lg:px-24">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center">
          <h2 className="text-3xl text-white">Recommended Snacks</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm w-full">
            Pizzas, Burgers, Cinnamon Rolls, Pasta and much more!!
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
          {snacks.map((product, index) => (
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

                {/* Overlay for product details (opacity-0 group-hover:opacity-100)*/}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent  transition-opacity duration-500">
                  <div className="absolute bottom-0 p-4 text-white font-bold">
                    <h3 className="text-xl font-bold">{product.description}</h3>

                    <p className="text-sm">Weight: {product.fromweightage}</p>

                    {/* Add to Cart Button */}

                    <button
                      onClick={() => addToCartHandler(product)}
                      className="relative mb-1 mt-1 lg:mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold lg:py-3 lg:px-8 py-2 px-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      <span className="absolute inset-0 bg-yellow-400 opacity-50 rounded-full blur-lg transition-all duration-500 ease-in-out group-hover:opacity-75"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        <PiShoppingCartFill className="lg:text-2xl text-lg animate-bounce" />
                        <span className="lg:text-base text-sm">
                          Add to Cart
                        </span>
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => openModal(`/images/${product.image}`)}
                    className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                  >
                    <MdOutlineFullscreen className="w-5 h-5" />
                  </button>
                  <p className="text-white lg:text-lg absolute lg:right-4 lg:bottom-5 right-2 bottom-0 text-sm">
                    Price: {product.fromprice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-0 py-2"
        >
          Prev
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-0 py-2"
        >
          Next
        </button>
      </div>
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative flex items-center justify-center w-96 h-96">
            <img src={modalImage} alt="Full view" className="w-full  h-full" />
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-yellow-400 text-black rounded-full hover:bg-black hover:text-white"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
