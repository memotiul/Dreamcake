import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { MdOutlineFormatQuote } from "react-icons/md";

const Slider = () => {
  const [trends, setTrends] = useState([]);
  // Default to 3 items per page
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to 3 items per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/trends");
        const data = await response.json();
        setTrends(data);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    };

    fetchReviews();
  }, []);
  console.log("Fetch Trends", trends);

  const slide = (direction) => {
    if (direction === "next") {
      if (startIndex + itemsPerPage < products.length) {
        setStartIndex(startIndex + 1);
      }
    } else if (direction === "prev") {
      if (startIndex > 0) {
        setStartIndex(startIndex - 1);
      }
    }
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Show only 1 product on small screens
      } else {
        setItemsPerPage(4); // Default to 3 products on larger screens
      }
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startIndex + itemsPerPage < products.length) {
        setStartIndex(startIndex + 1);
      } else {
        setStartIndex(0);
      }
    }, 5000); // Increased the interval time to 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, products.length]);

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center">
          <h2 className="text-3xl text-white">More Trendy</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm w-full">
            Red Velvet, Black Forest, Fruit Cake, Mickey Mouse Cake, Doremon
            Cake, White Forest Cake, Babie Doll Cake, Rosmalai and much more!
          </p>
        </div>
      </div>
      <div className="flex space-x-8 text-white items-center md:px-24">
        <div
          className="w-8 h-32 bg-yellow-400 rounded-sm flex items-center justify-center cursor-pointer"
          onClick={() => slide("prev")}
        >
          {" "}
          <FaChevronLeft
            className={`h-6 w-6 text-black ${
              startIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400 "
            }`}
          />
        </div>
        <div className="relative overflow-hidden w-full flex items-center">
          <div
            className="flex transition-transform duration-1000 ease-in-out md:ml-4 ml-2"
            style={{
              transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="md:w-48 w-64 mt-8 flex items-center md:justify-center"
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <ul className="flex md:flex-row ml-2 md:gap-4 md:mr-8">
                  <li className="md:w-48 w-64">
                    <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-stone-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                      <img
                        src="/images/vanilla/v9.jpg"
                        alt="food image"
                        className="w-40 hover-zoom md:w-48 lg:w-24"
                        // style="transition: transform 0.2s ease-in-out;"
                      />
                    </div>

                    <div className="pt-5">
                      <div className="mb-2">
                        <h4 className="text-2xl">{product.name}</h4>
                        <p className="text-sm text-gray-300">Delivery- Today</p>
                      </div>

                      <p className="text-yellow-400">
                        Starting @ Rs. {product.price}
                      </p>
                    </div>

                    <button className="mt-2 flex flex-row gap-1 mb-2 bg-yellow-400 text-black w-full justify-center rounded-lg py-3 px-5 ">
                      {/* <IoBagHandle className="w-5 h-5" /> */}
                      <p className="inline-block text-sm mt-.5 text-center">
                        {" "}
                        Click Here
                      </p>
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-8 h-32 bg-yellow-400 rounded-sm flex items-center justify-center cursor-pointer"
          onClick={() => slide("next")}
        >
          {" "}
          <FaChevronRight
            className={`h-6 w-6 text-black ${
              startIndex + itemsPerPage >= products.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
