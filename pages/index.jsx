import { useRouter } from "next/router";
import Header from "../components/layouts/header";
import CategoryItems from "../components/category/categoryItems";
import Footer from "../components/layouts/footer";
import Update from "../components/layouts/update";

import SliderContent from "../components/slider/sliderContent";

export default function Home({trends,flavours,snacks,latests,reviews,tops,customers}) {
  const router = useRouter();
  console.log("PROCESS");
  return (
    <>
      <div className="">
        <SliderContent />
        <CategoryItems trends={trends} flavours={flavours} snacks={snacks} latests={latests} reviews={reviews} tops={tops} customers={customers}/>
      </div>
    </>
  );
}
export async function getStaticProps() {
  try {
    // Fetch all three in parallel
    const [trendyRes, flavouredRes, snacksRes,latestsRes,reviewsRes,topsRes,customerReviewRes] = await Promise.all([
      fetch("https://rosmalai.in/api/trends"),
      fetch("https://rosmalai.in/api/flavours"),
      fetch("https://rosmalai.in/api/snacks"),
      fetch("https://rosmalai.in/api/latests"),
      fetch("https://rosmalai.in/api/reviews"),
      fetch("https://rosmalai.in/api/tops"),
      fetch("https://rosmalai.in/api/customerReviews"),
    ]);

    const [trendyData, flavouredData, snacksData,latestsData,reviewsData,topsData,customerReviewData] = await Promise.all([
      trendyRes.json(),
      flavouredRes.json(),
      snacksRes.json(),
      latestsRes.json(),
      reviewsRes.json(),
      topsRes.json(),
      customerReviewRes.json(),
    ]);

    return {
      props: {
        trends: trendyData?.data || [],
        flavours: flavouredData?.data || [],
        snacks: snacksData?.data || [],
        latests: latestsData?.data || [],
        reviews: reviewsData?.data || [],
        tops: topsData?.data || [],
        customers: customerReviewData?.data || [],
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
        latests: [],
        reviews: [],
        tops: [],
        customers: [],
      },
    };
  }
}