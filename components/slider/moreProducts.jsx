import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdOutlineFullscreen } from "react-icons/md";

const Slider = ({ addToCartHandler }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to 4 items per page
  const [trendy, setTrendy] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  // Default to 3 items per page

  useEffect(() => {
    const fetchTrendy = async () => {
      try {
        const response = await fetch("/api/trendy");
        const data = await response.json();
        setTrendy(data);
      } catch (error) {
        console.error("Error fetching Trendy:", error);
      }
    };

    fetchTrendy();
  }, []);
  console.log(trendy);
  const slide = (direction) => {
    if (direction === "next") {
      if (startIndex + itemsPerPage < trendy.length) {
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
        setItemsPerPage(4); // Default to 4 trendy on larger screens
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
      if (startIndex + itemsPerPage < trendy.length) {
        setStartIndex(startIndex + 1);
      } else {
        setStartIndex(0);
      }
    }, 50000);

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, trendy.length]);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };
  return (
    <div className="mt-8 w-full flex flex-col items-center">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center md:w-full">
          <h2 className="md:text-3xl text-2xl text-white">
            Recommended Trendy Cakes
          </h2>
          <div className="w-36 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm">
            Red Velvet, Black Forest, Fruit Cake, Mickey Mouse Cake, Doremon
            Cake, White Forest Cake, Babie Doll Cake, Rosmalai and much more!!
          </p>
        </div>
      </div>

      <div
        className="flex md:flex-row flex-col gap-16 lg:gap-4 lg:flex-row text-gray-300 relative mt-32 "
        style={{
          backgroundImage: "url(/images/2.webp)", // Replace with your image URL
          backgroundSize: "cover", // Cover the container, may crop
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "200px",
          width: "80%", // Ensure width is defined
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to add a semi-transparent overlay
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
        >
          {trendy
            .slice(startIndex, startIndex + itemsPerPage)
            .map((product, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg w-96 items-center gap-4 relative z-10 mb-40 "
              >
                <div
                  className="flex flex-col gap-8 items-center justify-center h-52 mb-4 w-52 border border-gray-200 relative group"
                  style={{ backgroundColor: "#020617" }}
                >
                  <img
                    src={`/images/${product.image}`}
                    className="w-24 h-24"
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-center items-center">
                    <h6 className="font-semibold mb-2">{product.name}</h6>
                    <span className="text-sm text-yellow-400">
                      Start @ Rs.{product.fromprice}
                    </span>
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
                  <button
                    onClick={() => openModal(`/images/${product.image}`)}
                    className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                  >
                    <MdOutlineFullscreen className="w-5 h-5" />
                  </button>
                </div>
                {/* <button className="flex flex-row justify-center absolute top-52 left-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                  <PiShoppingCartFill className="w-5 h-5 mr-2" />

                  <p className="inline-block text-sm"> Add to Cart</p>
                </button> */}
              </div>
            ))}
          <div className="flex space-x-32 text-white absolute bottom-5">
            <FaChevronLeft
              className={`h-6 w-6 ${
                startIndex === 0
                  ? "opacity-50  cursor-pointer"
                  : "hover:text-yellow-400 cursor-pointer"
              }`}
              disabled={startIndex === 0}
              onClick={() => slide("prev")}
            />
            <FaChevronRight
              className={`h-6 w-6 ${
                startIndex + itemsPerPage >= trendy.length
                  ? "opacity-50  cursor-pointer"
                  : "hover:text-yellow-400 cursor-pointer"
              }`}
              disabled={startIndex + itemsPerPage >= trendy.length}
              onClick={() => slide("next")}
            />
          </div>
        </div>
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

export default Slider;
