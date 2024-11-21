import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { MdOutlineFormatQuote } from "react-icons/md";
import { useRouter } from "next/router";
import { GiClick } from "react-icons/gi";

const Slider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to 3 items per page
  const [flavour, setflavour] = useState([]);
  // Default to 3 items per page

  useEffect(() => {
    const fetchflavour = async () => {
      try {
        const response = await fetch("/api/moreFlavoured");
        const data = await response.json();
        setflavour(data);
      } catch (error) {
        console.error("Error fetching flavour:", error);
      }
    };

    fetchflavour();
  }, []);
  console.log(flavour);
  const slide = (direction) => {
    if (direction === "next") {
      if (startIndex + itemsPerPage < flavour.length) {
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
      } else if (window.innerWidth < 1440) {
        setItemsPerPage(3); // Show only 1 product on small screens
      } else {
        setItemsPerPage(4); // Default to 3 flavour on larger screens
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
      if (startIndex + itemsPerPage < flavour.length) {
        setStartIndex(startIndex + 1);
      } else {
        setStartIndex(0);
      }
    }, 5000); // Increased the interval time to 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, flavour.length]);
  const router = useRouter();
  const handleNavigation = (type) => {
    router.push(`/products?type=${type}`);
  };
  return (
    <div className="mt-8 w-full">
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
      <div className="flex lg:flex-row lg:gap-4 text-white items-center lg:px-16">
        <div
          className="w-8 h-32 bg-yellow-400 rounded-sm flex  items-center justify-center cursor-pointer"
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
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {flavour.map((product, index) => (
              <div
                key={index}
                className="md:w-36 w-64 mt-8 flex items-center md:gap-2 "
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <ul className="flex lg:flex-row  md:flex-row md:ml-12 lg:ml-9 ml-5  xxs:ml-8 xxss:ml-8 xs:ml-6">
                  <li
                    className="md:w-72 lg:w-72 xl:w-48 w-64 cursor-pointer "
                    // onClick={() => handleNavigation(product.name)}
                  >
                    {/* <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-stone-100 rounded-lg hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                      <img
                        src={`/images/${product.image}`}
                        alt="food image"
                        className="w-40 hover-zoom md:w-48 lg:w-24"
                        // style="transition: transform 0.2s ease-in-out;"
                      />
                    </div> */}
                    <div className="flex flex-col gap-8 items-center justify-center  h-56 md:h-40 rounded-lg mb-4 border border-gray-200 bg-stone-100 steal-200 relative group">
                      <img
                        src={`/images/${product.image}`}
                        className="w-32 h-32"
                        alt={product.name}
                      />
                      <div
                        onClick={() => handleNavigation(product.name)}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <button className="flex flex-row justify-center inset-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                          <GiClick className="w-5 h-5 mr-2" />

                          <p className="inline-block text-sm">See More</p>
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-2">
                        <h4 className="text-xl">{product.name}</h4>
                        <p className="text-sm text-gray-300">Delivery- Today</p>
                      </div>

                      <p className="text-yellow-400">
                        Starting @ Rs. {product.fromprice}
                      </p>
                    </div>

                    {/* <button className="group h-10 rounded-lg bg-yellow-400 text-black font-semibold text-sm md:w-48 w-full mt-1 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                      <GiClick className="w-5 h-5" />
                      Click here
                    </button> */}
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
              startIndex + itemsPerPage >= flavour.length
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
