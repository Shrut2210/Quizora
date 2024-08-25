"use client"
import {useState } from "react"
import { Boxes } from "@/components/BoxesCore";
import { cn } from "@/lib/utils";
export default function LogIn() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
        <div className="h-screen relative font-serif w-full overflow-hidden bg-[#100D28] flex flex-col items-center justify-center rounded-lg ">
        
            {/* <Boxes /> */}
            <div className={cn("md:text-4xl w-3/4 h-2/3 text-xl text-white relative z-20")}>
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
        </div>
            
        </>
    )
}  

//https://codepen.io/suez/pen/XWyBpre