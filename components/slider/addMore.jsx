import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdOutlineFullscreen } from "react-icons/md";

const Slider = ({ addToCartHandler }) => {
  const [modalImage, setModalImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to 4 items per page
  const [snacks, setSnacks] = useState([]);
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
  // Function to handle sliding
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
    // Function to handle media queries
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Show only 1 product on small screens
      } else {
        setItemsPerPage(3); // Default to 4 snacks on larger screens
      }
    };

    // Initial check
    updateItemsPerPage();

    // Event listener for screen resize
    window.addEventListener("resize", updateItemsPerPage);

    // Cleanup event listener on component unmount
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
    }, 50000);

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, snacks.length]);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };
  return (
    <div className=" w-full">
      <div className="flex flex-row gap-8 text-gray-300 md:mt-16">
        <div className="">
          <h2 className="md:text-lg text-sm text-white">Add Snacks</h2>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-16 text-gray-300 relative mt-24 md:mt-24 md:ml-8">
        <div className="absolute inset-0 flex items-center justify-center">
          {snacks
            .slice(startIndex, startIndex + itemsPerPage)
            .map((product, index) => (
              <div
                key={index}
                className="group flex flex-col rounded-lg md:w-96 mt-16 lg:mt-0 w-full items-center gap-2"
              >
                <div
                  className="relative flex flex-col gap-4 items-center justify-center lg:h-40 h-56 mb-4 md:w-40 w-56 border border-gray-200 overflow-hidden"
                  style={{ backgroundColor: "#020617" }}
                >
                  <img
                    src={`/images/${product.image}`}
                    className="w-44 h-32 md:w-24 md:h-20"
                    alt={product.name}
                  />
                  <div className="flex flex-col items-center">
                    <h6 className="font-semibold ">{product.name}</h6>
                    <span className="text-sm text-yellow-400">
                      Start @ Rs. {product.fromprice}
                    </span>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="flex flex-row justify-center absolute bottom-0 left-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                  >
                    <PiShoppingCartFill className="w-5 h-5 mr-2" />

                    <p className="inline-block text-sm"> Add to Cart</p>
                  </button>
                  <button
                    onClick={() => openModal(`/images/${product.image}`)}
                    className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                  >
                    <MdOutlineFullscreen className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          {modalImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="relative flex items-center justify-center w-96 h-96">
                <img
                  src={modalImage}
                  alt="Full view"
                  className="w-full  h-full"
                />
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-yellow-400 text-black rounded-full hover:bg-black hover:text-white"
              >
                Close
              </button>
            </div>
          )}
          <div className="flex lg:space-x-80 space-x-64 text-white absolute md:top-24 top-4">
            <FaChevronLeft
              className={`h-6 w-6 ${
                startIndex === 0
                  ? "opacity-50 cursor-pointer"
                  : "hover:text-yellow-400 cursor-pointer"
              }`}
              disabled={startIndex === 0}
              onClick={() => slide("prev")}
            />
            <FaChevronRight
              className={`h-6 w-6 ${
                startIndex + itemsPerPage >= snacks.length
                  ? "opacity-50 cursor-pointer"
                  : "hover:text-yellow-400 cursor-pointer"
              }`}
              disabled={startIndex + itemsPerPage >= snacks.length}
              onClick={() => slide("next")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
