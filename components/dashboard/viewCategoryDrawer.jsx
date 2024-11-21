import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { FaEye } from "react-icons/fa6";

const Drawer = () => {
  const router = useRouter();
  const menuItems = [
    { label: "View Doremon", path: "/dashboard?component=viewDoremon" },
    { label: "View Surprise", path: "/dashboard?component=viewSurprise" },
    {
      label: "View Mickey Mouse",
      path: "/dashboard?component=viewMickeymouse",
    },
    {
      label: "View Tiger Effect",
      path: "/dashboard?component=viewTigereffect",
    },
    { label: "View Barbie Doll", path: "/dashboard?component=viewBarbiedoll" },
    { label: "View Red Velvet", path: "/dashboard?component=viewRedvelvet" },
    {
      label: "View Black Forest",
      path: "/dashboard?component=viewBlackforest",
    },
    {
      label: "View Fault Line",
      path: "/dashboard?component=viewFaultline",
    },
    { label: "View Birth Day", path: "/dashboard?component=viewBirthday" },
    { label: "View Celebration", path: "/dashboard?component=viewCelebration" },
    { label: "View Anniversary", path: "/dashboard?component=viewAnniversary" },
  ];
  const [isOpen, setIsOpen] = useState(true);

  // const toggleDrawer = () => {
  //   setIsOpen(!isOpen); // Toggle the drawer
  // };

  return (
    <div>
      {/* Button to open drawer */}
      <button
        // onClick={toggleDrawer}
        className="flex flex-row bg-gray-300 items-center justify-between mb-2 py-2 px-2 w-full  text-black rounded  transition duration-200"
      >
        <FaEye className="ml-2 mt-1 w-5 h-5" />
        <p className="mt-1"> View Category</p>
        {isOpen ? (
          <IoIosArrowUp className="ml-2 mt-1" />
        ) : (
          <IoIosArrowDown className="ml-2 mt-1" />
        )}
      </button>

      {/* Drawer content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="shadow-lg">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  className={` ${
                    router.asPath === item.path
                      ? "bg-yellow-400 rounded text-black"
                      : ""
                  }`}
                >
                  <Link
                    href={item.path}
                    className="flex flex-row gap-1 px-4 py-2 hover:bg-gray-800 hover:text-white mb-1 rounded"
                  >
                    <IoIosEye
                      className={`mt-0.5 w-5 h-5 ${
                        router.asPath === item.path
                          ? "text-black"
                          : "text-gray-200"
                      }`}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
