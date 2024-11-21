import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AiOutlineShopping } from "react-icons/ai";

const addLatestProducts = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const imageInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const readImageAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async () => {
    const file = imageInputRef.current?.files[0];
    if (!file) {
      return null; // No image file selected
    }

    if (file.size > 500 * 1024) {
      // Check if file size exceeds 500 KB
      setErrorMessage(
        "File size exceeds 500 KB. Please upload file less than 500 KB."
      );
      return null;
    }

    setErrorMessage(""); // Clear any previous error messages
    const base64Image = await readImageAsBase64(file);
    return base64Image;
  };

  const onSubmit = async (data) => {
    if (!confirm("Are you want to sure add this product?")) return;
    const product = "latestProducts";
    console.log("Data", data);
    const base64Image = await handleImageUpload();
    if (!base64Image) {
      return;
    }
    console.log("Image", base64Image);
    const response = await fetch("/api/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image: base64Image,
        product: product,
      }),
    });

    if (response.ok) {
      router.reload();
    } else {
      console.error("Checkout failed.");
    }
  };

  return (
    <div className="flex flex-col md:w-1/2 ml-72">
      <div className="flex  text-center">
        <h1 className="text-lg font-bold text-white border-b-2 border-white inline-block">
          Add Latest Products
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 justify-center w-full mx-auto"
      >
        <div className="">
          <div className="w-full">
            <label
              for="fullName"
              className="block mb-3 text-sm font-semibold text-white"
            >
              Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
            />
          </div>
          <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
            <div className="w-full lg:w-1/2 ">
              <label
                for="price"
                className="block mb-3 text-sm font-semibold text-white"
              >
                From Price
              </label>
              <input
                {...register("fromPrice")}
                type="text"
                placeholder="FromPrice"
                className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
              />
            </div>
            <div className="w-full lg:w-1/2 ">
              <label
                for="price"
                className="block mb-3 text-sm font-semibold text-white"
              >
                To Price
              </label>
              <input
                {...register("toPrice")}
                type="text"
                placeholder="To Price"
                className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
              />
            </div>
          </div>
          <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
            <div className="w-full lg:w-1/2 ">
              <label
                for="price"
                className="block mb-3 text-sm font-semibold text-white"
              >
                From Weight
              </label>
              <input
                {...register("fromWeight")}
                type="text"
                placeholder="Weight"
                className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
              />
            </div>
            <div className="w-full lg:w-1/2 ">
              <label
                for="price"
                className="block mb-3 text-sm font-semibold text-white"
              >
                To Weight
              </label>
              <input
                {...register("toWeight")}
                type="text"
                placeholder="Weight"
                className="w-full px-4 py-3 text-sm border border-gray-300 text-black rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full">
              <label
                for="fromWeight"
                className="block mb-3 text-sm font-semibold text-white"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Description"
                className="w-full px-4 py-3 text-xs border border-gray-300 text-black rounded"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full">
              <label
                htmlFor="image"
                className="block mb-3 text-sm font-semibold text-white"
              >
                Upload Image
              </label>
              <input
                type="file"
                ref={imageInputRef}
                className="w-full px-4 py-3 text-sm border border-gray-300 text-white rounded"
              />
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="text-center w-full md:w-48 h-12 rounded-lg bg-yellow-400 flex items-center justify-center font-semibold text-sm text-black shadow-sm transition-all duration-500 hover:bg-[#020617] hover:text-white border hover:border-white"
          >
            {/* <AiOutlineShopping className="h-5 w-5 mr-3" />{" "} */}
            <p className="mt-1">Add Product</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default addLatestProducts;
