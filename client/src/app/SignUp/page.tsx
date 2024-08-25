"use client"
import React, { useState } from 'react'
import { cn } from "@/lib/utils";
import ReactDOM from 'react-dom'
import { Vortex } from "@/components/Vortex";
import "./style.scss"
import Spline from '@splinetool/react-spline';
import logo from "../../../public/assets/logo.png"
import glogo from "../../../public/assets/google-logo.png";
import Image from 'next/image';
export default function SignUp() {
  const [switched, setSwitched] = useState(false);
    return (
      <div className="w-screen mx-auto font-serif rounded-md  h-screen overflow-hidden">
            <Vortex
                    backgroundColor="black"
                    baseHue={950}
                    // baseSpeed={1}
                    // rangeSpeed={15}
                    rangeY={400}
                    particleCount={300}
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                    <div className="text-white text-2xl md:text-6xl font-bold text-center backdrop-blur-sm backdrop-filter bg-opacity-20 w-4/5 h-3/4">
    <div className="local-container w-full h-full">
      <div className={cn('demo w-full h-full', { 's--switched': switched })}>
        <div className="demo__inner">
          <div className="demo__forms">
            <div className="demo__form">
              <div className="demo__form-content h-full w-full">
                <FakeForm
                  fields={['email', 'password']}
                  submitLabel="Sign in"
                />
              </div>
            </div>
            <div className="demo__form">
              <div className="demo__form-content h-full w-full">
                <FakeForm
                  fields={['username', 'email', 'password']}
                  submitLabel="Sign up"
                />
              </div>
            </div>
          </div>
          <div className="demo__switcher">
            <div className="demo__switcher-inner">
              <div className="demo__switcher-content flex justify-center items-center">
                <div className="demo__switcher-text">
                    <div className=''>
                        <div >
                        {/* <Spline scene="https://prod.spline.design/qJO6EDvqMObwesFE/scene.splinecode" /> */}
                        </div>
                            <h3>New here?</h3>
                        <p>
                        Sign up and discover great amount of new opportunities!
                        </p>
                  </div>
                  <div>
                  <div >
                        {/* <Spline scene="https://prod.spline.design/qJO6EDvqMObwesFE/scene.splinecode" /> */}
                        </div>
                    <h3>One of us?</h3>
                    <p>
                      If you already has an account, just sign in. We&apos;ve
                      missed you!
                    </p>
                  </div>
                </div>
                <button
                  className="demo__switcher-btn"
                  onClick={() => setSwitched(!switched)}
                >
                    <span className="animated-border" />
                  <span className="demo__switcher-btn-inner">
                    <span>Sign Up</span>
                    <span>Log In</span>
                  </span>  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
                </div>
                </div>
                
                </Vortex></div>
  );
}

interface FakeFormProps {
  fields: string[];
  submitLabel: string;
}

function FakeForm({  fields, submitLabel }: FakeFormProps) {
  return (
    <form className="form w-full h-full flex flex-col justify-center items-center" onSubmit={(e) => e.preventDefault()}>
          <div className=" flex justify-center items-center ">
              <Image src={logo} className="h-2/3 w-full" alt="botho" />
          </div>
      {fields.map((field) => (
        <label className="form__field" key={field}>
          <span className="form__field-label">{field}</span>
          <input className="form__field-input" type={field} />
        </label>
      ))}
      <button type="submit" className="form__submit">
        {submitLabel}
      </button>
          <div className='flex flex-col items-center justify-center gap-4 py-4'><span className="text-xl">Or </span>
              <Image src={glogo} alt="" className="h-8 w-8 cursor-pointer" /></div>
    </form>
  );
}

