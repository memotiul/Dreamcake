// components/dashboard/viewFlavour/viewVanilla.jsx
import React from "react";
import { useRouter } from "next/router";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const orders = ({ products }) => {
  const router = useRouter();
  // const handleViewProductDetails = (id) => {
  //   router.push(`/dashboard?component=orders`);
  // };
  const handleViewProductDetails = (id, fullname, address) => {
    router.push({
      pathname: "/dashboard",
      query: {
        component: "orders",
        customerId: id,
        fullName: fullname,
        address: address,
      },
    });
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile No.
              </th>
              <th scope="col" className="px-6 py-3">
                Land Mark
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    {product.id}
                  </td>
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    {product.fullname}
                  </td>
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    {product.address}
                  </td>
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    {product.mobile}
                  </td>
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    {product.landmark}
                  </td>
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    Rs. {product.subtotal}
                  </td>
                  <td className="px-6 py-4  text-gray-900 dark:text-white">
                    Rs. {product.total}
                  </td>
                  <td
                    onClick={() =>
                      handleViewProductDetails(
                        product.id,
                        product.fullname,
                        product.address
                      )
                    }
                    className="px-6 py-4 cursor-pointer"
                  >
                    <FaRegEye className="w-6 h-6 text-white" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default orders;
