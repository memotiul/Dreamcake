import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";

const Update = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <section className="py-16 bg-slate-900 mt-8">
        <div className="w-full mx-auto xl:px-28 lg:px-28 px-4  flex flex-col gap-5 md:items-center md:flex-row">
          <div className="space-y-4 md:flex-1">
            <h2 className="font-bold text-3xl leading-10 uppercase text-white">
              GET EXCLUSIVE UPDATE
            </h2>
            {/* {{-- <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p> --}} */}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:flex-1 ">
            <input
              type="email"
              placeholder="Email address"
              className="p-2 text-black rounded-lg outline-none md:w-full"
              disabled
            />
            <a
              href=""
              className="cursor-pointer text-black bg-yellow-400 rounded-lg py-3 px-8 text-center text-sm leading-5 capitalize transition duration-200 ease-linear flex items-center justify-center gap-2 btn  hover:opacity-75 "
            >
              <FaLocationArrow className="text-black" />
              Subscribe
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Update;
