import "@/styles/globals.css";
import Heading from "../components/layouts/heading";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import Update from "../components/layouts/update";
import ScrollButton from "../components/button/scrollButton";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <CartProvider>
          <Heading />
          {/* <Header /> */}
          <Component {...pageProps} />;
          <Update />
          <Footer />
          <ScrollButton />
        </CartProvider>
      </SessionProvider>
    </>
  );
}
