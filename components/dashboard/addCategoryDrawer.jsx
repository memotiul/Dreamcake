import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { BiSolidFolderPlus } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";

const Drawer = () => {
  const router = useRouter();
  const menuItems = [
    { label: "Add Doremon", path: "/dashboard?component=addDoremon" },
    { label: "Add Surprise", path: "/dashboard?component=addSurprise" },
    { label: "Add Mickey Mouse", path: "/dashboard?component=addMickeymouse" },
    { label: "Add Tiger Effect", path: "/dashboard?component=addTigereffect" },
    { label: "Add Barbie Doll", path: "/dashboard?component=addBarbiedoll" },
    { label: "Add Red Velvet", path: "/dashboard?component=addRedvelvet" },
    { label: "Add Black Forest", path: "/dashboard?component=addBlackforest" },
    { label: "Add Birth Day", path: "/dashboard?component=addBirthday" },
    { label: "Add Celebration", path: "/dashboard?component=addCelebration" },
    { label: "Add Anniversary", path: "/dashboard?component=addAnniversary" },
    {
      label: "Add Fault Line",
      path: "/dashboard?component=addFaultline",
    },
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
        className="flex flex-row bg-gray-300 justify-between items-center mb-2 py-2 px-2 w-full  text-black rounded  transition duration-200"
      >
        {/* {isOpen ? "Close Drawer" : "Open Drawer"} */}
        <BiSolidFolderPlus className="ml-2 mt-1 w-5 h-5" />
        <p className="mt-1.5"> Add Category</p>
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
                  <Link href={item.path}>
                    <div className=" flex flex-row gap-1 px-4 py-2 hover:bg-gray-800 hover:text-white mb-1 rounded">
                      <TiPlus
                        className={`mt-1 ${
                          router.asPath === item.path
                            ? "text-black"
                            : "text-gray-200"
                        }`}
                      />
                      <p>{item.label}</p>
                    </div>
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
