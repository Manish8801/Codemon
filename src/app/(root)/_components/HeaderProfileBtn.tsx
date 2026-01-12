"use client";

import { Button } from "@/components/ui/button";
import useMounted from "@/hooks/useMounted";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  const mounted = useMounted();

  if (!mounted)
    return <div className="size-8 rounded-full bg-gray-800 animate-pulse" />;
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton >
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
export default HeaderProfileBtn;
