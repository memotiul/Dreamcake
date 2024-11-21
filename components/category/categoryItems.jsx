import { useRouter } from "next/router";
import Button from "@/components/Button";
import styles from "@/styles/home.module.css";
import ProductSlider from "@/components/slider/productSlider";
import ProductLatest from "@/components/slider/productLatest";
import MoreProducts from "@/components/slider/moreProducts";
import AutoSliderReview from "@/components/slider/autoSliderReview";
import ProductTopRated from "@/components/slider/productTopRated";
import Notification from "@/components/notification/notification";
import ProductsTab from "@/components/tabs/productsTab";
import ProductList from "@/components/products/productList";
import Review from "@/components/slider/review";
import { GiClick } from "react-icons/gi";
import { CartContext } from "@/context/CartContext";
import { useEffect, useContext, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
  const products = [
    { name: "Product 1", imageUrl: "/images/burger-1.png", price: "$30.00" },
    { name: "Product 2", imageUrl: "/images/burger-2.png", price: "$25.00" },
    { name: "Product 3", imageUrl: "/images/burger-3.png", price: "$35.00" },
    { name: "Product 4", imageUrl: "/images/burger-4.png", price: "$28.00" },
    { name: "Product 5", imageUrl: "/images/burger-5.png", price: "$32.00" },
    { name: "Product 6", imageUrl: "/images/burger-6.png", price: "$27.00" },
    // Add more products as needed
  ];

  const router = useRouter();
  const handleNavigation = (type) => {
    router.push(`/products?type=${type}`);
  };

  const { addItemToCart } = useContext(CartContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAlreadyInCartMessage, setShowAlreadyInCartMessage] =
    useState(false);
  const addToCartHandler = (product) => {
    const itemAdded = addItemToCart({
      product: product.id,
      name: product.name,
      price: product.fromprice,
      image: `/images/${product.image}`,
      size: 1,
      iSize: product.fromweightage,
      quantity: 1,
      description: product.description,
    });

    if (itemAdded) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      setShowAlreadyInCartMessage(true);
      setTimeout(() => {
        setShowAlreadyInCartMessage(false);
      }, 3000);
    }
  };

  return (
    <>
      {showSuccessMessage && (
        <div class="rounded-3xl rounded-tl-none justify-start items-center gap-3 inline-flex fixed top-4 right-4 bg-green-500 text-white py-4 px-8 mt-48 z-50">
          <FaRegCircleCheck className="text-white" />
          <h5 class="text-sm font-normal leading-snug">
            Item added to cart successfully!
          </h5>
        </div>
      )}
      {showAlreadyInCartMessage && (
        <div class="rounded-3xl rounded-tl-none justify-start items-center gap-3 inline-flex fixed top-20 right-4 bg-yellow-500 text-white py-4 px-8 mt-48 z-50">
          <FaExclamationTriangle className="text-white" />
          <h5 class="text-sm font-normal leading-snug">
            Item is already in the cart!
          </h5>
        </div>
      )}

      <Notification />
      <div className=" mt-8">
        <div className="p-4 ">
          <div className="flex md:flex-row flex-col justify-center xl:gap-28 lg:gap-2 lg:px-16 ">
            <div className="flex flex-col gap-4 ">
              {" "}
              <div
                className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                onClick={() => handleNavigation("Birth Day")}
              >
                <img
                  src="/images/1703467192.jpg"
                  alt="category image"
                  className="w-72 h-72 md:w-72 md:h-52 lg:h-44 xs:h-40 xxs:w-72"
                />

                <div className={`${styles.onHover}  w-72 h-12`}>
                  <h1>Birth Day Special Cake</h1>
                </div>
              </div>
              {/* <div class="mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300">
                <div
                  className="flex flex-col items-center justify-center bg-black  rounded-lg cursor-pointer"
                  onClick={() => handleNavigation("Birth Day")}
                >
                  <img
                    src="/images/1703467192.jpg"
                    alt="category image"
                    className=""
                  />

                  <div className={`${styles.onHover} `}>
                    <h1>Birth Day Special Cake</h1>
                  </div>
                </div>
              </div> */}
              {/* <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300">
                <div
                  className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                  onClick={() => handleNavigation("Special")}
                >
                  <img
                    src="/images/1697490887.jpg"
                    alt="category image"
                    className="w-full h-72 md:w-72 md:h-52 lg:h-52 xs:h-40 xxs:w-72"
                  />

                  <div className={`${styles.onHover}  xxs:w-72 w-full h-12`}>
                    <h1>Surprise Special Cake</h1>
                  </div>
                </div>
              </div> */}
              <div
                className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                onClick={() => handleNavigation("Speacial")}
              >
                <img
                  src="/images/1697490887.jpg"
                  alt="category image"
                  className="w-72 h-72 md:w-72 md:h-52 lg:h-44 xs:h-40 xxs:w-72"
                />

                <div className={`${styles.onHover}  w-72 h-12`}>
                  <h1>Theme Special Cake</h1>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-clip-border rounded-xl text-gray-700 shadow-md">
              <div className="flex flex-col items-center justify-center rounded-lg cursor-pointer">
                <div className="flex flex-col gap-4 justify-center items-center md:mt-12">
                  {" "}
                  <h3 className="text-2xl text-white text-center">
                    HAPPY TUMMY WITH TASTY SNACKS
                  </h3>
                  <h1 className="text-gray-300">
                    Protect the health of every home
                  </h1>
                  <button
                    onClick={() => handleNavigation("all")}
                    className="group h-10 rounded-lg bg-yellow-400 text-black font-semibold text-sm w-36 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                  >
                    <GiClick className="w-5 h-5" />
                    Click here
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg cursor-pointer mt-12">
                <img
                  src="/images/b2.png"
                  alt="category image"
                  className="w-96 animate-bounce"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <div
                className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                onClick={() => handleNavigation("Anniversary")}
              >
                <img
                  src="/images/1704740695.jpg"
                  alt="category image"
                  className="w-72 h-72 md:w-72 md:h-52 lg:h-44 xs:h-40 xxs:w-72"
                />

                <div className={`${styles.onHover}  w-72 h-12`}>
                  <h1>Anniversary Special Cake</h1>
                </div>
              </div>
              {/* <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300">
                <div
                  className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                  onClick={() => handleNavigation("Anniversary")}
                >
                  <img
                    src="/images/1704740695.jpg"
                    alt="category image"
                    className="w-full h-72 md:w-72 md:h-52 lg:h-52 xs:h-40 xxs:w-72"
                  />

                  <div className={`${styles.onHover}  xxs:w-72 w-full h-12`}>
                    <h1>Anniversary Special Cake</h1>
                  </div>
                </div>
              </div> */}
              <div
                className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                onClick={() => handleNavigation("Celebration")}
              >
                <img
                  src="/images/1704739974.jpg"
                  alt="category image"
                  className="w-72 h-72 md:w-72 md:h-52 lg:h-44 xs:h-40 xxs:w-72"
                />
                <div className={`${styles.onHover}  w-72 h-12 `}>
                  <h1>Celebration Special Cake</h1>
                </div>
              </div>
              {/* <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300">
                <div
                  className="flex flex-col items-center justify-center bg-black w-full  rounded-lg cursor-pointer"
                  onClick={() => handleNavigation("Celebration")}
                >
                  <img
                    src="/images/1704739974.jpg"
                    alt="category image"
                    className="w-full h-72 md:w-72 md:h-52 lg:h-52 xs:h-40 xxs:w-72"
                  />

                  <div className={`${styles.onHover}  xxs:w-72 w-full h-12`}>
                    <h1>Celebration Special Cake</h1>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <ProductsTab />
      <div className="flex md:flex-row flex-col md:ml-4 items-center justify-between md:gap-16 xl:px-28 lg:px-16">
        <ProductSlider addToCartHandler={addToCartHandler} />
        <ProductTopRated addToCartHandler={addToCartHandler} />
        {/* <TopRatedProduct  /> */}
        <ProductLatest addToCartHandler={addToCartHandler} />
      </div>
      <MoreProducts addToCartHandler={addToCartHandler} />

      {/* <Review id="review-section" /> */}
      <AutoSliderReview />
    </>
  );
}
