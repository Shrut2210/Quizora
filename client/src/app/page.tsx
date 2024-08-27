"use client";
import React, { useEffect,useRef } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png" 
import Spline from '@splinetool/react-spline/next';
import Link from "next/link";
import bg_1 from "../../public/assets/bg-1.png";
import { AnimatedTooltip } from "@/components/AnimatedTooltip";
import "./style.css";
import { ImagesSlider } from "@/components/ImagesSlider";
import { motion } from "framer-motion";
import a_1 from "../../public/assets/a1.webp";
import a_2 from "../../public/assets/a2.jpg";
import a_3 from "../../public/assets/a3.png";
import f_1 from "../../public/assets/f1.png";
import f_2 from "../../public/assets/f2.jpg";
import f_3 from "../../public/assets/f3.png";
import l_1 from "../../public/assets/l1.png";
import l_2 from "../../public/assets/l2.png";
import l_3 from "../../public/assets/l3.webp";

export default function Home() {

  
  const item_1 = [
  {
    id: 1,
    name: "Documnet to Quiz",
    image:
      f_1,
  },
  {
    id: 2,
    name: "AI Quiz Generator",
    image:
      f_2,
  },
  {
    id: 3,
    name: "Real-Time evaluation",
    image:
      f_3,
  },
];

const item_2 = [
  {
    id: 1,
    name: "Games",
    image:
      a_1,
  },
  {
    id: 2,
    name: "Engaging Interface",
    image:
      a_2,
  },
  {
    id: 3,
    name: "Scribble",
    image:
      a_3,
  },
];

const item_3 = [
  {
    id: 1,
    name: "Collabration",
    image:
      l_1,
  },
  {
    id: 2,
    name: "Video Lectures",
    image:
      l_2,
  },
  {
    id: 3,
    name: "Assesments",
    image:
      l_3,
  },
];

  const line1Ref = useRef(null);
  const innerline = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY - 800;
      console.log("Scroll position adjusted:", pos);
      if (line1Ref.current) {
        line1Ref.current.style.right = `${pos*3}px`;
      
        const skewValue = pos * 0.01;
        innerline.current!.style.transform=`translate3d(${pos}px,0px,0px)`
        
        innerline.current!.style.transform=`skew(${skewValue}deg,0deg)`
        
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      {/* Navbar */}
      <div className="sticky p-5 flex justify-between items-center  w-full "> 
          <div className="">
           <Image src={logo} className="w-40" alt="Botho" /> 
          </div>
          <div className="flex justify-center items-center pr-10">  
            <div className="flex text-white pr-10 text-xl gap-7 ">
              <div><a href="#Features" className="scroll-smooth">Features</a></div>
              <div><a href="#Activities" className="scroll-smooth">Activities</a></div>
              <div><a href="#Learnings" className="scroll-smooth">Learnings</a></div>
              <div><a href="#Reviews" className="scroll-smooth">Reviews</a></div>
            </div>
            <div className="bg-[#9207E6] rounded-md px-5 py-3 text-lg text-white font-extrabold ">
              <Link href={"/SignUp"}>Login</Link>
            </div>
          </div>
      </div>


      {/* Image section */}

    <div className="h-screen w-screen absolute -z-10 top-0 " >
        <Image src={bg_1} alt="botho" className="h-full w-full"/>
        <div className="h-full w-full bg-[#100D28] bg-opacity-80 absolute top-0 "></div>
    </div>
      
      <div className="h-60 relative">

      </div>

      {/* smalll details sectoion */}

      <div className="h-96 flex overflow-x-hidden"  >
        <div className="flex flex-col justify-center items-center bg-transparent h-full bg-white w-full text-5xl font-bold gap-3 ">
          <div>Quizzing is the future of learning.</div>
          <div>We craft quizzes that inspire.</div>
          <div>We create quizzes that engage and educate.</div>
        </div>
      </div>

        <div className="overflow-x-hidden h-72 flex justify-center bg-white main-container">
          <div className="flex flex-row items-center justify-center gap-10 mb-10 w-full line_1" ref={line1Ref}>
            <div className="text-7xl font-extrabold " ><div className="inner_line" ref={innerline}>Features</div></div>
            <AnimatedTooltip items={item_1} />
            <div className="text-7xl font-extrabold"><div className="inner_line" ref={innerline}>Activities</div></div>
            <AnimatedTooltip items={item_2} />
            <div className="text-7xl font-extrabold"><div className="inner_line" ref={innerline}>Learning</div></div>
            <AnimatedTooltip items={item_3} />
          </div>
        </div>

      {/* different features components */}

      {/* Features */}
      <div className="" id="Features">
      <ImagesSlider className="h-[40rem]" images={["https://i.redd.it/k42as2tql81b1.png", "https://cdn.scoreapp.com/site/uploads/2024/06/Best-quiz-platforms-for-engagement-and-learning.png", "https://file.forms.app/sitefile/10+Best-AI-Powered-Quiz-Makers-To-Boost-Engagement.png"]}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold  flex flex-col gap-5 items-center w-2/3  text-xl md:text-6xl text-center bg-clip-text text-white bg-gradient-to-b from-gray-50 to-gray-400 py-4">
          Features<br /> 
          <div className="text-base">
                Transform your educational resources into interactive quizzes instantly. Our platform leverages AI to create customized quizzes from websites, PDFs, and documents, enhancing the learning experience with engaging, adaptive content.
                Digitize and personalize your teaching materials with ease, making every lesson impactful.
          </div>
          <div className="flex gap-5 ">
            <AnimatedTooltip items={item_1} />
          </div>
        </motion.p>
      </motion.div>
    </ImagesSlider>
      </div>

      {/* Activity */}
      <div className="" id="Activities">
      <ImagesSlider className="h-[40rem]" images={["https://playcuriously.wordpress.com/wp-content/uploads/2015/01/scribble-24-sheena-monahan.jpg", "https://cdn.prod.website-files.com/634681057b887c6f4830fae2/6367ddc83a6cea4c2cb60e4f_62ba3710ad306e30be8cb99a_Team%2520Building%2520(1).png", "https://ahaslides.com/wp-content/uploads/2022/10/SEO1342-thumb.png"]}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold  flex flex-col gap-5 items-center w-2/3  text-xl md:text-6xl text-center bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Activities<br /> 
          <div className="text-base">
                Our platform’s sleek and colorful interface makes learning feel like play.
                Dive into activities with ease, thanks to a user-friendly design that’s as engaging as it is effective, keeping students motivated and excited about learning every day.
          </div>
          <div className="flex gap-5 ">
            <AnimatedTooltip items={item_2} />
          </div>
        </motion.p>
      </motion.div>
    </ImagesSlider>
      </div>

      {/* Learning */}
      <div className="" id="Learnings">
      <ImagesSlider className="h-[40rem]" images={["https://gcomm.id/wp-content/uploads/2023/02/2201_w037_n003_155b_p1_155-scaled-1024x594.jpg", "https://blog-frontend.envato.com/cdn-cgi/image/width=1278,quality=75,format=auto/uploads/sites/2/2023/11/intro-ppt-animation-tips.jpg", "https://blogs.skillovilla.com/wp-content/uploads/2021/07/3784896-scaled.jpg"]}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold flex flex-col gap-5 items-center w-2/3 text-xl md:text-6xl text-center bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Learning<br /> 
          <div className="text-base ">
                Design effective lessons, assessments, and activities for any subject or grade level.
                Our platform simplifies test prep with Focus Mode and Review & Submit features, reducing stress and improving outcomes.
                
                Ensure consistency across classrooms with seamless technology, empowering students and teachers alike.
          </div>
          <div className="flex gap-5 ">
            <AnimatedTooltip items={item_3} />
          </div>
        </motion.p>
      </motion.div>
    </ImagesSlider>
      </div>


      {/* Review */}


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