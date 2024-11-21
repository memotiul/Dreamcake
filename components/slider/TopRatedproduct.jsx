import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const Slider = ({ products, addToCartHandler }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const slide = (direction) => {
    const maxIndex = Math.ceil(products.length / itemsPerPage) - 1;

    if (direction === "next" && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  useEffect(() => {
    // Automatically slide to the next set of products after 3 seconds
    const interval = setInterval(() => {
      if (currentIndex < Math.ceil(products.length / itemsPerPage) - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Reset to the beginning
      }
    }, 5000); // 3000 milliseconds (3 seconds)

    return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  }, [currentIndex, products.length]);

  return (
    <div className="mt-8 w-96">
      <div className="flex flex-row gap-8 text-gray-300">
        <div>
          <h4 className=" text-xl font-bold mb-4 flex items-center justify-between  text-white">
            Top Rated
          </h4>
        </div>
        <div className="flex space-x-2 items-center">
          {/* <button
                        onClick={() => slide('prev')}
                        className={`h-6 w-6 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        disabled={currentIndex === 0}
                    >
                        Prev
                    </button> */}
          <FaChevronLeft
            className={`h-6 w-6 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-black hover:bg-yellow-400"
            }`}
            disabled={currentIndex === 0}
            onClick={() => slide("prev")}
          />
          {/* <button
                        onClick={() => slide('next')}
                        className={`px-3 py-1 rounded-md bg-blue-500 text-gray-300 ${currentIndex === Math.ceil(products.length / itemsPerPage) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`}
                        disabled={currentIndex === Math.ceil(products.length / itemsPerPage) - 1}
                    >
                        Next
                    </button> */}
          <FaChevronRight
            className={`h-6 w-6 ${
              currentIndex === Math.ceil(products.length / itemsPerPage) - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-black hover:bg-yellow-400"
            }`}
            disabled={
              currentIndex === Math.ceil(products.length / itemsPerPage) - 1
            }
            onClick={() => slide("next")}
          />
        </div>
      </div>

      <div className="grid grid-row-1 md:grid-row-3 gap-2 w-96 text-gray-300">
        {products
          .slice(
            currentIndex * itemsPerPage,
            currentIndex * itemsPerPage + itemsPerPage
          )
          .map((product, index) => (
            <div
              key={index}
              className="flex flex-row  rounded-lg w-96 items-center gap-4"
            >
              <div className="flex items-center justify-center h-32 mb-4 w-32 border border-gray-200 group">
                <img src={product.imageUrl} className="w-24 h-24" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="flex flex-row justify-center inset-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                  >
                    <PiShoppingCartFill className="w-5 h-5 mr-2" />

                    <p className="inline-block text-sm"> Add to Cart</p>
                  </button>
                </div>
              </div>{" "}
              {/* Placeholder for image */}
              <div className="flex flex-col">
                <h6 className="font-semibold mb-2">{product.name}</h6>
                <span className="text-sm">{product.price}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
