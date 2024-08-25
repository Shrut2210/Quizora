"use client"
import {useState } from "react"
import { Boxes } from "@/components/BoxesCore";
import { cn } from "@/lib/utils";
import { Vortex } from "@/components/Vortex";
import logo from "../../../public/assets/logo.png"
import Image from "next/image";
import Spline from '@splinetool/react-spline/next';

export default function LogIn() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
        <div className="w-screen mx-auto font-serif rounded-md  h-screen overflow-hidden">
            <Vortex
                    backgroundColor="black"
                    baseHue={950}
                    // baseSpeed={1}
                    // rangeSpeed={15}
                    rangeY={400}
                    particleCount={300}
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <div className="text-white text-2xl md:text-6xl font-bold text-center w-4/5 h-3/4">
                {
                isLogin ?
                    // login side
                    <div className="flex h-full backdrop-blur-sm backdrop-filter bg-opacity-20">
                        {/* left part / login form */}
                        <div className="text-white flex w-1/2 justify-center items-center">
                                    
                            <form className="flex flex-col justify-center p-5 w-4/5">
                                <div className="flex justify-center items-center">
                                    <Image src={logo} className="h-1/2 w-1/2 " alt="botho"/>
                                </div>
                                <label htmlFor="" className="text-xl text-start py-2">Email</label>
                                <input type="email" placeholder="xyz@gmail.com" className="border text-xl py-2 px-3 rounded-lg outline-none hover:outline-none bg-transparent" required/>
                                    
                                <label htmlFor="" className="text-xl mt-3 text-start py-2">Password</label>
                                <input type="password" placeholder="password" className="border text-xl py-2 px-3 rounded-lg outline-none hover:outline-none bg-transparent" required/>
                                <button type="submit" className="bg-[#9207E6] text-xl mt-10 py-2 rounded-md">Login</button>
                            </form>
                        </div>
                        
                        {/* right part / image / daglo */}
                        <div>
                        <Spline
                            scene="https://prod.spline.design/yl3wQjmKd9PymIVA/scene.splinecode" 
                        />
                        </div>
                    </div> :
                    // signup side
                    <div></div>
            }
                </div>
            </Vortex>
    </div>
            
            
        </>
    )
}  

//https://codepen.io/suez/pen/XWyBpre