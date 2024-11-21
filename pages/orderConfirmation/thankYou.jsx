import React from "react";
import { useRouter } from "next/router";

const thankYou = () => {
  const router = useRouter();
  const { customer, items, subtotal, total } = router.query;
  const parsedCustomer = customer ? JSON.parse(customer) : {};
  const parsedItems = items ? JSON.parse(items) : [];
  const subT = parseInt(subtotal);
  const Tot = parseInt(total);
  return (
    <>
      <section className=" relative mt-24 lg:mt-24 xl:mt-24">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-start items-start gap-8 inline-flex">
            <div className="w-full flex-col justify-start items-start lg:gap-14 gap-8 flex">
              <div className="w-full text-center text-white text-3xl font-bold font-manrope leading-normal">
                Order Confirmation
              </div>
              <div className="flex-col justify-start items-start gap-3 flex">
                <h4 className="text-white text-xl font-medium leading-8">
                  Hello,{parsedCustomer.fullName}
                </h4>
                <h5 className="text-gray-300 text-lg font-normal leading-8">
                  Thank you for shopping
                </h5>
                <h5 className="text-gray-300 text-lg font-normal leading-8">
                  Your order has been placed successfully.We'll be in touch
                  shortly!
                </h5>
              </div>
            </div>
            <div className="w-full justify-center items-start ">
              <div className="w-full hidden md:grid grid-cols-2 p-4 bg-gray-50">
                <span className="text-black text-base font-normal leading-relaxed">
                  Product
                </span>
                <p className="flex items-center justify-between">
                  <span className="w-full max-w-[200px] text-center px-8 text-black text-base font-normal leading-relaxed ">
                    Size
                  </span>
                  <span className="w-full max-w-[260px] text-center px-8 text-black text-base font-normal leading-relaxed ">
                    Quantity
                  </span>
                  <span className="w-full max-w-[200px] text-center px-8 text-black text-base font-normal leading-relaxed ">
                    Price/item
                  </span>
                  <span className="w-full max-w-[200px] text-center">
                    Total
                  </span>
                </p>
              </div>
              {parsedItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 min-[550px]:gap-6 py-3 border-b border-gray-200 max-sm:max-w-xl max-xl:mx-auto"
                >
                  <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-4 w-full max-sm:justify-center max-sm:max-w-xl max-xl:mx-auto">
                    <div className="w-[120px] h-[120px] img-box bg-gray-50 rounded-xl justify-center items-center inline-flex">
                      {/* <img
                        src="https://pagedone.io/asset/uploads/1713334568.png"
                        alt="Denim Shirt image"
                        className="xl:w-[75px]"
                      /> */}
                      <img
                        src={
                          item.image ? `${item.image}` : "/images/default.jpg"
                        }
                        className="xl:w-[75px]"
                        alt={item.name}
                      />
                    </div>
                    <div className="pro-data w-full max-w-sm flex-col justify-start items-start gap-2 inline-flex">
                      <h4 className="w-full text-white text-lg font-medium leading-8 max-[550px]:text-center">
                        {item.name}
                      </h4>
                      <h5 className="w-full text-gray-300 text-base font-normal leading-relaxed min-[550px]:my-0 my-2 max-[550px]:text-center">
                        Product ID: 4553458120
                      </h5>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between flex-col min-[550px]:flex-row w-full max-sm:max-w-xl max-xl:mx-auto gap-2">
                    <h5 className="w-full max-w-[142px] text-center text-white text-lg font-medium leading-relaxed">
                      {item.size} pounds
                    </h5>
                    <h5 className="w-full max-w-[142px] text-center text-white text-lg font-medium leading-relaxed">
                      {item.quantity}
                    </h5>
                    <h5 className="max-w-[142px] w-full text-center text-white text-lg font-medium leading-relaxed pl-5">
                      Rs. {item.price}
                    </h5>
                    <h5 className="max-w-[142px] w-full text-center text-white text-lg font-medium leading-relaxed pl-5">
                      Rs.{" "}
                      {(
                        (Number(item.price) + 200 * ((item.size || 1) - 1)) *
                        item.quantity
                      ).toFixed(2)}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full p-5 rounded-xl border border-gray-200 flex-col justify-start items-center gap-4 flex">
              <div className="w-full justify-between items-center gap-6 inline-flex">
                <h5 className="text-white text-lg font-normal leading-8">
                  Subtotal:
                </h5>
                <h5 className="text-right text-gray-300 text-lg font-semibold leading-8">
                  Rs. {subT.toFixed(2)}
                </h5>
              </div>
              <div className="w-full justify-between items-center gap-6 inline-flex">
                <h5 className="text-white text-lg font-normal leading-8">
                  Delivery:
                </h5>
                <h5 className="text-right text-gray-300 text-lg font-semibold leading-8">
                  Rs. 20.00
                </h5>
              </div>
              <div className="w-full justify-between items-center gap-6 inline-flex">
                <h5 className="text-white text-lg font-normal leading-8">
                  Total:
                </h5>
                <h5 className="text-right text-gray-300 text-lg font-semibold leading-8">
                  {/* ₹ */}
                  Rs. {Tot.toFixed(2)}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default thankYou;
