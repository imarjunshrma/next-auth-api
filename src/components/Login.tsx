/* The code you provided is a TypeScript React component for a login form. */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password)
    axios.post("/api/login", {
      email, password
    }).then(res => console.log(res)).catch(err => console.log(err))
  }
  return (
    <section className="text-gray-600 body-font relative bg-[#edf5ff] h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col  w-[40%] mb-12 mx-auto  bg-white px-10 py-20">
          <h1 className="pb-5 text-center text-black">login Form</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <h3>Don't have an Account? <span className="text-blue-900">
                <Link href="/signup">
                  Sign Up
                </Link>
              </span> </h3>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
};

export default Login;
