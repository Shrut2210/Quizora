"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Vortex } from "@/components/Vortex";
import "./style.scss";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import glogo from "../../../public/assets/google-logo.png";
import { Toaster, toast } from "react-hot-toast"; // Import Toaster and toast

export default function SignUp() {
  const [switched, setSwitched] = useState(false);

  return (
    <div className="w-screen mx-auto font-serif rounded-md h-screen overflow-hidden">
      <Toaster /> {/* Add Toaster here to display toast notifications */}
      <Vortex
        backgroundColor="black"
        baseHue={950}
        rangeY={400}
        particleCount={300}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="text-white text-2xl md:text-6xl font-bold text-center backdrop-blur-sm backdrop-filter bg-opacity-20 w-4/5 h-3/4">
          <div className="local-container w-full h-full">
            <div className={cn("demo w-full h-full", { "s--switched": switched })}>
              <div className="demo__inner">
                <div className="demo__forms">
                  <div className="demo__form">
                    <div className="demo__form-content h-full w-full">
                      <FakeForm
                        fields={["email", "password"]}
                        submitLabel="Sign in"
                      />
                    </div>
                  </div>
                  <div className="demo__form">
                    <div className="demo__form-content h-full w-full">
                      <FakeForm
                        fields={["username", "email", "password"]}
                        submitLabel="Sign up"
                      />
                    </div>
                  </div>
                </div>
                <div className="demo__switcher">
                  <div className="demo__switcher-inner">
                    <div className="demo__switcher-content flex justify-center items-center">
                      <div className="demo__switcher-text">
                        <div>
                          <h3>New here?</h3>
                          <p>
                            Sign up and discover a great number of new opportunities!
                          </p>
                        </div>
                        <div>
                          <h3>One of us?</h3>
                          <p>
                            If you already have an account, just sign in. We've missed you!
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
      </Vortex>
    </div>
  );
}

interface FakeFormProps {
  fields: string[];
  submitLabel: string;
}

function FakeForm({ fields, submitLabel }: FakeFormProps) {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      let url = "";
      if (submitLabel === "Sign up") {
        url = "http://localhost:3000/api/auth/signup";
      } else if (submitLabel === "Sign in") {
        url = "http://localhost:3000/api/auth/signin";
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${submitLabel.toLowerCase()}`);
      }

      const result = await response.json();
      toast.success(`${submitLabel} successful!`); // Show success toast
      console.log(`${submitLabel} successful:`, result);
    } catch (error) {
      toast.error(`Error during ${submitLabel.toLowerCase()}.`); // Show error toast
      console.error(`Error during ${submitLabel.toLowerCase()}:`, error);
    }
  };

  return (
    <form
      className="form w-full h-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center">
        <Image src={logo} className="h-2/3 w-full" alt="botho" />
      </div>
      {fields.map((field) => (
        <label className="form__field" key={field}>
          <span className="form__field-label">{field}</span>
          <input
            className="form__field-input"
            type={field}
            name={field}
            value={(formData as any)[field] || ""}
            onChange={handleChange}
          />
        </label>
      ))}
      <button type="submit" className="form__submit">
        {submitLabel}
      </button>
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <span className="text-xl">Or </span>
        <Image src={glogo} alt="" className="h-8 w-8 cursor-pointer" />
      </div>
    </form>
  );
}
