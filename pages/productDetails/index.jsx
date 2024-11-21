import { useRouter } from "next/router";
import { FaBagShopping } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { SiCodefresh } from "react-icons/si";
import { BsDropletFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import AddMore from "@/components/slider/addMore";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { PrismaClient } from "@prisma/client";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

export default function CheckoutForm({ productDetails }) {
  const router = useRouter();
  // const [flavor, setFlavor] = useState("default");
  // const [weightage, setWeightage] = useState("1");
  // const [sessionMessage, setSessionMessage] = useState(null);
  const price = Number(productDetails.fromprice);
  const weight = Number(productDetails.fromweight);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(1);
  const basePrice = price;
  const pricePerPound = 200;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSizeChange = (e) => {
    setSize(Number(e.target.getAttribute("data-size")));
  };

  const calculatePrice = () => {
    return basePrice + (size - 1) * pricePerPound;
  };
  const productDetailsImage = productDetails.image;
  const productDetailsName = productDetails.name;
  const productDetailsSize = productDetails.fromweightage;
  const productDetailsDesc = productDetails.description;
  console.log(productDetailsName);

  const handleBuyNow = () => {
    const productDetails = {
      productDetailsName,
      productDetailsImage, // Replace with actual image URL
      quantity, // Use your state variable here
      size, // Use your state variable hereproductDetailsName
      productDetailsSize,
      productDetailsDesc,
      price: calculatePrice() * quantity, // Use your calculation logic
    };

    router.push({
      pathname: "/checkout/checkout",
      query: productDetails,
    });
  };

  const { addItemToCart } = useContext(CartContext);
  // const addToCartHandlerSingle = (productDetails) => {
  //   addItemToCart({
  //     productDetails: productDetails.id,
  //     name: productDetails.name,
  //     price: productDetails.fromprice,
  //     image: `/images/${productDetails.image}`,
  //     size: 1,
  //     quantity: 1,
  //   });
  //   setShowSuccessMessage(true);

  //   // Hide the message after 3 seconds
  //   setTimeout(() => {
  //     setShowSuccessMessage(false);
  //   }, 6000);
  // };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAlreadyInCartMessage, setShowAlreadyInCartMessage] =
    useState(false);
  const addToCartHandlerSingle = (productDetails) => {
    const itemAdded = addItemToCart({
      productDetails: productDetails.id,
      name: productDetails.name,
      price: productDetails.fromprice,
      image: `/images/${productDetails.image}`,
      size: 1,
      quantity: 1,
      description: productDetails.description,
      iSize: productDetails.fromweightage,
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
  const addToCartHandler = (product) => {
    const itemAdded = addItemToCart({
      product: product.id,
      name: product.name,
      price: product.fromprice,
      image: `/images/${product.image}`,
      size: 1,
      description: product.description,
      iSize: product.fromweightage,
      quantity: 1,
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
      <section className="relative md:px-16 mt-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
            <div className="img">
              <div className="flex flex-col gap-8">
                <div className="flex md:flex-row flex-col gap-8 h-96">
                  <div className="border border-lg h-24 md:w-24 w-24 rounded-lg">
                    {" "}
                    <img
                      className="h-24 md:w-24 w-24 cursor-pointer rounded-lg border border-lg"
                      src={`/images/${productDetails.image}`}
                      alt=""
                      onclick="openModal()"
                    />
                  </div>
                  <div className="h-96 md:w-96 w-full">
                    {" "}
                    <img
                      className="h-64 lg:h-96 xl:h-96 md:w-96 w-full border border-lg cursor-pointer rounded-lg"
                      src={`/images/${productDetails.image}`}
                      alt=""
                      onclick="openModal()"
                    />
                  </div>
                </div>
                <div>
                  {" "}
                  <AddMore addToCartHandler={addToCartHandler} />
                </div>
              </div>
            </div>
            <div className="data w-full lg:pr-8 pr-0 xl:justify-start md:mt-0 lg:mt-0 mt-32 justify-center flex items-center ">
              <div className="data w-full max-w-xl">
                <p className="text-lg font-medium leading-8 text-gray-300 mb-4">
                  Cakes&nbsp; /&nbsp; {productDetails.name}
                </p>
                <h2 className="font-manrope font-bold text-3xl leading-10 text-white mb-2 capitalize">
                  {productDetails.description}
                  {productDetails.iSize}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-300 pr-5 sm:border-r border-gray-300 mr-5">
                    Rs. {calculatePrice() * quantity}
                  </h6>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                    </div>
                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm mt-1">
                      1624 review
                    </span>
                  </div>
                </div>
                <ul className="grid gap-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <BsDropletFill className="text-yellow-400" />

                    <span className="font-normal text-base text-gray-300 ">
                      Fresh
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <SiCodefresh className="text-yellow-400" />
                    <span className="font-normal text-base text-gray-300 ">
                      Organic
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <GiForkKnifeSpoon className="text-yellow-400" />
                    <span className="font-normal text-base text-gray-300 ">
                      Delicious
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <TbTruckDelivery className="text-yellow-400" />
                    <span className="font-normal text-base text-gray-300 ">
                      Home Delivery
                    </span>
                  </li>
                </ul>
                <p className="text-gray-300 text-lg leading-8 font-medium mb-4">
                  Quantity
                </p>
                <div className="flex sm:items-center w-full">
                  <button
                    className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="font-semibold text-gray-300 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-300 text-center"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>

                <p className="text-gray-300 text-lg leading-8 font-medium mt-4 mb-4">
                  Size (in pounds)
                </p>
                <div className="flex flex-col gap-8 w-full pb-8 border-b border-gray-100 flex-wrap">
                  <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                    {[1, 2, 3, 4, 5].map((sizeValue) => (
                      <button
                        key={sizeValue}
                        data-size={sizeValue}
                        onClick={handleSizeChange}
                        className={`text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 ${
                          size === sizeValue
                            ? "bg-[#020617] hover:text-white border hover:border-gray-100] text-white border-gray-300"
                            : "bg-white text-black hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300"
                        }`}
                      >
                        {sizeValue}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row mt-4 gap-2">
                  <button
                    onClick={() => addToCartHandlerSingle(productDetails)}
                    className="group h-12 rounded-lg bg-yellow-400 text-black font-semibold text-sm w-52 md:w-44 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                  >
                    <PiShoppingCartFill className="w-5 h-5" />
                    Add to cart
                  </button>
                  <div className="flex items-center ">
                    <button
                      onClick={handleBuyNow}
                      className="text-center w-32 md:w-44 h-12 rounded-lg bg-yellow-400 flex items-center justify-center font-semibold text-sm text-black shadow-sm transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                    >
                      <AiOutlineShopping className="h-5 w-5 mr-3" /> Buy Now
                    </button>
                  </div>
                </div>
                <ul className="mt-8 space-y-2">
                  <li className="flex items-center text-left text-sm font-medium text-white">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        className="text-white"
                      ></path>
                    </svg>
                    Free shipping
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 px-8">
          <div className="border-b border-gray-300">
            <nav className="flex gap-4">
              <a
                href="#"
                title=""
                className="border-b-2 border-white py-4 text-sm font-medium text-white hover:border-gray-400 hover:text-gray-800"
              >
                Description{" "}
              </a>
            </nav>
          </div>

          <div className="mt-8 flow-root sm:mt-12 text-gray-200 font-oswald">
            <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
            <p className="mt-4">
              Effortless Delivery Services at your doorsteps. Experience
              Reliable delivery Right at Your Doorstep!{" "}
            </p>
            <h1 className="mt-8 text-3xl font-bold">
              Fresh & delicious cakes home delivered in just 5 hours
            </h1>
            <p className="mt-4">
              "Dream Cake" cakes come to rescue when you are looking for special
              cakes for your beloveds. .
            </p>
            <p className="mt-4">
              Now you can order cake online with Dream Cake anytime and give us
              the privilege to shower the sweetness of baked goodies for your
              loved ones
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const { type, id } = context.query;
  console.log("typeeeeee", type);
  console.log("id", id);

  let productDetails = null;

  try {
    if (type === "Vanilla") {
      productDetails = await prisma.vanillas.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Mango") {
      productDetails = await prisma.mangos.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Butter Scotch") {
      productDetails = await prisma.butter.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Pine Apple") {
      productDetails = await prisma.pines.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Strawberry") {
      productDetails = await prisma.straws.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Chocolate") {
      productDetails = await prisma.chocos.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Pizza BBQ") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Veg Corn Pizza") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Veg Overload Pizza") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Panneer Pizza") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Chicken Tikka") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Cheesy Buarst") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Chicken Pizza") {
      productDetails = await prisma.pizzaItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Pastaa") {
      productDetails = await prisma.chocos.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Burger") {
      productDetails = await prisma.burgerItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Chicken Burger") {
      productDetails = await prisma.burgerItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Panneer Burger") {
      productDetails = await prisma.burgerItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Veg Burger") {
      productDetails = await prisma.burgerItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Breads ") {
      productDetails = await prisma.breadItems.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Rosmalai") {
      productDetails = await prisma.malais.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Tiger Effect") {
      productDetails = await prisma.tigers.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Doremon") {
      productDetails = await prisma.doremons.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Mickey Mouse") {
      productDetails = await prisma.mickies.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Surprise") {
      productDetails = await prisma.surprises.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "barbies") {
      productDetails = await prisma.barbies.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Fault Line") {
      productDetails = await prisma.lines.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Red Velvet") {
      productDetails = await prisma.reds.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Black Forest") {
      productDetails = await prisma.blacks.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Barbie Doll") {
      productDetails = await prisma.barbies.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Birth Day") {
      productDetails = await prisma.births.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Celebration") {
      productDetails = await prisma.celebrations.findUnique({
        where: { id: Number(id) },
      });
    } else if (type === "Anniversary") {
      productDetails = await prisma.annivers.findUnique({
        where: { id: Number(id) },
      });
    }

    if (!productDetails) {
      return {
        notFound: true, // Handle case where no product is found
      };
    }

    productDetails = {
      ...productDetails,
      id: productDetails.id.toString(), // Convert `bigint` to `string`
      fromprice: productDetails.fromprice.toString(), // Convert `Decimal` to `string`
      toprice: productDetails.toprice?.toString() || null, // Handle optional values and convert `Decimal` to `string`
      created_at: productDetails.created_at
        ? productDetails.created_at.toISOString()
        : null, // Convert `Date` to ISO string
      updated_at: productDetails.updated_at
        ? productDetails.updated_at.toISOString()
        : null, // Convert `Date` to ISO string
    };

    console.log("Result", productDetails);

    return {
      props: {
        productDetails,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      notFound: true, // Handle unexpected errors
    };
  }
}
