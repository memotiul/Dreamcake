import { useContext, useState, useEffect } from "react";
import CartContext from "../context/CartContext";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { PiShoppingCartFill } from "react-icons/pi";

const CartPage = () => {
  const {
    cart,
    addItemToCart,
    proceedToCheckout,
    deleteItemFromCart,
    updateCartItemQuantity,
    updateCartItemSize,
  } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [poundValues, setPoundValues] = useState({}); // Track pound values for each item

  useEffect(() => {
    calculateTotalPrice();
  }, [cart, poundValues]);

  const calculateTotalPrice = () => {
    let total = 0;
    cart?.cartItems?.forEach((item) => {
      const pound = item.size || 1; // Get size from the cart item
      const adjustedPrice = Number(item.price) + 200 * (pound - 1); // Calculate adjusted price based on size
      total += adjustedPrice * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleQuantityChange = (item, quantity) => {
    if (quantity > 0) {
      updateCartItemQuantity({
        product: item.product,
        quantity, // Update with new quantity
      });
    } else {
      deleteItemFromCart(item.product);
    }
  };

  const handlePoundChange = (product, pound) => {
    setPoundValues((prev) => ({
      ...prev,
      [product]: pound,
    }));

    updateCartItemSize({
      product,
      size: pound, // Assume size is equivalent to pound
    });
  };

  return (
    <>
      <section className="py-5 sm:py-7 text-white mt-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>

      {cart?.cartItems?.length > 0 && (
        <section className="py-4">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((item) => (
                    <div key={item.product}>
                      <div className="flex flex-col lg:flex-row gap-5 md:items-center mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5 items-center">
                            <div>
                              <div className="block w-36 h-36 rounded border border-gray-200 overflow-hidden">
                                <img src={item.image} alt={item.name} />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p className="text-white text-xl">
                                {item.description}
                              </p>
                              <p className="mt-1 text-gray-400">
                                Price: Rs.{" "}
                                {(
                                  (Number(item.price) +
                                    200 *
                                      ((poundValues[item.product] || 1) - 1)) *
                                  item.quantity
                                ).toFixed(2)}
                              </p>
                              <small className="text-gray-400">
                                Rs. {item.price} / per item
                              </small>
                            </figcaption>
                          </figure>
                        </div>

                        <div className="flex flex-row gap-12 md:items-center">
                          <div className="flex flex-col">
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
                            ].includes(item.name) ? (
                              <select
                                id="sort"
                                value={poundValues[item.product] || 1}
                                onChange={(e) =>
                                  handlePoundChange(
                                    item.product,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="border w-40 h-10 rounded px-2 py-2 text-black"
                              >
                                <option value="1">1 Pound</option>
                                <option value="2">2 Pounds</option>
                                <option value="3">3 Pounds</option>
                                <option value="4">4 Pounds</option>
                                <option value="5">5 Pounds</option>
                              </select>
                            ) : [
                                "Breads & Pastries",
                                "Burger",
                                "Pizza BBQ",
                                "Veg Corn Pizza",
                                "Veg Overload Pizza",
                                "Chicken Tikka Pizza",
                                "Cheesy Burst Pizza",
                                "Chicken Pizza",
                                "Panneer Pizza",
                                "Chicken Burger",
                                "Veg Burger",
                                "Panneer Burger",
                                "Pastaa",
                              ].includes(item.name) ? (
                              <select className="border w-40 h-10 rounded px-2 py-2 text-black">
                                <option value="2">{item.iSize}</option>
                              </select>
                            ) : null}
                          </div>
                          <div className="w-24">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                              <button
                                data-action="decrement"
                                className="bg-white text-black  h-full w-20 rounded-l cursor-pointer outline-none"
                                onClick={() =>
                                  handleQuantityChange(
                                    item,
                                    item.quantity > 1 ? item.quantity - 1 : 1
                                  )
                                }
                              >
                                <span className="m-auto text-2xl font-thin">
                                  −
                                </span>
                              </button>
                              <input
                                className="outline-none focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-900 custom-input-number"
                                name="custom-input-number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item,
                                    parseInt(e.target.value)
                                  )
                                }
                              />
                              <button
                                data-action="increment"
                                className="bg-white text-black h-full w-20 rounded-r cursor-pointer"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                              >
                                <span className="m-auto text-2xl font-thin">
                                  +
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <button
                              className="px-4 py-2 inline-block text-white shadow-sm bg-red-600 rounded-md hover:bg-red-600 cursor-pointer"
                              onClick={() => deleteItemFromCart(item?.product)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-96">
                <article className="border border-gray-200 text-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-white mb-1">
                      <span>Amount before tax:</span>
                      <span>Rs. {totalPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex mt-3 pt-3 border-t justify-between text-white  mb-1">
                      <span>Total units:</span>
                      <span className="text-yellow-400">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </li>
                    <li className="flex mt-3 pt-3 border-t justify-between text-white  mb-1">
                      <span>Tax:</span>
                      <span>Rs. 0.00</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span> Rs. {totalPrice.toFixed(2)}</span>
                    </li>
                  </ul>

                  <div className="flex">
                    <button
                      onClick={proceedToCheckout}
                      className="group h-12 rounded-lg bg-yellow-400 text-black font-semibold text-sm w-full lg:w-48 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
                    >
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <AiOutlineShopping className="h-5 w-5 mr-3" />
                        <p className="inline-block">Buy Now</p>
                      </div>
                    </button>
                  </div>
                </article>
              </aside>
            </div>
            <Link
              href="/"
              className="group h-12 rounded-lg bg-yellow-400 text-black font-semibold text-sm w-full lg:w-48 flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-gray-100"
            >
              <div className="flex flex-row gap-2 items-center justify-center">
                <PiShoppingCartFill className="w-5 h-5" />
                <p className="inline-block">Back to shop</p>
              </div>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default CartPage;
