import { useState, useContext } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import MoreProducts from "@/components/slider/moreProducts";
import MoreFlavoured from "@/components/slider/moreFlavoured";
import Snacks from "@/components/slider/snacks";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineFullscreen } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import AutoSliderSnacks from "@/components/slider/autoSliderSnacks";
import AutoSliderFlavoured from "@/components/slider/autoSliderFlavoured";
// import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const Products = ({ products, type, results, searchTerm }) => {
  const [sortType, setSortType] = useState("price-asc");
  const [filterWeight, setFilterWeight] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [modalImage, setModalImage] = useState(null);
  console.log("Filtered", results);
  let parsedResults = [];
  if (results) {
    try {
      parsedResults = JSON.parse(results);
    } catch (error) {
      console.error("Error parsing results:", error);
    }
  }
  // console.log("searchTerm", searchTerm);
  const productsList = products.length > 1 ? products : parsedResults;
  const sortedFilteredProducts = productsList
    .filter((product) =>
      filterWeight ? product.fromweightage === filterWeight : true
    )
    .filter((product) => Number(product.fromprice) <= maxPrice)
    .sort((a, b) => {
      if (sortType === "price-asc") {
        return Number(a.fromprice) - Number(b.fromprice);
      } else if (sortType === "price-desc") {
        return Number(b.fromprice) - Number(a.fromprice);
      }
      return 0;
    });

  const router = useRouter();

  const handleViewProductDetails = (type, id) => {
    console.log("TYPWEEE", type);
    router.push(`/productDetails?type=${type}&id=${id}`);
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

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
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

      <div className="px-4 text-white xss:mt-56 xxss:mt-56 xs:mt-56 lg:mt-56 lg:px-32">
        <div className="flex flex-row gap-8 text-gray-300">
          {sortedFilteredProducts.length > 0 ? (
            <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center">
              <h2 className="md:text-3xl text-2xl text-white">
                {" "}
                {[
                  "Doremon",
                  "Mickey Mouse",
                  "Tiger Effect",
                  "Surprise",
                  "Barbie Doll",
                  "Fault Line",
                  "Red Velvet",
                  "Black Forest",

                  "Anniversary",
                  "Celebration",
                  "Birth Day",
                ].includes(sortedFilteredProducts[0].name)
                  ? `${sortedFilteredProducts[0].name} Cakes`
                  : [
                      "Vanilla",
                      "Mango",
                      "Strawberry",
                      "Chocolate",
                      "Pine Apple",
                      "Rosmalai",
                      "Butter Scotch",
                    ].includes(sortedFilteredProducts[0].name)
                  ? `${sortedFilteredProducts[0].name} Flavoured Cakes`
                  : [
                      "Chicken Tikka Pizza",
                      "Chicken Pizza",
                      "Chicken Burger",
                    ].includes(sortedFilteredProducts[0].name)
                  ? "Chicken Pizza & Burger"
                  : [
                      "Veg Corn Pizza",
                      "Veg Overload Pizza",
                      "Veg Burger",
                    ].includes(sortedFilteredProducts[0].name)
                  ? "Veg Pizza & Burger"
                  : [
                      "Pizza BBQ",
                      "Cheesy Burst Pizza",
                      "Panneer Pizza",
                      "Pizza",
                      "Panneer Burger",
                    ].includes(sortedFilteredProducts[0].name)
                  ? "Pizza"
                  : ["Burger"].includes(sortedFilteredProducts[0].name)
                  ? "Burger"
                  : [
                      "Chicken Pizza",
                      "Chicken Tikka",
                      "Chicken Burger",
                    ].includes(sortedFilteredProducts[0].name)
                  ? "Chicken Pizza & Burger"
                  : ["Veg Pizza", "Veg Burger"].includes(
                      sortedFilteredProducts[0].name
                    )
                  ? "Veg Pizza & Burger"
                  : ["Breads & Pastries"].includes(
                      sortedFilteredProducts[0].name
                    )
                  ? "Breads & Pastries"
                  : null}
              </h2>
              <div className="w-32 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
              {[
                ,
                "Doremon",
                "Mickey Mouse",
                "Tiger Effect",
                "Surprise",
                "Barbie Doll",
                "Fault Line",
                "Red Velvet",
                "Black Forest",
                "Anniversary",
                "Celebration",
                "Birth Day",
              ].includes(sortedFilteredProducts[0].name) ? (
                <p className="paragraph text-sm">
                  Choose your favourite cake from the list and enjoy your baked
                  gooddies (Red Velvet, Black Forest, Fruit Cake, Mickey Mouse,
                  Doremon , White Forest, Babie Doll, Rosmalai and much more!!)
                </p>
              ) : [
                  "Pine Apple",
                  "Rosmalai",
                  "Butter Scotch",
                  "Vanilla",
                  "Mango",
                  "Strawberry",
                  "Chocolate",
                ].includes(sortedFilteredProducts[0].name) ? (
                <p className="paragraph text-sm">
                  Choose your favourite flavour from the list and enjoy your
                  baked gooddies (Pine Apple,Rosmalai,Butter
                  Scotch,Vanilla,Mango,Strawberry,Chocolate and much more!!)
                </p>
              ) : ["Breads & Pastries"].includes(
                  sortedFilteredProducts[0].name
                ) ? (
                <p className="paragraph text-sm">
                  Choose your favourite baked from the list and enjoy your baked
                  gooddies (Cinnamon Breads,Stuffed Bone,Zingy Parcel,Tutifruti
                  Bread,Focasia Bread and much more!!)
                </p>
              ) : [
                  "Pizza BBQ",
                  "Veg Corn Pizza",
                  "Veg Overload Pizza",
                  "Chicken Tikka Pizza",
                  "Cheesy Burst Pizza",
                  "Chicken Pizza",
                  "Panneer Pizza",
                  "Pizza",
                ].includes(sortedFilteredProducts[0].name) ? (
                <p className="paragraph text-sm">
                  Choose your favourite pizza from the list and enjoy your baked
                  gooddies (Veg Corn Pizza,Pizza BBQ,Veg Overload Pizza,Chicken
                  Tikka Pizza,Cheesy Burst Pizza,Chiken Pizza,Panneer Pizza and
                  much more!!)
                </p>
              ) : [
                  "Chicken Burger",
                  "Veg Burger",
                  "Panneer Burger",
                  "Burger",
                ].includes(sortedFilteredProducts[0].name) ? (
                <p className="paragraph text-sm">
                  Choose your favourite burger from the list and enjoy your
                  baked gooddies (Veg Burger,Chicken Burger,Panneer Burger and
                  much more!!)
                </p>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center"></div>
          )}
        </div>
        {sortedFilteredProducts.length > 0 ? (
          <div className="flex flex-col lg:flex-col lg:gap-10 items-center mt-8">
            {/* Filters Section */}
            <div className="flex lg:flex-row flex-col lg:w-full lg:mb-0 mb-4 lg:gap-10">
              <div className="mt-4">
                <label htmlFor="sort" className="mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="border w-full lg:w-52 xl:w-full rounded px-2 py-2 text-black"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <div className="flex flex-col items-center mt-6 md:mt-7 lg:mt-2 xl:mt-6">
                <div>{maxPrice}</div>
                <div className="mb-4 flex flex-row gap-2">
                  <label
                    htmlFor="priceRange"
                    className="text-xs lg:text-base lg:mt-0 mt-1"
                  >
                    Price Range:
                  </label>
                  <input
                    type="range"
                    id="price-range"
                    className="md:w-72 w-48 accent-yellow-400"
                    min="0"
                    max="5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                  <label htmlFor="priceRange" className="mt-1 lg:mt-3 xl:mt-1">
                    5000
                  </label>
                </div>
              </div>
              {[
                "Pine Apple",
                "Rosmalai",
                "Butter Scotch",
                "Doremon",
                "Mickey Mouse",
                "Tiger Effect",
                "Surprise",
                "Barbie Doll",
                "Fault Line",
                "Red Velvet",
                "Black Forest",
                "Vanilla",
                "Mango",
                "Strawberry",
                "Chocolate",
                "Anniversary",
                "Celebration",
                "Birth Day",
              ].includes(sortedFilteredProducts[0].name) ? (
                <div className="mt-4">
                  <label htmlFor="filter" className="mr-2">
                    Filter by weight:
                  </label>
                  <select
                    id="filter"
                    value={filterWeight}
                    onChange={(e) => setFilterWeight(e.target.value)}
                    className="border w-full lg:w-52 xl:w-full rounded px-2 py-2 text-black"
                  >
                    <option value="">All</option>
                    <option value="1 Pound">1 Pound</option>
                    <option value="2 Pound">2 Pound</option>
                  </select>
                </div>
              ) : null}
            </div>

            {/* Products Section */}

            <div className="md:w-full xs:w-72 lg:w-full md:ml-0 mt-8 ">
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedFilteredProducts.map((product) => (
                  <div className="relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-all hover:shadow-2xl hover:scale-105 duration-500">
                    {/* Image Section */}
                    <div className="relative group">
                      <img
                        src={`/images/${product.image}`}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-all duration-500 transform group-hover:scale-110"
                      />
                      {/* Hover Overlay for Buttons */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <button
                          onClick={() => addToCartHandler(product)}
                          className="group h-10 bg-yellow-400 text-black font-semibold text-xs md:w-full w-full mt-1 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                        >
                          <PiShoppingCartFill className="w-6 h-5" />
                          Add to cart
                        </button>
                        <button
                          onClick={() =>
                            handleViewProductDetails(product.name, product.id)
                          }
                          className="group h-10 bg-yellow-400 text-black font-semibold text-xs md:w-full w-full mt-1 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                        >
                          <FaEye className="w-5 h-5" />
                          <p className="inline-block text-xs mt-.5">
                            View Details
                          </p>
                        </button>
                      </div>
                      <button
                        onClick={() => openModal(`/images/${product.image}`)}
                        className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                      >
                        <MdOutlineFullscreen className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Information */}
                    <div className="p-2">
                      <h3 className="text-base font-semibold text-white">
                        {product.description}
                      </h3>
                      <p className="text-white text-sm mt-1">
                        {/* {product.name === "Pizza" || product.name === "Cinnamon"
                          ? `Quantity: ${product.fromsize}`
                          : product.name === "Burger"
                          ? `Quantity: 1 Piece`
                          : [
                              "Pine Apple",
                              "Rosmalai",
                              "Butter Scotch",
                              "Doremon",
                              "Mickey Mouse",
                              "Tiger Effect",
                              "Surprise",
                              "Barbie Doll",
                              "Fault Line",
                              "Red Velvet",
                              "Black Forest",
                              "Vanilla",
                              "Mango",
                              "Strawberry",
                              "Birth Day",
                              "Chocolate",
                              "Anniversary",
                              "Celebration",
                            ].includes(product.name)
                          ? `Weightage: ${product.fromweightage}`
                          : null} */}
                        Weightage: {product.fromweightage}{" "}
                        {[
                          "Pine Apple",
                          "Rosmalai",
                          "Butter Scotch",
                          "Doremon",
                          "Mickey Mouse",
                          "Tiger Effect",
                          "Surprise",
                          "Barbie Doll",
                          "Fault Line",
                          "Red Velvet",
                          "Black Forest",
                          "Vanilla",
                          "Mango",
                          "Strawberry",
                          "Chocolate",
                          "Anniversary",
                          "Celebration",
                          "Birth Day",
                        ].includes(sortedFilteredProducts[0].name)
                          ? "pound"
                          : null}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex flex-row justify-between">
                        {" "}
                        <p className="text-white text-sm mt-1">Quantity: 1</p>
                        <p className="text-white text-base font-bold mt-1">
                          Rs. {product.fromprice}
                        </p>
                      </div>
                    </div>
                  </div>

                  // <li
                  //   className="relative border border-white  h-full rounded-sm"
                  //   key={product.id}
                  // >
                  //   <div className="relative group">
                  //     <div className="grid place-items-center border rounded-sm hover:bg-yellow-400 ease-linear duration-200">
                  //       <img
                  //         src={`/images/${product.image}`}
                  //         alt="food image"
                  //         className="xs:w-72 md:w-full lg:w-full xl:w-full h-64 rounded-t-lg"
                  //       />
                  //     </div>

                  //     {/* Overlay */}
                  //     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  //       {/* <button className="flex flex-row gap-1 mb-2 bg-yellow-400 text-black rounded-lg py-3 px-5">
                  //       <IoBagHandle className="w-5 h-5" />
                  //       <p className="inline-block text-sm mt-.5">
                  //         Add to Cart
                  //       </p>
                  //     </button> */}
                  //       <button
                  //         onClick={() => addToCartHandler(product)}
                  //         className="group h-10 bg-yellow-400 text-black font-semibold text-xs md:w-full w-full mt-1 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                  //       >
                  //         <PiShoppingCartFill className="w-6 h-5" />
                  //         Add to cart
                  //       </button>
                  //       <button
                  //         onClick={() =>
                  //           handleViewProductDetails(product.name, product.id)
                  //         }
                  //         className="group h-10 bg-yellow-400 text-black font-semibold text-xs md:w-full w-full mt-1 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                  //       >
                  //         <FaEye className="w-5 h-5" />
                  //         <p className="inline-block text-xs mt-.5">
                  //           View Details
                  //         </p>
                  //       </button>
                  //     </div>
                  //     <button
                  //       onClick={() => openModal(`/images/${product.image}`)}
                  //       className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                  //     >
                  //       <MdOutlineFullscreen className="w-5 h-5" />
                  //     </button>
                  //   </div>

                  //   <div className="flex  flex-col h-14 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
                  //     <div className="flex flex-row justify-between">
                  //       <h4 className="text-base ml-2 mt-1">{product.name}</h4>
                  //       <h4 className="text-base mr-2 mt-1">
                  //         Rs. {product.fromprice}
                  //       </h4>
                  //     </div>
                  //     <div className="flex flex-row items-center mt-1 justify-between ml-2 mr-2">
                  //       <p className="text-sm text-white">
                  //         {" "}
                  //         {product.name === "Pizza" ||
                  //         product.name === "Cinnamon"
                  //           ? `Quantity: ${product.fromsize}`
                  //           : product.name === "Burger"
                  //           ? `Quantity: 1 Piece`
                  //           : [
                  //               "Pine Apple",
                  //               "Rosmalai",
                  //               "Butter Scotch",
                  //               "Doremon",
                  //               "Mickey Mouse",
                  //               "Tiger Effect",
                  //               "Surprise",
                  //               "Barbie Doll",
                  //               "Fault Line",
                  //               "Red Velvet",
                  //               "Black Forest",
                  //               "Vanilla",
                  //               "Mango",
                  //               "Strawberry",
                  //               "Birth Day",
                  //               "Chocolate",
                  //               "Anniversary",
                  //               "Celebration",
                  //             ].includes(product.name)
                  //           ? `Weightage: ${product.fromweightage}`
                  //           : null}
                  //       </p>
                  //       <p className="text-sm text-white">
                  //         {[
                  //           "Pine Apple",
                  //           "Rosmalai",
                  //           "Butter Scotch",
                  //           "Doremon",
                  //           "Mickey Mouse",
                  //           "Tiger Effect",
                  //           "Surprise",
                  //           "Barbie Doll",
                  //           "Fault Line",
                  //           "Red Velvet",
                  //           "Black Forest",
                  //           "Vanilla",
                  //           "Mango",
                  //           "Strawberry",
                  //           "Birth Day",
                  //           "Chocolate",
                  //           "Anniversary",
                  //           "Celebration",
                  //         ].includes(product.name)
                  //           ? `Quantity: 1`
                  //           : null}
                  //       </p>

                  //       {/* <p className="text-sm text-white">
                  //         Price: Rs {product.fromprice}
                  //       </p> */}
                  //     </div>
                  //   </div>
                  // </li>
                  // <div className="rounded overflow-hidden bg-gray-800 shadow-lg">
                  //   <div className="px-6 py-4">
                  //     <img
                  //       src={`/images/${product.image}`}
                  //       alt="food image"
                  //       className="xs:w-72 md:w-full lg:w-full xl:w-full h-52 rounded-t-lg"
                  //     />
                  //     <p className="text-white text-sm mt-1 mb-1">
                  //       <h1>Title: {product.name}</h1>
                  //     </p>
                  //     <div className="flex flex-row justify-between">
                  //       {" "}
                  //       <p className="text-white text-sm mt-1 mb-1">
                  //         <h1>Price: {product.fromprice}</h1>
                  //       </p>
                  //       <p className="text-white text-sm mt-1 mb-1">
                  //         <h1>Weightage: {product.fromweightage}</h1>
                  //       </p>
                  //     </div>
                  //     <p className="text-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 cursor-pointer hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  //       See details
                  //     </p>
                  //     <p className="text-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 cursor-pointer hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  //       Add to Cart
                  //     </p>
                  //   </div>
                  //   <button
                  //     onClick={() => openModal(`/images/${product.image}`)}
                  //     className="absolute top-2 right-2 p-2 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                  //   >
                  //     <MdOutlineFullscreen className="w-5 h-5" />
                  //   </button>
                  // </div>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center mb-32">
            <h2 className="md:text-3xl text-2xl text-white">
              No Product Found
            </h2>
            <h2 className="md:text-sm text-xs text-white">
              Please search by product (ex. Vanilla, Doremon,Butter
              Scotch,Barbie Doll, Breads, Pizza, Burger etc.)
            </h2>
          </div>
        )}
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
      </div>

      {/* <MoreFlavoured /> */}
      <AutoSliderFlavoured />
      <MoreProducts addToCartHandler={addToCartHandler} />
      {/* <Snacks addToCartHandler={addToCartHandler} /> */}
      <AutoSliderSnacks addToCartHandler={addToCartHandler} />
    </>
  );
};

export default Products;
