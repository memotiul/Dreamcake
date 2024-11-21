import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = ({
    product,
    name,
    price,
    image,
    size,
    quantity,
    description,
    iSize,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      size,
      quantity,
      description,
      iSize,
    };
    console.log("ADDED", item);
    // Find the item by both name and product (ID)
    const isItemExist = cart?.cartItems?.find(
      (i) => i.name === item.name && i.product === item.product
    );

    let newCartItems;

    if (isItemExist) {
      return false;
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
      localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
      setCartToState();
      return true;
    }
  };

  const updateCartItemQuantity = ({ product, quantity }) => {
    const newCartItems = cart.cartItems.map((i) =>
      i.product === product ? { ...i, quantity } : i
    );
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCart({ cartItems: newCartItems });
  };
  const updateCartItemSize = ({ product, size }) => {
    const newCartItems = cart.cartItems.map((i) =>
      i.product === product ? { ...i, size } : i
    );
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCart({ cartItems: newCartItems });
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };
  const router = useRouter();
  const proceedToCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart.cartItems));
    router.push("/checkout/checkout");
  };
  const clearCart = () => {
    setCart([]); // Clears the cart
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        addItemToCart,
        deleteItemFromCart,
        updateCartItemQuantity,
        proceedToCheckout,
        updateCartItemSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
