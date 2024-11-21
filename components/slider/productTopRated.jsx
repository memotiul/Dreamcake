import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";

const Slider = ({ addToCartHandler }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const response = await fetch(
          "/api/viewMoreProducts/viewTopRatedProducts"
        );
        const data = await response.json();
        setTopRatedProducts(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchTopRatedProducts();
  }, []);
  const slide = (direction) => {
    const maxIndex = Math.ceil(topRatedProducts.length / itemsPerPage) - 1;

    if (direction === "next" && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  useEffect(() => {
    // Automatically slide to the next set of topRatedProducts after 3 seconds
    const interval = setInterval(() => {
      if (
        currentIndex <
        Math.ceil(topRatedProducts.length / itemsPerPage) - 1
      ) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Reset to the beginning
      }
    }, 5000); // 3000 milliseconds (3 seconds)

    return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  }, [currentIndex, topRatedProducts.length]);
  return (
    <div className="mt-8">
      <div className="flex flex-row gap-8 text-gray-300">
        <div>
          <h4 className=" text-xl font-bold mb-4 flex items-center justify-between  text-white">
            Top Rated Products
          </h4>
        </div>
        <div className="flex space-x-2">
          <FaChevronLeft
            className={`h-6 w-6 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400"
            }`}
            disabled={currentIndex === 0}
            onClick={() => slide("prev")}
          />
          <FaChevronRight
            className={`h-6 w-6 ${
              currentIndex ===
              Math.ceil(topRatedProducts.length / itemsPerPage) - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400"
            }`}
            disabled={
              currentIndex ===
              Math.ceil(topRatedProducts.length / itemsPerPage) - 1
            }
            onClick={() => slide("next")}
          />
        </div>
      </div>

      <div className="grid grid-row-1 md:grid-row-3 gap-2 text-gray-300">
        {topRatedProducts
          .slice(
            currentIndex * itemsPerPage,
            currentIndex * itemsPerPage + itemsPerPage
          )
          .map((product, index) => (
            <div
              key={index}
              className="flex flex-row  rounded-lg items-center gap-4"
            >
              <div className="flex items-center justify-center h-32 mb-4 w-32 border border-gray-200 group">
                <img src={`/images/${product.image}`} className="w-24 h-24" />
              </div>{" "}
              {/* Placeholder for image */}
              <div className="flex flex-col mb-4 ">
                <h6 className="font-semibold mb-2 text-yellow-400">
                  {product.name}
                </h6>
                <span className="text-sm mb-2">Rs. {product.fromprice}</span>
                <p className="">1 Pound</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => addToCartHandler(product)}
                  className="flex flex-row justify-center inset-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                >
                  <PiShoppingCartFill className="w-5 h-5 mr-2" />

                  <p className="inline-block text-sm"> Add to Cart</p>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
