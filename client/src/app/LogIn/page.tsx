"use client"
import {useState } from "react"
import { Boxes } from "@/components/BoxesCore";
import { cn } from "@/lib/utils";
import { Vortex } from "@/components/Vortex";
export default function LogIn() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
        <div className="w-screen mx-auto font-serif rounded-md  h-screen overflow-hidden">
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <div className="text-white text-2xl md:text-6xl font-bold text-center w-4/5 h-3/4">
                {
                isLogin ?
                    // login side
                    <div className="flex h-full backdrop-blur-sm backdrop-filter bg-opacity-10 bg-purple-400">
                        {/* left part / login form */}
                        <div className="text-white m-5 flex w-2/5 items-center">
                                    
                            <form className="flex flex-col w-full">
                                <h1 className="text-center">Log In</h1>
                                <label htmlFor="" className="text-lg mt-16 text-start">Email</label>
                                <input type="email" placeholder="xyz@gmail.com" className="border text-xl py-1 px-2 rounded-lg outline-none hover:outline-none bg-transparent" required/>
                                    
                                <label htmlFor="" className="text-lg mt-6 text-start">Password</label>
                                <input type="password" placeholder="password" className="border text-xl py-1 px-2 rounded-lg outline-none hover:outline-none bg-transparent" required/>
                                <button type="submit" className="bg-blue-700 text-lg mt-10 py-1 rounded-md">Login</button>
                            </form>
                        </div>
                        
                        {/* right part / image / daglo */}
                        <div>

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