import { useRouter } from 'next/router';
import { FiShoppingBag } from "react-icons/fi";

export default function Home({text}) {
  const router = useRouter();

  return (
<>
<div className="flex w-36 h-10 bg-yellow-400 rounded-lg items-center justify-center">
              
{/* <FiShoppingBag className='text-black'/> */}
              <a href="{{ route('items.byType', ['type' => 'birthdayItems']) }}"
                  className="text-black cursor-pointer text-black" >{text}</a>
          </div>
          
</>
  );
}
