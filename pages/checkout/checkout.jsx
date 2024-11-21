import { React, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import CartContext from "@/context/CartContext";
import { AiOutlineShopping } from "react-icons/ai";
import { PiShoppingCartFill } from "react-icons/pi";
import { useForm } from "react-hook-form";

const checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const {
    productDetailsImage,
    productDetailsName,
    quantity,
    size,
    price,
    productDetailsSize,
    productDetailsDesc,
  } = router.query;
  const { cart, deleteItemFromCart } = useContext(CartContext); // Get cart items from context
  // console.log("CARTITEMS", cart);
  // console.log("Desc", description);
  // console.log("Size", iSize);
  const [checkoutItems, setCheckoutItems] = useState([]);
  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCheckoutItems(JSON.parse(storedCart));
    }
  }, []);
  useEffect(() => {
    if (productDetailsName) {
      // If navigating from ProductDetails, set checkoutItems to the single product
      setCheckoutItems([
        {
          image: `/images/${productDetailsImage}`,
          name: productDetailsName,
          quantity: parseInt(quantity),
          size: parseInt(size),
          price: parseInt(price),
          description: productDetailsDesc,
          iSize: productDetailsSize,
        },
      ]);
    } else if (cart.length > 0) {
      // If navigating from the Cart page, set checkoutItems to cart items
      setCheckoutItems(cart);
    }
  }, [cart, productDetailsName]);

  if (checkoutItems.length === 0) {
    return (
      <p>
        No products to checkout. Please add a product to the cart or select one
        to buy.
      </p>
    );
  }
  const shippingCharge = 20;
  const calculateSubtotal = () => {
    return checkoutItems.reduce((acc, product) => {
      let productTotal;

      if (checkoutItems.length > 1) {
        // Only return the base price if more than one item is present

        productTotal =
          (Number(product.price) + 200 * ((product.size || 1) - 1)) *
          product.quantity;
      } else {
        // Calculate full price with size and quantity adjustments
        productTotal = Number(product.price);
      }

      return acc + productTotal;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalPrice = subtotal + shippingCharge;

  const totalQuantity = checkoutItems.reduce((acc, product) => {
    return acc + Number(product.quantity);
  }, 0);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch("/api/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: data,
        items: checkoutItems,
        subtotal: subtotal,
        total: totalPrice,
      }),
    });

    if (response.ok) {
      router.push({
        pathname: "/orderConfirmation/thankYou",
        query: {
          customer: JSON.stringify(data),
          items: JSON.stringify(checkoutItems),
          subtotal: subtotal,
          total: totalPrice,
        },
      });
    } else {
      console.error("Checkout failed.");
    }
  };

  return (
    <>
      <div className="mt-28">
        <h1 className="flex items-center justify-center font-bold text-yellow-300 text-md lg:text-3xl  border-b-2 border-yellow-400">
          Checkout
        </h1>
      </div>
      <div className="container p-4 mx-auto text-white">
        <div className="flex flex-col w-full px-0  md:flex-row md:gap-16">
          <div className="flex flex-col md:w-1/2">
            <div className="flex  text-center">
              <h1 className="text-lg font-bold text-white border-b-2 border-white inline-block">
                Shipping Address
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 justify-center w-full mx-auto"
            >
              <div className="">
                <div className="w-full">
                  <label
                    for="fullName"
                    className="block mb-3 text-sm font-semibold text-white"
                  >
                    Full Name
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
                  <div className="w-full lg:w-1/2 ">
                    <label
                      for="email"
                      className="block mb-3 text-sm font-semibold text-white"
                    >
                      Email (Optional)
                    </label>
                    <input
                      {...register("email")}
                      type="text"
                      placeholder="E-mail (Optional)"
                      className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      for="mobile"
                      className="block mb-3 text-sm font-semibold text-white"
                    >
                      Mobile No.
                    </label>
                    <input
                      {...register("mobile", {
                        required: "Mobile No is required",
                      })}
                      type="text"
                      placeholder="Mobile No"
                      className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full">
                    <label
                      for="Address"
                      className="block mb-3 text-sm font-semibold text-white"
                    >
                      Address
                    </label>
                    <textarea
                      {...register("address", {
                        required: "Address is required",
                      })}
                      placeholder="Address"
                      className="w-full px-4 py-3 text-xs border border-gray-300 text-black rounded"
                      rows="4"
                    ></textarea>
                    {errors.address && (
                      <p className="text-red-500 text-sm">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      for="landMark"
                      className="block mb-3 text-sm font-semibold text-white"
                    >
                      Land Mark
                    </label>
                    <input
                      {...register("landMark", {
                        required: "Land Mark is required",
                      })}
                      type="text"
                      placeholder="Land Mark"
                      className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
                    />
                    {errors.landMark && (
                      <p className="text-red-500 text-sm">
                        {errors.landMark.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      for="city"
                      className="block mb-3 text-sm font-semibold text-white"
                    >
                      City
                    </label>
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      value="Suri"
                      className="text-black w-full px-4 py-3 text-sm border border-gray-300 rounded"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      for="postcode"
                      className="block mb-3 text-sm font-semibold text-white"
                    >
                      Pin Code
                    </label>
                    <input
                      {...register("pinCode", {
                        required: "Pin Code is required",
                      })}
                      type="text"
                      value="731101"
                      className="text-black w-full px-4 py-3 text-sm border border-gray-300 rounded"
                    />
                    {errors.pinCode && (
                      <p className="text-red-500 text-sm">
                        {errors.pinCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="text-center w-full md:w-48 h-12 rounded-lg bg-yellow-400 flex items-center justify-center font-semibold text-sm text-black shadow-sm transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                >
                  <AiOutlineShopping className="h-5 w-5 mr-3" />{" "}
                  <p className="mt-1">Place Order</p>
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <div className="flex  text-center">
                <h1 className="text-lg font-bold text-white border-b-2 border-white inline-block">
                  Order Preview
                </h1>
              </div>
              <div className="flex  mt-8">
                <p className="text-xl font-bold">
                  Total Products:{" "}
                  <span className="text-yellow-300">{totalQuantity}</span>
                </p>
              </div>
              {checkoutItems.map((product, index) => (
                <div className="mt-8" key={index}>
                  <div className="flex flex-col space-y-4 text-white">
                    <div className="flex space-x-4">
                      <div className="mt-1">
                        <img
                          src={
                            product.image
                              ? `${product.image}`
                              : "/images/default.jpg"
                          }
                          className="w-32 h-28 border border-white"
                          alt={product.name}
                        />
                      </div>
                      <div className="w-64">
                        <h2 className="text-xl font-bold">
                          {product.description}
                        </h2>
                        <p>
                          {
                            ("Breads & Pastries",
                            "Veg Burger",
                            "Chicken Burger",
                            "Panneer Burger",
                            "Pizza BBQ",
                            "Veg Corn Pizza",
                            "Veg Overload Pizza",
                            "Chicken Tikka Pizza",
                            "Cheesy Burst Pizza",
                            "Chicken Pizza",
                            "Panneer Pizza",
                            "Chicken Burger",
                            "Veg Burger",
                            "Panneer Burger" || product.name === "Pastaa"
                              ? `Size: ${product.iSize}`
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
                              ? `Weightage: ${product.size} Pound`
                              : null)
                          }{" "}
                          {/* Weightage:{" "}
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
                          ].includes(product.name) ? (
                            <span className="text-yellow-300">
                              {product.size}
                            </span>
                          ) : ["Panneer Pizza", "Pizza"].includes(
                              product.name
                            ) ? (
                            <span className="text-yellow-300">1 Piece</span>
                          ) : ["Burger"].includes(product.name) ? (
                            <span className="text-yellow-300">1 Piece</span>
                          ) : ["Cinnamon"].includes(product.name) ? (
                            <span className="text-yellow-300">7 Piece</span>
                          ) : ["Stuffed"].includes(product.name) ? (
                            <span className="text-yellow-300">6 Piece</span>
                          ) : ["Zengy"].includes(product.name) ? (
                            <span className="text-yellow-300">6 Piece</span>
                          ) : ["Tutifruti"].includes(product.name) ? (
                            <span className="text-yellow-300">4 Piece</span>
                          ) : null} */}
                        </p>
                        <p>
                          Quantity:{" "}
                          <span className="text-yellow-300">
                            {product.quantity}
                          </span>
                        </p>
                        <p>
                          Price:{" "}
                          <span className="text-yellow-300">
                            {
                              checkoutItems.length > 1
                                ? (
                                    (Number(product.price) +
                                      200 * ((product.size || 1) - 1)) *
                                    product.quantity
                                  ).toFixed(2) // Only show the base price if more than 1 item
                                : Number(product.price).toFixed(2) // Calculate full price with size and quantity adjustments
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <dl className="mt-6 space-y-4 ">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-white">Subtotal</dt>
                <dd
                  id="subtotalDisplay"
                  className="text-sm font-medium text-white"
                >
                  Rs. {subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-white">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-white hover:text-white"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>

                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </dt>
                <dd className="text-sm font-medium text-white">
                  Rs. {shippingCharge.toFixed(2)}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-white">
                  <span>Tax estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-white hover:text-white"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>

                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </dt>
                <dd className="text-sm font-medium text-white">Rs. 00.00</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-white">
                  Order total
                </dt>
                <dd
                  id="totalDisplay"
                  className="text-base font-medium text-white"
                >
                  {" "}
                  Rs. {totalPrice.toFixed(2)}
                </dd>
              </div>

              {/* <div className="flex flex-col gap-4 md:flex-row mt-4 md:justify-between">
                <div className="flex items-center ">
                  <button className="text-center w-full md:w-44 h-12 rounded-lg bg-yellow-400 flex items-center justify-center font-semibold text-sm text-black shadow-sm transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                    <AiOutlineShopping className="h-5 w-5 mr-3" /> Place Order
                  </button>
                </div>
                <button className="group h-12 rounded-lg bg-yellow-400 text-black font-semibold text-sm w-full md:w-44 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                  <PiShoppingCartFill className="w-5 h-5" />
                  Continue Shopping
                </button>
              </div> */}
            </dl>
          </div>
        </div>
        <div className="flex items-center mt-20">
          <button className="group h-12 rounded-lg bg-yellow-400 text-black font-semibold text-sm w-full lg:w-48 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
            <PiShoppingCartFill className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default checkout;
