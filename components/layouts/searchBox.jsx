import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // Ref for the search input and dropdown
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/allTableProducts");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter suggestions based on input and remove duplicates
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);
      const filtered = products
        .filter((product) => {
          // Check if any search word matches the product name
          return searchWords.some((word) =>
            product.name.toLowerCase().includes(word)
          );
        })
        .map((product) => product.name); // Extract only product names

      // Remove duplicates by converting to a Set and back to an array
      const uniqueSuggestions = [...new Set(filtered)];

      setFilteredSuggestions(uniqueSuggestions);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const trimmedSearchTerm = searchTerm.slice(0, 4).toLowerCase();

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(trimmedSearchTerm)
    );

    if (trimmedSearchTerm.length <= 3) {
      setErrorMessage(
        "Please type a product name (ex. Vanilla, Doremon, Breads, Pizza, Burger etc.)"
      );
      return;
    }

    const transformedProducts = filteredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      fromprice: product.fromprice,
      toprice: product.toprice,
      fromweightage: product.fromweightage,
      fromsize: product.fromsize,
      toweightage: product.toweightage || "Above",
      description: product.description || "a",
      image: product.image || "default.jpg",
      created_at: product.created_at,
      updated_at: product.updated_at,
      type: product.type || "butter",
    }));

    router.push({
      pathname: "/products",
      query: { results: JSON.stringify(transformedProducts), searchTerm },
    });
  };

  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);
    setShowSuggestions(false);
  };

  // Handle click outside of the search input and dropdown to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <form
      onSubmit={handleSearch}
      className="md:w-52 md:mr-24 lg:w-96 xl:w-96 sm:w-full xs:w-full xxs:w-full xxss:w-full flex xs:mx-auto xs:justify-center"
      ref={searchContainerRef}
    >
      <div className="relative text-gray-600 focus-within:text-gray-400 md:w-full lg:w-full xl:w-full sm:w-full xs:w-full xxs:w-full xxss:w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-full lg:w-full xl:w-full sm:w-full xs:w-full xxs:w-full xxss:w-full py-3 px-5 pr-10 text-sm text-gray-700 bg-white rounded-full border-2 border-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-lg transition-all duration-300 ease-in-out"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
        >
          <FiSearch className="w-5 h-5" />
        </button>

        {/* Suggestion Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 md:w-full lg:w-full xl:w-full sm:w-full xs:w-full xxs:w-full xxss:w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
            {filteredSuggestions.map((product, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-yellow-400 hover:text-white"
                onClick={() => handleSuggestionClick(product)}
              >
                {product}
              </li>
            ))}
          </ul>
        )}

        {errorMessage && <p className="text-white mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
}
