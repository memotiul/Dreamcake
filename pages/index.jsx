import { useRouter } from "next/router";
import Header from "../components/layouts/header";
import CategoryItems from "../components/category/categoryItems";
import Footer from "../components/layouts/footer";
import Update from "../components/layouts/update";

import SliderContent from "../components/slider/sliderContent";

export default function Home({trends,flavours,snacks}) {
  const router = useRouter();
  console.log("PROCESS");
  return (
    <>
      <div className="">
        <SliderContent />
        <CategoryItems trends={trends} flavours={flavours} snacks={snacks}/>
      </div>
    </>
  );
}
export async function getStaticProps() {
  try {
    // Fetch all three in parallel
    const [trendyRes, flavouredRes, snacksRes] = await Promise.all([
      fetch("https://rosmalai.in/api/trends"),
      fetch("https://rosmalai.in/api/flavours"),
      fetch("https://rosmalai.in/api/snacks"),
    ]);

    const [trendyData, flavouredData, snacksData] = await Promise.all([
      trendyRes.json(),
      flavouredRes.json(),
      snacksRes.json(),
    ]);

    return {
      props: {
        trends: trendyData?.data || [],
        flavours: flavouredData?.data || [],
        snacks: snacksData?.data || [],
      },
      revalidate: 3600, // re-fetch every hour (optional)
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        trends: [],
        flavours: [],
        snacks: [],
      },
    };
  }
}