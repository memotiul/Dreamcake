import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaSignal } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const profile = () => {
  return (
    <>
      <div className="p-4">
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <FaCameraRetro className="w-6 h-6" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Money
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                  $53k
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+55%</strong>&nbsp;than
                  last week
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <MdOutlinePeopleAlt className="w-7 h-7" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Users
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                  2,300
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+3%</strong>&nbsp;than last
                  month
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <CgProfile className="w-7 h-7" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  New Clients
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                  3,462
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-red-500">-2%</strong>&nbsp;than
                  yesterday
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <FaSignal className="w-7 h-7" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Sales
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                  $103,430
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+5%</strong>&nbsp;than
                  yesterday
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
              <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                <div>
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white mb-1">
                    Projects
                  </h6>
                  <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                    <FaCheck />
                    <strong>30 done</strong> this month
                  </p>
                </div>
                <button
                  aria-expanded="false"
                  aria-haspopup="menu"
                  id=":r5:"
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-white hover:bg-blue-white/10 active:bg-blue-white/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <BsThreeDotsVertical className="w-5 h-5" />
                  </span>
                </button>
              </div>
              <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          companies
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          budget
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          completion
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-white font-bold">
                            Material XD Version
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          $14,000
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="w-10/12">
                          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                            60%
                          </p>
                          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                            <div className="w-[60%] flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-white font-bold">
                            Add Progress Track
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          $3,000
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="w-10/12">
                          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                            10%
                          </p>
                          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                            <div className="w-[10%] flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-white font-bold">
                            Fix Platform Errors
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          Not set
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="w-10/12">
                          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                            100%
                          </p>
                          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                            <div className="w-[100%] flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-white font-bold">
                            Launch our Mobile App
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          $20,500
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="w-10/12">
                          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                            100%
                          </p>
                          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                            <div className="w-[100%] flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-white font-bold">
                            Add the New Pricing Page
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          $500
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="w-10/12">
                          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                            25%
                          </p>
                          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                            <div className="w-[25%] flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
