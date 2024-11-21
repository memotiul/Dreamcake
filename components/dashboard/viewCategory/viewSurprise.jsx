import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";

const ViewVanilla = ({ products }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(null); // Track which product is being edited
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    fromweightage: "",
    fromprice: "",
    description: "",
  });

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const item = "surprise";

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

  const handleEdit = (product) => {
    setIsEditing(product.id);
    setEditProduct({ ...product });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`/api/updateItems`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editProduct, // Spread existing product data
          product: "surprise", // Add the product type as 'surprise'
        }),
      });

      if (response.ok) {
        alert("Product updated successfully");
        setIsEditing(null); // Reset editing state
        router.reload();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                From Weight
              </th>

              <th scope="col" className="px-6 py-3">
                From Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
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
                  <td className="p-4">
                    <img
                      src={`/images/${product.image}`}
                      className="w-16 md:w-32 max-w-full max-h-full border border-white rounded"
                      alt={product.name}
                    />
                  </td>

                  {isEditing === product.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="name"
                          value={editProduct.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 text-black rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          name="fromweightage"
                          value={editProduct.fromweightage}
                          onChange={handleInputChange}
                          className="border border-gray-300 text-black rounded px-2 py-1"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <input
                          type="number"
                          name="fromprice"
                          value={editProduct.fromprice}
                          onChange={handleInputChange}
                          className="border border-gray-300 text-black rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="description"
                          value={editProduct.description}
                          onChange={handleInputChange}
                          className="border border-gray-300 text-black rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={handleUpdate}
                          className="text-black px-3 py-2 rounded-lg bg-white hover:underline"
                        >
                          Update
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {product.fromweightage} pound
                      </td>

                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {product.fromprice}
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {product.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div
                            onClick={() => handleDelete(product.id)}
                            className="font-medium text-white hover:underline cursor-pointer"
                          >
                            <MdDelete className="w-6 h-6" />
                          </div>
                          <div
                            onClick={() => handleEdit(product)}
                            className="font-medium text-white hover:underline cursor-pointer"
                          >
                            <MdEdit className="w-6 h-6" />
                          </div>
                        </div>
                      </td>
                    </>
                  )}
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

export default ViewVanilla;
