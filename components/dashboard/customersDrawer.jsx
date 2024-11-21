import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Drawer = () => {
  const router = useRouter();
  const menuItems = [
    { label: "Profile", path: "/dashboard?component=profile" },
    { label: "Settings", path: "/dashboard?component=settings" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle the drawer state
  };

  return (
    <div>
      {/* Button to open drawer */}
      <button
        onClick={toggleDrawer}
        className="flex flex-row justify-between m-2 py-2 px-2 w-48 border border-white text-white rounded  transition duration-200"
      >
        {/* {isOpen ? "Close Drawer" : "Open Drawer"} */}
        <p> View Customers </p>
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
                    router.asPath === item.path ? "text-yellow-400" : ""
                  }`}
                >
                  <Link href={item.path}>
                    <div className="block px-4 py-2 hover:bg-gray-600 rounded">
                      {item.label}
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
