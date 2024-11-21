import Link from "next/link";
import { useState } from "react";
import { TfiFacebook } from "react-icons/tfi";
import { TbBrandTwitterFilled } from "react-icons/tb";
import { FaInstagramSquare } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      {/* <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
  </Head> */}
      <footer>
        <section className="footer mt-8">
          <div className="text-gray-300 w-full mx-auto xl:px-28 lg:px-28 px-4">
            <ul className="flex md:flex-row flex-col md:justify-between gap-8">
              <li className="md:w-full w-full xl:w-96 lg:w-96">
                <div className="space-y-3">
                  <a
                    href="{{ route('welcome') }}"
                    className="text-4xl font-bold uppercase font-oswald text-white "
                  >
                    Dream<span className="text-yellow-400">Cake</span>
                  </a>
                  <p className="text-xs text-justify">
                    Dream cake is the ultimate destination for cakes and snacks
                    online. We cater to providing the best Birthday Cakes and
                    snacks Online and going to make a remarkable place in
                    weddings, anniversaries, and even corporate parties.
                  </p>
                </div>
              </li>

              <li>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg uppercase font-oswald text-white">
                    SUPPORT
                  </h3>
                  <a href="" className="text-xs hover:text-secondaryColor">
                    FAQ's
                  </a>
                  <a href="" className="text-xs hover:text-secondaryColor">
                    Privacy Policy
                  </a>
                  <a href="" className="text-xs hover:text-secondaryColor">
                    Term & Condition
                  </a>
                  <a href="" className="text-xs hover:text-secondaryColor">
                    Contact
                  </a>
                </div>
              </li>

              <li className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg uppercase font-oswald text-white">
                    phone
                  </h3>

                  <p className="flex items-center gap-2 text-xs">
                    <IoCall className="text-yellow-400 w-4 h-4" />
                    +91-9064553743
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg uppercase font-oswald text-white">
                    email
                  </h3>

                  <p className="flex items-center gap-2 text-xs">
                    <IoIosMail className="text-yellow-400 w-5 h-5" />
                    dreamcake.me@gmail.com
                  </p>
                </div>
              </li>

              <li className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg uppercase font-oswald text-white">
                    address
                  </h3>

                  <p className="flex items-center gap-2 text-xs">
                    <FaLocationDot className="text-yellow-400 w-4 h-4" />
                    Rabindra Pally,Suri,Birbhum,731101,WB
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg uppercase font-oswald text-white">
                    follow us
                  </h3>

                  <div className="flex flex-row gap-4">
                    <TfiFacebook className="text-yellow-400 w-5 h-5" />
                    <TbBrandTwitterFilled className="text-yellow-400 w-5 h-5" />
                    <FaInstagramSquare className="text-yellow-400 w-5 h-5" />
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 w-full flex flex-col items-center border-t border-yellow-400 dark:border-yellow-400 py-5 md:flex-row md:justify-between">
              <p className="paragraph text-xs">
                Rosmalai associated with Dream Cake{" "}
              </p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
