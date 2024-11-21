import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import { PiPhoneCallFill } from "react-icons/pi";

export default function Notification() {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between text-gray-300 md:px-32 lg:px-32">
        <div className="flex flex-col items-center">
          <div className="relative inline-block p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-center hover:bg-primaryColor hover:text-gray-300 transform hover:translate-x-1/3 hover:rotate-45 transition duration-300   bg-blueColor text-black w-32 h-32 rounded-full">
              <TbTruckDelivery className="w-16 h-16 text-white" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primaryColor hover:bg-primaryColor  w-12 h-6 rounded-t-lg"></div>
          </div>

          <div className="text-center">
            <h5>Free Shipping</h5>
            <p className="mb-0">Free on order over $300</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative inline-block p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-center hover:bg-primaryColor hover:text-gray-300 transform hover:translate-x-1/3 hover:rotate-45 transition duration-300  bg-greenColor  bg-opacity-50 text-black w-32 h-32 rounded-full">
              <MdPeopleAlt className="w-16 h-16 text-white" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primaryColor hover:bg-primaryColor  w-12 h-6 rounded-t-lg"></div>
          </div>

          <div className="text-center">
            <h5>Security Payment</h5>
            <p className="mb-0">100% security payment</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative inline-block p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-center hover:bg-primaryColor hover:text-gray-300 transform hover:translate-x-1/3 hover:rotate-45 transition duration-300   bg-redColor text-black w-32 h-32 rounded-full">
              <GoArrowSwitch className="w-16 h-16 text-white" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primaryColor hover:bg-primaryColor  w-12 h-6 rounded-t-lg"></div>
          </div>

          <div className="text-center">
            <h5>30 Day Return</h5>
            <p className="mb-0">30 day money guarantee</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative inline-block  p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-center hover:bg-primaryColor hover:text-gray-300 transform hover:translate-x-1/3 hover:rotate-45 transition duration-300   bg-purpleColor text-black w-32 h-32 rounded-full">
              <PiPhoneCallFill className="w-16 h-16 text-white" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primaryColor hover:bg-primaryColor  w-12 h-6 rounded-t-lg"></div>
          </div>

          <div className="text-center">
            <h5>24/7 Support</h5>
            <p className="mb-0">Support every time fast</p>
          </div>
        </div>
      </div>
    </>
  );
}
