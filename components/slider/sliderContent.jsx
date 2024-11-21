import { useRouter } from "next/router";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { SiCodefresh } from "react-icons/si";
import { BsDropletFill } from "react-icons/bs";
import Slider from "@/components/slider/slider";
import NewSlider from "@/components/slider/newSlider";
import ZoomSlider from "@/components/slider/zoomSlider";
import Carousel from "@/components/slider/carousel";


export default function Home() {
  const router = useRouter();
  return (
    <>
      <div
        className="xs:mt-40 xss:mt-40 xxss:mt-40 lg:mt-24  text-gray-300"
        // style={{backgroundImage:`url('/images/b2.png')` }}
      >
        <div className="lg:px-20 xl:px-40 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="flex flex-col ">
              <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white md:text-left">
                Organic Veggies & Fruits Foods
              </h1>
              <p className="mt-4 text-sm text-gray-300 text-center md:text-justify">
                "Dream Cake" cakes come to rescue when you are looking for
                special cakes for your beloveds. Now you can order cake online
                with Dream Cake anytime and give us the privilege to shower the
                sweetness of baked goodies for your loved ones.
              </p>
              <h4 className="mt-6 text-gray-300 text-xl text-center md:text-left">
                100% Fresh Foods
              </h4>
              <div className="text-base flex items-center justify-center gap-4 py-10 md:justify-start md:gap-20">
                <div className="text-center">
                  <GiForkKnifeSpoon className="text-yellow-400 w-16 h-16" />
                  <br />
                  Delicious
                </div>

                <div className="text-center">
                  <BsDropletFill className="text-yellow-400 w-16 h-16" />
                  <br />
                  Fresh
                </div>

                <div className="text-center">
                  <SiCodefresh className="text-yellow-400 w-16 h-16" />
                  <br />
                  Organic
                </div>
              </div>
            </div>
            {/* <Carousel /> */}
            {/* <NewSlider /> */}
            <Slider />
            {/* <ZoomSlider /> */}
          </div>
        </div>
      </div>
    </>
  );
}
