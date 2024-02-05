// pages/auth/signin.js
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn("github"); // Specify the provider you want to use

    // Check if authentication was successful and redirect
    if (result?.error) {
      // Handle authentication error if needed
      console.error("Authentication failed:", result.error);
    }
  };

  return (
    <div>
      <h1>Custom Sign-In Page</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
