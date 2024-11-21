import { useRouter } from "next/router";
import Link from "next/link";
import Drawer from "./drawer";
import ViewDrawer from "./viewDrawer";
import OrdersDrawer from "./ordersDrawer";
import AddCategoryDrawer from "./addCategoryDrawer";
import ViewCategoryDrawer from "./viewCategoryDrawer";
import AddMoreProducts from "./addMoreProducts";
import ViewMoreProducts from "./viewMoreProducts";
import Profile from "./profile";
import { signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

export default function DashboardLayout({ children, session }) {
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      callbackUrl: "/auth/login", // Redirect to login page after logging out
    });
  };
  return (
    <>
      <div className="flex flex-row h-full mt-24 gap-4 bg-gray-800">
        {/* Sidebar */}
        <aside className="flex flex-col w-72 text-white p-4 ">
          <div className="text-xl font-bold">Dashboard</div>
          <Drawer />
          <ViewDrawer />
          <AddCategoryDrawer />
          <ViewCategoryDrawer />
          <AddMoreProducts />
          <ViewMoreProducts />
          <OrdersDrawer />
          {/* <CustomersDrawer /> */}
          <button
            onClick={handleLogout}
            className="w-64 bg-red-600 bottom-0 text-white py-2 px-4 rounded mt-4"
          >
            Logout
          </button>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 mt-8 p-6 bg-gray-700 overflow-y-auto rounded">
          <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
              <div className="capitalize">
                <nav aria-label="breadcrumb" className="w-max">
                  <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                    <li className="flex items-center text-white antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                      <a>
                        <p className="block antialiased font-sans text-sm leading-normal text-white font-normal transition-all hover:text-white hover:opacity-100">
                          dashboard
                        </p>
                      </a>
                      <span className="text-white text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                        /
                      </span>
                    </li>
                    <li className="flex items-center text-white antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-white">
                      <Link href="/dashboard">
                        <p className="block antialiased font-sans text-sm leading-normal text-white font-normal">
                          home
                        </p>
                      </Link>
                    </li>
                  </ol>
                </nav>
                {/* <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
                  home
                </h6> */}
              </div>
              <div className="flex items-center">
                <div className="mr-auto md:mr-4 md:w-56">
                  {/* <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                    placeholder=" "
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-white transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-white before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Type here
                  </label>
                </div> */}
                </div>
                <button
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-blue-white/10 active:bg-blue-white/30 grid xl:hidden"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <FaCheck />
                  </span>
                </button>
                <a href="#">
                  <button
                    className="middle none font-sans font-bold center uppercase transition-all disabled disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-blue-white/10 active:bg-blue-white/30 hidden items-center gap-1 px-4 xl:flex"
                    type="button"
                  >
                    <CgProfile className="w-4 h-4" />
                    {session.user.email}
                  </button>
                  <button
                    className="relative middle none font-sans font-medium text-center uppercase transition-all disabled disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-blue-white/10 active:bg-blue-white/30 grid xl:hidden"
                    type="button"
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <CgProfile className="w-4 h-4" />
                    </span>
                  </button>
                </a>
                <button
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-blue-white/10 active:bg-blue-white/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <IoSettings className="w-4 h-4" />
                  </span>
                </button>
                <button
                  aria-expanded="false"
                  aria-haspopup="menu"
                  id=":r2:"
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-blue-white/10 active:bg-blue-white/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <FaRegBell className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
}
