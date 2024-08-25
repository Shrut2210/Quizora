"use client"
import {useState } from "react"
import { Boxes } from "@/components/BoxesCore";
import { cn } from "@/lib/utils";
import { Vortex } from "@/components/Vortex";
export default function LogIn() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
        <div className="w-screen mx-auto rounded-md  h-screen overflow-hidden">
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
            >
                <div className="text-white text-2xl md:text-6xl font-bold text-center">
                {
                isLogin ?
                    // login side
                    <div className="flex h-full backdrop-blur-sm backdrop-filter bg-opacity-10">
                        {/* left part / login form */}
                        <div className="text-white m-5 ">
                                    
                            <form className="flex flex-col">
                                <h1 className="text-center">Login</h1>
                                <label htmlFor="" className="text-xl">Email</label>
                                <input type="email" placeholder="xyz@gmail.com" className="outline-none hover:outline-none bg-transparent rounded-md" required/>
                                    
                                <label htmlFor="">Password</label>
                                <input type="password" placeholder="password" className="outline-none hover:outline-none bg-transparent" required/>
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