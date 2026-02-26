"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const LoginButton = () => {
  return (
    <SignInButton>
      <Button
        variant="ghost"
        className="
            h-9 px-4
            bg-[#14151b] border border-white/5
            hover:border-white/10 hover:bg-[#1a1b22]
            text-gray-300 hover:text-white
            rounded-lg text-sm font-medium
            transition-all duration-200
          "
      >
        Sign In
      </Button>
    </SignInButton>
  );
};

export default LoginButton;
