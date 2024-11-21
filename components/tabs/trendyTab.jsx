// components/TrendyTab.js

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { GiClick } from "react-icons/gi";

const TrendyTab = () => {
  const router = useRouter();
  const handleNavigation = (type) => {
    router.push(`/products?type=${type}`);
  };

  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/trendy");
        const data = await response.json();
        setTrends(data);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <>
      <div className="mt-4 lg:px-24">
        <div className="p-4 md:px-28 lg:px-16 rounded mb-2 text-white">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 justify-center">
            {trends
              // .slice(startIndex, startIndex + itemsPerPage)
              .map((product, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex flex-col justify-center items-center"
                >
                  {/* <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-lg hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                    <img
                      // src="/images/vanilla/v9.jpg"
                      src={`/images/${product.image}`}
                      alt="food image"
                      className="w-40 hover-zoom md:w-48 lg:w-24"
                      // style="transition: transform 0.2s ease-in-out;"
                    />
                  </div> */}
                  <div className="flex flex-col gap-8 items-center justify-center  h-56 md:h-40 xxs:w-64 xs:w-64 lg:w-full md:w-48 rounded-lg mb-1 border border-gray-200 bg-stone-100 steal-200 relative group">
                    <img
                      src={`/images/${product.image}`}
                      className="w-32 h-32"
                      alt={product.name}
                    />
                    <div
                      onClick={() => handleNavigation(product.name)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <button className="flex flex-row justify-center inset-0 w-full bg-yellow-400 text-black py-2 text-center opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#020617] hover:text-white border hover:border-gray-100">
                        <GiClick className="w-5 h-5 mr-2" />

                        <p className="inline-block text-sm">See More</p>
                      </button>
                    </div>
                  </div>
                  <div className="xxs:w-64 xs:w-64 lg:w-full md:w-48">
                    <div className="mb-2">
                      <h4 className="text-2xl">{product.name}</h4>
                      <p className="text-sm text-gray-300">
                        Totally Home Made Food.Fresh,Hygenic and Eggless.
                      </p>
                    </div>

                    <p className="text-yellow-400">
                      Starting @ Rs. {product.fromprice}
                    </p>
                  </div>
                </li>
              ))}
            {/* <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Tiger Effect")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/mango/m4.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Tiger Effect</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Doremon")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/butter/b8.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Doremon</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Mickey Mouse")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/pine/p6.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Mickey Mouse</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Surprise")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/straw/sb17.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Surprise</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Barbie Doll")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/choco/ch17.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Barbie Doll</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Fault Line")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/choco/ch17.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Fault Line</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Red Velvet")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/choco/ch17.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Red Velvet</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("Black Forest")}
            >
              {" "}
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/choco/ch17.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>
              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">Black Forest</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleNavigation("3D")}
            >
              <div className="h-56 grid place-items-center dark:hover:bg-yellow-400 bg-neutral-100 rounded-3xl hover:bg-yellow-400 ease-linear duration-200 lg:h-40">
                <img
                  src="/images/choco/ch17.jpg"
                  alt="food image"
                  className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24"
                />
              </div>

              <div className="pt-5">
                <div className="mb-2">
                  <h4 className="text-2xl">3D</h4>
                  <p className="text-sm text-gray-300">
                    Totally Home Made Food.Fresh,Hygenic and Eggless.
                  </p>
                </div>

                <p className="text-yellow-400">Starting @ Rs. 200</p>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TrendyTab;
