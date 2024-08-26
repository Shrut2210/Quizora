"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png" 
import Spline from '@splinetool/react-spline/next';
import Link from "next/link";
import bg_1 from "../../public/assets/bg-1.png";
import { AnimatedTooltip } from "@/components/AnimatedTooltip";
import "./style.css";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "",
  },
];

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <div className="sticky p-5 flex justify-between items-center  w-full "> 
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

    <div className="h-screen w-screen absolute -z-10 top-0 " >
        <Image src={bg_1} alt="botho" className="h-full w-full"/>
        <div className="h-full w-full bg-[#100D28] bg-opacity-80 absolute top-0 "></div>
    </div>
      
      <div className="h-60 relative">

      </div>

      {/* smalll details sectoion */}

      <div className="h-96 flex overflow-hidden">
        <div className="flex flex-col justify-center items-center bg-transparent h-full bg-white w-full text-5xl font-bold gap-3 ">
          <div>Quizzing is the future of learning.</div>
          <div>We craft quizzes that inspire.</div>
          <div>We create quizzes that engage and educate.</div>
        </div>
      </div>

        <div className="overflow-hidden h-72 flex justify-center bg-white">
          <div className="flex flex-row items-center justify-center gap-10 mb-10 w-full">
            <div className="text-9xl font-extrabold">Features</div>
            <AnimatedTooltip items={people} />
            <div className="text-9xl font-extrabold">Activities</div>
            <AnimatedTooltip items={people} />
            <div className="text-9xl font-extrabold">Learning</div>
            <AnimatedTooltip items={people} />
          </div>
        </div>

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