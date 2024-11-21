// components/SnacksTab.js
import { useRouter } from "next/router";
import { PiShoppingCartFill } from "react-icons/pi";
import { CartContext } from "@/context/CartContext";
import { useEffect, useContext, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

const SnacksTab = () => {
  // const router = useRouter();
  // const handleNavigation = (type) => {
  //   router.push(`/products?type=${type}`);
  // };

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
      iSize: product.fromweightage,
      size: 1,
      quantity: 1,
      description: product.description,
    });
    console.log("ITEMADDED", itemAdded);
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

      <div className="mt-4 lg:px-24">
        <div className="p-4 md:px-28 lg:px-16 rounded mb-2 text-white">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {snacks.map((product, index) => (
              <li
                key={index}
                className="cursor-pointer"
                // onClick={() => handleNavigation(product.name)}
              >
                {/* <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-lg hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                  <img
                    //  src="/images/vanilla/v9.jpg"
                    src={`/images/${product.image}`}
                    alt="food image"
                    className="w-40 hover-zoom md:w-48 lg:w-24"
                    // style="transition: transform 0.2s ease-in-out;"
                  />
                </div> */}
                <div className="flex flex-col gap-8 items-center justify-center  h-56 md:h-40 rounded-lg mb-1 border border-gray-200 bg-stone-100 steal-200 relative group">
                  <img
                    src={`/images/${product.image}`}
                    className="w-32 h-32"
                    alt={product.name}
                  />
                  <div
                    onClick={() => addToCartHandler(product)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <button className="flex flex-row justify-center inset-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                      <PiShoppingCartFill className="w-5 h-5 mr-2" />

                      <p className="inline-block text-sm"> Add to Cart</p>
                    </button>
                  </div>
                </div>
                <div className="">
                  <div className="mb-2">
                    <h4 className="text-2xl">{product.description}</h4>
                    <p className="text-sm text-gray-300">
                      Totally Home Made Food.Fresh,Hygenic and Eggless.
                    </p>
                  </div>

                  <p className="text-yellow-400">
                    Starting @ Rs. {product.fromprice}
                  </p>
                </div>
              </li>
            ))}
            {/* <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Pizza")}
            >
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/vanilla/v9.jpg"
                  alt="food image"
                  className="w-40 hover-zoom md:w-48 lg:w-24"
                  // style="transition: transform 0.2s ease-in-out;"
                />
              </div>

              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Pizza</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Burger")}
            >
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/mango/m4.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>

              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Burger</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Cinnamon")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/butter/b8.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Cinnamon Breads</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Pastaa")}
            >
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/pine/p6.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>

              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Pastaa</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li> */}
            {/* <li className="cursor-pointer" onClick={() => handleNavigation("vanilla")}>
                {" "}
                <a href="{{ route('items.byType', ['type' => 'strawBerryItems']) }}">
                  <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                    <img
                      src="/images/straw/sb17.jpg"
                      alt="food image"
                      className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                    />
                  </div>
    
                  <div className="pt-5">
                    <div className="mb-2">
                      <h4 className="text-2xl">Strawberry</h4>
                      <p className="text-sm text-gray-300">
                        Totally Home Made Food.Fresh,Hygenic and Eggless.
                      </p>
                    </div>
    
                    <p className="text-yellow-400">Starting @ Rs. 200</p>
                  </div>
                </a>
              </li>
              <li className="cursor-pointer" onClick={() => handleNavigation("vanilla")}>
                {" "}
                <a href="{{ route('items.byType', ['type' => 'chocolateItems']) }}">
                  <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                    <img
                      src="/images/choco/ch17.jpg"
                      alt="food image"
                      className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                    />
                  </div>
    
                  <div className="pt-5">
                    <div className="mb-2">
                      <h4 className="text-2xl">Chocolate</h4>
                      <p className="text-sm text-gray-300">
                        Totally Home Made Food.Fresh,Hygenic and Eggless.
                      </p>
                    </div>
    
                    <p className="text-yellow-400">Starting @ Rs. 200</p>
                  </div>
                </a>
              </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SnacksTab;
