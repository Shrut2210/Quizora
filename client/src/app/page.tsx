import Image from "next/image";
import logo from "../../public/assets/logo.png" 
import Spline from '@splinetool/react-spline/next';
import Link from "next/link";
export default function Home() {
  return (
    <>
      {/* Navbar */}
      <div className="fixed p-5 flex justify-between items-center  w-full"> 
          <div className="">
           <Image src={logo} className="w-40" alt="Botho" /> 
          </div>
          <div className="flex justify-center items-center pr-10">  
            <div className="flex text-white pr-10 text-xl gap-7 ">
              <div><h1>Features</h1></div>
              <div><h1>Activities</h1></div>
              <div><h1>Learnings</h1></div>
              <div><h1>Reviews</h1></div>
            </div>
            <div className="bg-[#9207E6] rounded-md px-5 py-3 text-lg text-white font-extrabold ">
              <Link href={"/SignUp"}>Login</Link>
            </div>
          </div>
      </div>


      {/* Image section */}

      
      


      {/* smalll details sectoion */}








      {/* different features components */}




      {/* About us */}






      {/* Footer */}
    </>
  );
}

{
  /*

    1) Features
    2) Fun Activity
    3) Learning
    4) Review
    5) Login


    1. MCQ import - pdf, manully, plugin, reuse
    2. Video / Images type MCQ
  */
}