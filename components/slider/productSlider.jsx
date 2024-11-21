import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";

const Slider = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const [reviewProducts, setReviewProducts] = useState([]);
  useEffect(() => {
    const fetchReviewProducts = async () => {
      try {
        const response = await fetch(
          "/api/viewMoreProducts/viewReviewProducts"
        );
        const data = await response.json();
        setReviewProducts(data);
      } catch (error) {
        console.error("Error fetching snacks:", error);
      }
    };

    fetchReviewProducts();
  }, []);
  const slide = (direction) => {
    const maxIndex = Math.ceil(reviewProducts.length / itemsPerPage) - 1;

    if (direction === "next" && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < Math.ceil(reviewProducts.length / itemsPerPage) - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, reviewProducts.length]);

  return (
    <div className="mt-8">
      <div className="flex flex-row gap-16 text-gray-300">
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Review Products</h4>
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
              Math.ceil(reviewProducts.length / itemsPerPage) - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400"
            }`}
            disabled={
              currentIndex ===
              Math.ceil(reviewProducts.length / itemsPerPage) - 1
            }
            onClick={() => slide("next")}
          />
        </div>
      </div>

      <div className="gap-2 text-gray-300">
        {reviewProducts
          .slice(
            currentIndex * itemsPerPage,
            currentIndex * itemsPerPage + itemsPerPage
          )
          .map((product, index) => (
            <div
              key={index}
              className="flex flex-row  rounded-lg  items-center gap-4"
            >
              <div className="flex items-center justify-center h-32 mb-4 w-32 border border-gray-200">
                <img src={`/images/${product.image}`} className="w-24 h-24" />
              </div>{" "}
              <div className="flex flex-col mb-4 ">
                <h6 className="font-semibold mb-2 text-yellow-400">
                  {product.name}
                </h6>
                <span className="text-sm mb-2">Rs. {product.fromprice}</span>
                <p className="">1 Pound</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
