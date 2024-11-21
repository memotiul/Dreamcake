// components/dashboard/viewFlavour/viewVanilla.jsx
import { React, useMemo } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";

const orders = ({ products }) => {
  const router = useRouter();
  const { customerId, fullName, address } = router.query;
  // console.log("ID", customerId);
  console.log("Image", products);
  const filteredProducts = useMemo(() => {
    if (!customerId) return products; // Return all products if customerId is not present
    return products.filter((product) => product.customer_id === customerId);
  }, [customerId, products]);

  const getImagePath = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("/images/")) {
      return imagePath;
    }
    return imagePath;
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    const item = "orders";
    try {
      const response = await fetch("/api/deleteItems", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, item }),
      });

      if (response.ok) {
        alert("Product deleted successfully");
        router.reload();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {customerId && fullName ? (
          <div className="bg-gray-50 text-center justify-center flex text-lg p-4">
            <div className="bg-gray-700 w-full flex items-center justify-center text-white rounded-2xl h-12">
              {" "}
              Orders for: {fullName} ({customerId})
            </div>
          </div>
        ) : null}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              {customerId && fullName ? (
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              ) : (
                <th scope="col" className="px-6 py-3">
                  Customer ID
                </th>
              )}
              <th scope="col" className="px-6 py-3">
                Weightage
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={
                        product.image && product.image.startsWith("/images/")
                          ? getImagePath(product.image) // If image path already contains '/images/'
                          : `/images/${getImagePath(
                              product.image || "default.jpg"
                            )}` // If image path does not contain '/images/', or fallback to 'default.jpg'
                      }
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.name}
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {product.name}
                  </td>

                  {customerId && fullName ? (
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {address}
                    </td>
                  ) : (
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {product.customer_id}
                    </td>
                  )}
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {product.weightage} pound
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    Rs. {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      onClick={() => handleDelete(product.id)}
                      className="font-medium text-white hover:underline cursor-pointer"
                    >
                      <MdDelete className="w-6 h-6" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found
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
// export async function getServerSideProps(context) {
//   const { customerId } = context.query;
//   console.log("Query Parameters:", context.query); // Log all query parameters
//   console.log("Customer ID:", customerId); // Log specific parameter

//   if (!customerId) {
//     return {
//       notFound: true, // Handle case where customerId is missing
//     };
//   }

//   // Ensure customerId is a valid number
//   const parsedCustomerId = parseInt(customerId, 10);
//   if (isNaN(parsedCustomerId)) {
//     return {
//       notFound: true, // Handle case where customerId is not a number
//     };
//   }

//   const prisma = new PrismaClient();
//   try {
//     const products = await prisma.items.findMany({
//       where: { customer_id: parsedCustomerId },
//     });

//     if (!products || products.length === 0) {
//       return {
//         notFound: true, // Handle case where no products are found
//       };
//     }

//     const productList = products.map((product) => ({
//       ...product,
//       id: product.id.toString(),
//       customer_id: product.customer_id.toString(),
//       weightage: product.weightage.toString(),
//       quantity: product.quantity?.toString() || null,
//       price: product.price?.toString() || null,
//       created_at: product.created_at ? product.created_at.toISOString() : null,
//       updated_at: product.updated_at ? product.updated_at.toISOString() : null,
//     }));

//     return {
//       props: {
//         products: productList,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     return {
//       notFound: true,
//     };
//   }
// }
