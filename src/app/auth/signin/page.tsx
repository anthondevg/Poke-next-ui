// pages/auth/signin.js
"use client";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const result = await signIn("github"); // Specify the provider you want to use

    // Check if authentication was successful and redirect
    if (result?.error) {
      // Handle authentication error if needed
      console.error("Authentication failed:", result.error);
    }
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const result = await signIn("credentials", {
  //     user,
  //     password,
  //     redirect: false,
  //     callbackUrl: "/pokedex",
  //   });

  //   if (result.error) {
  //     console.log(result.error);
  //   }
  // };

  return (
    <div className="relative overflow-hidden">
      <div className="w-full grid md:grid-cols-6 grid-cols-4 z-0">
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r"></div>
        <div className="h-screen border-r-[#000041] border-r hidden md:block"></div>
        <div className="h-screen border-r-[#000041] border-r hidden md:block"></div>
      </div>

      <nav>
        <a className="absolute right-5 top-5 text-cyan-pkn" href="/">
          Home
        </a>
      </nav>

      <p className="text-center py-4">Developed by Anthondev</p>
      <header className="flex w-full justify-center flex-col items-center mt-52 gap-4 px-12 absolute top-0 z-50">
        <div className="flex gap-1 align-middle items-center  p-4 relative">
          <h1 className="text-cyan-300 text-2xl lg:text-4xl uppercase font-bold">
            <span className="text-red-pkn">Pokenext</span>-UI
          </h1>

          <Image src={"/Pikachu.png"} width={70} height={70} alt="pikachu" />
          <div className="border-dashed border h-12 w-20 border-white/30 absolute top-3 -left-2"></div>
        </div>

        <div className="text-center flex flex-col relative gap-6">
          <div className="border-dashed border h-32 w-32 border-white/30 absolute -top-2 -left-2"></div>
        </div>

        <Button className="flex items-center" onClick={handleSignIn}>
          Sign in with Github{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-white ml-2"
            fill="white"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Button>

        {/* <form className="flex flex-col gap-4">
          <label htmlFor="user" className="text-2xl font-bold">
            Username
          </label>

          <input
            name="user"
            placeholder="Ash"
            type="text"
            className="px-4 md:px-8 py-1 lg:py-3 bg-red-pkn font-bold lg:text-2xl hover:cursor-pointer rounded-md border-2 border-red-800 text-white-pkn hover:bg-red-pkn/75 placeholder-slate-300"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            disabled
          />

          <label htmlFor="email" className="text-2xl font-bold">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="poke123"
            className="px-4 md:px-8 py-1 lg:py-3 bg-red-pkn font-bold lg:text-2xl hover:cursor-pointer rounded-md border-2 border-red-800 text-white-pkn hover:bg-red-pkn/75 placeholder-slate-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled
          />
          <input
            type="submit"
            className="px-4 md:px-8 py-1 lg:py-3 bg-red-pkn font-bold lg:text-2xl hover:cursor-pointer rounded-md border-2 border-red-800 text-white-pkn hover:bg-red-pkn/75"
            value={"Login"}
            disabled
          />
        </form> */}
      </header>

      <div className="w-44 h-44 bg-[#01013A] bottom-2 left-0 absolute rounded-lg rotate-[165deg] animate-pulse"></div>
      <div className="w-36 h-36 bg-[#01013A] top-96 -right-20 absolute rounded-lg -rotate-[15deg] animate-pulse"></div>
    </div>
  );
};

export default SignIn;
