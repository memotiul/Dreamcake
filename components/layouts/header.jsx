import Link from "next/link";
import { useState, useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { PiShoppingCartFill } from "react-icons/pi";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { useRouter } from "next/router";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import CartContext from "@/context/CartContext";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };
  const [isDrawerOpenTop1, setIsDrawerOpenTop1] = useState(false);
  const [isDrawerOpenTop2, setIsDrawerOpenTop2] = useState(false);
  const [isDrawerOpenTop3, setIsDrawerOpenTop3] = useState(false);
  const toggleDrawerTop1 = () => {
    setIsDrawerOpenTop1((prevState) => !prevState);
  };
  const toggleDrawerTop2 = () => {
    setIsDrawerOpenTop2((prevState) => !prevState);
  };
  const toggleDrawerTop3 = () => {
    setIsDrawerOpenTop3((prevState) => !prevState);
  };

  const handleNavigation = (type) => {
    router.push(`/products?type=${type}`);
  };
  return (
    <>
      {/* <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
  </Head> */}

      <div style={{ backgroundColor: "#020617" }}>
        <nav
          className="w-full fixed top-0 left-0 right-0 z-10"
          style={{ backgroundColor: "#020617" }}
        >
          {/* {router.pathname === "/" && (
            <div className="md:flex flex md:flex-row flex-col hidden  md:justify-between items-center md:px-36 w-full bg-yellow-400 top-0 left-0 right-0 z-10 text-black md:h-10 h-24 md:visible">
              <div className="flex md:flex-row  gap-4 items-center md:ml-8">
                <IoCall className="text-black mt-1.5" />
                <h1 className="mt-1 text-sm">+91-9851107007</h1>
              </div>
              <div className="flex md:flex-row gap-4 items-center">
                <IoIosMail className="text-black mt-1 h-5 w-5" />
                <h1 className="mt-1 text-sm">dreamcake.tumpasaha@gmail.com</h1>
              </div>
              <div className=" flex md:flex-row gap-4 items-center">
                <MdDeliveryDining className="text-black mt-1.5 h-5 w-5" />
                <h1 className="mt-1 text-xs">
                  3-5 BUSINESS HOURS FREE DELIVERY
                </h1>
              </div>
            </div>
          )} */}
          <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-36">
            <div>
              <div className="flex  items-center justify-between py-3 md:py-2 md:block">
                <div className="flex flex-col justify-center items-center">
                  <img
                    rel="logo"
                    src="/images/dclogo.png"
                    className="w-10 h-10"
                    type="image/x-icon"
                  />
                  <Link
                    onClick={() => setNavbar(false)}
                    href="/"
                    className="text-2xl font-bold uppercase font-oswald text-white "
                  >
                    Dream<span className="text-yellow-400">Cake</span>
                  </Link>
                </div>
                <div
                  className={`cart relative inline-block mr-2 md:absolute md:right-0 ${
                    router.pathname === "/" ? "md:top-6" : "md:top-6"
                  } md:mr-32 md:mt-1.5 mt-4`}
                >
                  <Link
                    onClick={() => setNavbar(false)}
                    href="/cart"
                    className="flex items-center justify-center text-white"
                  >
                    <PiShoppingCartFill className="h-8 w-8 md:w-7 md:h-7 " />{" "}
                    <h1>MyCart</h1>
                    <p className="count bg-red-600 text-white rounded-full text-xs font-bold absolute md:bottom-2 bottom-2 md:ml-2 ml-3 left-20  md:w-6 md:h-6 w-6 h-6 flex items-center justify-center">
                      <span className="md:mt-0.5 mt-0.5 md:text-xs text-sm">
                        {" "}
                        {cart?.cartItems?.length || 0}
                      </span>
                    </p>
                  </Link>
                </div>
                {/* HAMBURGER BUTTON FOR MOBILE */}
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <AiOutlineCloseSquare className="h-6 w-6 text-white" />
                    ) : (
                      <RxHamburgerMenu className="h-6 w-6 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:mr-48 md:block md:pb-0 md:mt-0 ${
                  navbar ? "p-12 md:p-0 block" : "hidden"
                }`}
              >
                <ul className="h-screen md:h-auto items-center justify-center md:flex">
                  <li
                    className={`text-sm text-white py-2 md:px-4 text-center border-b-2 md:border-b-0 ${
                      router.pathname === "/"
                        ? "text-yellow-400 md:text-yellow-400"
                        : ""
                    } hover:bg-white border-yellow-400 md:hover:text-yellow-400 md:hover:bg-transparent`}
                  >
                    <Link onClick={() => setNavbar(false)} href="/">
                      Home
                    </Link>
                  </li>
                  <li
                    className={`text-sm text-white py-2 px-4 text-center border-b-2 md:border-b-0 ${
                      router.pathname === "/products"
                        ? "text-yellow-400 md:text-yellow-400"
                        : ""
                    }  border-yellow-400 md:hover:text-yellow-400 md:hover:bg-transparent`}
                  >
                    <Link onClick={() => setNavbar(false)} href="/products">
                      About Us
                    </Link>
                  </li>
                  <li
                    className={`text-sm text-white py-2 px-4 text-center border-b-2 md:border-b-0 ${
                      router.pathname === "/productDetails"
                        ? "text-yellow-400 md:text-yellow-400"
                        : ""
                    }  border-yellow-400 md:hover:text-yellow-400 md:hover:bg-transparent`}
                  >
                    <Link
                      onClick={() => setNavbar(false)}
                      href="/productDetails"
                    >
                      Menu
                    </Link>
                  </li>
                  <li
                    className={`text-sm text-white py-2 px-4 text-center border-b-2 md:border-b-0 ${
                      router.pathname === "/review-section"
                        ? "text-yellow-400 md:text-yellow-400"
                        : ""
                    }  border-yellow-400 md:hover:text-yellow-400 md:hover:bg-transparent`}
                  >
                    <Link
                      onClick={() => setNavbar(false)}
                      href="/review-section"
                    >
                      Review
                    </Link>
                  </li>
                  <li
                    className={`text-sm text-white py-2 px-4 text-center border-b-2 md:border-b-0 ${
                      router.pathname === "#projects"
                        ? "text-yellow-400 md:text-yellow-400"
                        : ""
                    }  border-yellow-400 md:hover:text-yellow-400 md:hover:bg-transparent`}
                  >
                    <Link onClick={() => setNavbar(false)} href="#projects">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {router.pathname === "/products" && (
            <div className="md:px-36 w-full bg-yellow-400 top-0 left-0 right-0 z-10 text-black md:h-14 h-12 md:visible">
              <ul className="flex md:flex-row md:justify-between gap-20 md:items-center md:mr-24">
                <li className="text-sm text-gray-900 py-2 px-4 text-center  border-b-2 md:border-b-0  hover:bg-yellow-400  border-yellow-400  md:hover:text-yellow-400 md:hover:bg-transparent">
                  <div className="relative">
                    {/* Toggle Button */}
                    <button
                      onClick={toggleDrawerTop1}
                      className="flex items-center justify-center bg-yellow-400 text-black py-2 px-4 fixed"
                    >
                      <span>Trendy</span>
                      {isDrawerOpenTop1 ? (
                        <IoIosArrowUp className="ml-2" />
                      ) : (
                        <IoIosArrowDown className="ml-2" />
                      )}
                    </button>
                    {/* Drawer Content */}
                    {/* Conditionally render the Drawer Content */}
                    {isDrawerOpenTop1 && (
                      <>
                        {/* Transparent Overlay */}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0"
                          style={{ zIndex: 999 }} // Ensure the overlay is below the drawer
                          onClick={toggleDrawerTop1} // Click to close the drawer
                        />
                        {/* Drawer Content */}
                        <div
                          className="fixed w-full top-36 left-0 right-0 bg-slate-900 shadow-md transform transition-transform duration-300 ease-in-out"
                          style={{ zIndex: 1000 }}
                        >
                          {/* Close Button */}
                          {/* <button
                            onClick={toggleDrawerTop1}
                            className="absolute top-4 right-4 text-white"
                          >
                            <CgCloseR className="h-4 w-4" />
                          </button> */}

                          <div className="p-4 text-white md:mt-0">
                            <ul className=" md:flex flex-row md:justify-between md:px-16">
                              <li
                                onClick={() => handleNavigation("Rosmalai")}
                                className="text-sm cursor-pointer text-white py-2 md:px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Rosmalai</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Doremon")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Doremon</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Mickey Mouse")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Mickey Mouse</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Tiger Effect")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Tiger Effect</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Surprise")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Surprise</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Barbie Doll")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Barbie Doll</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Fault Line")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Fault Line</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Red Velvet")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Red Velvet</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Black Forest")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Black Forest</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </li>
                <li className="text-sm text-gray-900 py-2 px-4 text-center  border-b-2 md:border-b-0  hover:bg-yellow-400  border-yellow-400  md:hover:text-yellow-400 md:hover:bg-transparent">
                  <div className="relative">
                    {/* Toggle Button */}
                    <button
                      onClick={toggleDrawerTop2}
                      className="flex items-center justify-center bg-yellow-400 text-black py-2 px-4 fixed"
                    >
                      <span>Flavoured</span>
                      {isDrawerOpenTop2 ? (
                        <IoIosArrowUp className="ml-2" />
                      ) : (
                        <IoIosArrowDown className="ml-2" />
                      )}
                    </button>
                    {/* Drawer Content */}
                    {/* Conditionally render the Drawer Content */}
                    {isDrawerOpenTop2 && (
                      <>
                        {/* Transparent Overlay */}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0"
                          style={{ zIndex: 999 }} // Ensure the overlay is below the drawer
                          onClick={toggleDrawerTop2} // Click to close the drawer
                        />
                        {/* Drawer Content */}
                        <div
                          className="fixed w-full top-36 left-0 right-0  bg-slate-900 shadow-md transform transition-transform duration-300 ease-in-out"
                          style={{ zIndex: 1000 }}
                        >
                          {/* Close Button */}
                          {/* <button
                            onClick={toggleDrawerTop2}
                            className="absolute top-4 right-4 text-white"
                          >
                            <CgCloseR className="h-4 w-4" />
                          </button> */}

                          <div className="p-4 text-white md:mt-0">
                            <ul className=" md:flex flex-row md:justify-between md:px-16">
                              <li
                                onClick={() => handleNavigation("Vanilla")}
                                className="cursor-pointer text-sm text-white py-2 md:px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Vanilla </p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Mango")}
                                className="cursor-pointer text-sm text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Mango</p>
                              </li>
                              <li
                                onClick={() =>
                                  handleNavigation("Butter Scotch")
                                }
                                className="cursor-pointer text-sm text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Butter Scotch</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Pine Apple")}
                                className="cursor-pointer text-sm text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Pine Apple</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Strawberry")}
                                className="cursor-pointer text-sm text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Strawberry</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Chocolate")}
                                className="cursor-pointer text-sm text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p>Chocolate</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </li>
                <li className="text-sm text-gray-900 py-2 px-4 text-center  border-b-2 md:border-b-0  hover:bg-yellow-400  border-yellow-400  md:hover:text-yellow-400 md:hover:bg-transparent">
                  <div className="relative">
                    {/* Toggle Button */}
                    <button
                      onClick={toggleDrawerTop3}
                      className="flex items-center justify-center bg-yellow-400 text-black py-2 px-4 fixed"
                    >
                      <span>Snacks</span>
                      {isDrawerOpenTop3 ? (
                        <IoIosArrowUp className="ml-2" />
                      ) : (
                        <IoIosArrowDown className="ml-2" />
                      )}
                    </button>
                    {/* Drawer Content */}
                    {/* Conditionally render the Drawer Content */}
                    {isDrawerOpenTop3 && (
                      <>
                        {/* Transparent Overlay */}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0"
                          style={{ zIndex: 999 }} // Ensure the overlay is below the drawer
                          onClick={toggleDrawerTop3} // Click to close the drawer
                        />
                        {/* Drawer Content */}
                        <div
                          className="fixed w-full  top-36 right-0 bg-slate-900 shadow-md transform transition-transform duration-300 ease-in-out"
                          style={{ zIndex: 1000 }}
                        >
                          {/* Close Button */}
                          {/* <button
                            onClick={toggleDrawerTop3}
                            className="absolute top-4 right-4 text-white"
                          >
                            <CgCloseR className="h-4 w-4" />
                          </button> */}

                          <div className="p-4 text-white md:mt-0">
                            <ul className=" md:flex flex-row md:justify-between md:px-32">
                              <li
                                onClick={() => handleNavigation("Pizza")}
                                className="text-sm cursor-pointer text-white py-2 md:px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p href="#">Pizza</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Burger")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p href="#">Burgers</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Cinnamon")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p href="#">Cinnamon Rolls</p>
                              </li>
                              <li
                                onClick={() => handleNavigation("Pastaa")}
                                className="text-sm cursor-pointer text-white py-2 px-4 text-center md:hover:text-yellow-400 hover:bg-yellow-400 md:hover:bg-transparent"
                              >
                                <p href="#">Pastaa</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
