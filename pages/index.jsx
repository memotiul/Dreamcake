import { useRouter } from "next/router";
import Header from "../components/layouts/header";
import CategoryItems from "../components/category/categoryItems";
import Footer from "../components/layouts/footer";
import Update from "../components/layouts/update";

import SliderContent from "../components/slider/sliderContent";

export default function Home() {
  const router = useRouter();
  console.log("PROCESS");
  return (
    <>
      <div className="">
        <SliderContent />
        <CategoryItems />
      </div>
    </>
  );
}
