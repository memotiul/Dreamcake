import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { MdOutlineFormatQuote } from "react-icons/md";

const Slider = () => {
  const [reviews, setReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default to 3 items per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const slide = (direction) => {
    if (direction === "next") {
      if (startIndex + itemsPerPage < reviews.length) {
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
        setItemsPerPage(3); // Default to 3 reviews on larger screens
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
      if (startIndex + itemsPerPage < reviews.length) {
        setStartIndex(startIndex + 1);
      } else {
        setStartIndex(0);
      }
    }, 5000); // Interval time set to 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, reviews.length]);

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center md:w-full xs:px-8 xxs:px-8 xxss:px-8">
          <h2 className="text-3xl text-white">Customer Review</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm text-center">
            Thank you to all of our loyal customers.. THANK YOU! It has been a
            pleasure creating your many celebration cakes and treats. We
            appreciate your continued support. We love to read your notes and
            reviews. We are truly grateful and very blessed indeed... Love,
            Patty and staff!!
          </p>
        </div>
      </div>
      <div className="flex  text-white items-center md:px-36">
        <div
          className="w-8 h-32 bg-yellow-400 rounded-sm flex items-center justify-center cursor-pointer"
          onClick={() => slide("prev")}
        >
          <FaChevronLeft
            className={`h-6 w-6 text-black ${
              startIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-white"
            }`}
          />
        </div>
        <div className="relative overflow-hidden w-full flex items-center">
          <div
            className="flex transition-transform duration-1000 ease-in-out lg:ml-4 lg:mr-4 xl:mr-4 xl:ml-4"
            style={{
              transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-24 "
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <div
                  className="w-full h-40 flex flex-col gap-4 rounded-lg p-6"
                  style={{ backgroundColor: "#020617" }}
                >
                  <div className="flex flex-row gap-4 items-center">
                    <img
                      src={
                        review.image
                          ? `/images/${review.image}`
                          : "/images/default-image.png"
                      }
                      alt="review image"
                      className="md:w-12 md:h-12 w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-row gap-16 ml-2">
                      <div className="flex flex-col">
                        <p className="font-oswald text-white">{index + 1}</p>
                        <p className="text-sm text-white">{review.name}</p>
                      </div>
                      <MdOutlineFormatQuote className="text-yellow-400 w-7 h-7" />
                    </div>
                  </div>
                  <p className="text-xs h-64">{review.description}</p>
                </div>
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
              startIndex + itemsPerPage >= reviews.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
