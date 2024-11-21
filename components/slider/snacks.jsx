import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { TbHandClick } from "react-icons/tb";
import { MdOutlineFullscreen } from "react-icons/md"; // Icon for fullscreen view

const Slider = ({ addToCartHandler }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [snacks, setSnacks] = useState([]);
  const [modalImage, setModalImage] = useState(null); // To track the image for full view modal

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const response = await fetch("/api/snacks");
        const data = await response.json();
        setSnacks(data);
      } catch (error) {
        console.error("Error fetching snacks:", error);
      }
    };

    fetchSnacks();
  }, []);

  const slide = (direction) => {
    if (direction === "next") {
      if (startIndex + itemsPerPage < snacks.length) {
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
        setItemsPerPage(1);
      } else if (window.innerWidth < 1440 && window.innerWidth > 1024) {
        setItemsPerPage(3); // Show only 1 product on small screens
      } else {
        setItemsPerPage(4);
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
      if (startIndex + itemsPerPage < snacks.length) {
        setStartIndex(startIndex + 1);
      } else {
        setStartIndex(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, snacks.length]);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center">
          <h2 className="text-3xl text-white">Recommended Snacks</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm w-full">
            Pizzas, Burgers, Cinnamon Rolls, Pasta and much more!!
          </p>
        </div>
      </div>
      <div className="flex space-x-1 text-white items-center lg:px-16  xl:px-16">
        <div
          className="w-8 h-32 bg-yellow-400 rounded-sm flex items-center justify-center cursor-pointer"
          onClick={() => slide("prev")}
        >
          <FaChevronLeft
            className={`h-6 w-6 text-black ${
              startIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400"
            }`}
          />
        </div>
        <div className="relative overflow-hidden w-full flex items-center">
          <div
            className="w-full flex flex-row transition-transform duration-1000 ease-in-out xxs:ml-4 xxss:ml-10 ml-2"
            style={{
              transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {snacks.map((product, index) => (
              <div
                key={index}
                className="md:w-96 w-64 mt-8 flex items-center md:justify-center"
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <ul className="flex md:flex-row ml-3 md:mr-12 md:gap-4">
                  <li className="md:w-48 w-64 relative">
                    <div className="flex flex-col gap-8 items-center justify-center h-56 md:h-40 rounded-lg mb-4 border border-gray-200 bg-stone-100 steal-200 relative group">
                      <img
                        src={`/images/${product.image}`}
                        className="w-32 h-32"
                        alt={product.name}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => addToCartHandler(product)}
                          className="flex flex-row justify-center inset-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                        >
                          <PiShoppingCartFill className="w-5 h-5 mr-2" />
                          <p className="inline-block text-sm">Add to cart</p>
                        </button>
                      </div>

                      {/* View Full Image button */}
                      <button
                        onClick={() => openModal(`/images/${product.image}`)}
                        className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                      >
                        <MdOutlineFullscreen className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-2">
                      <h4 className="text-xl">{product.name}</h4>
                      <p className="text-sm text-gray-300">Delivery - Today</p>
                      <p className="text-yellow-400">
                        @ Just Rs. {product.fromprice}
                      </p>
                    </div>
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
          <FaChevronRight
            className={`h-6 w-6 text-black ${
              startIndex + itemsPerPage >= snacks.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-yellow-400"
            }`}
          />
        </div>
      </div>

      {/* Full Image Modal */}
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

export default Slider;
