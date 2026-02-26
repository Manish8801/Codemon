"use client";

import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
function HeaderProfileBtn() {
  return (
    <>
      <UserButton
        appearance={{
          elements: {
            avatarBox:
              "size-9 ring-1 ring-white/10 hover:ring-white/20 transition-all",
            userButtonPopoverCard:
              "bg-[#111218] border border-white/5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]",
            userButtonPopoverActionButton:
              "hover:bg-white/10 text-gray-300 hover:text-white transition-colors",
            userButtonPopoverFooter: "hidden",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
    </>
  );
}
export default HeaderProfileBtn;
