import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import HeaderProfileBtn from "./header-profile";
import LanguageSelector from "./language-selector";
import RunButton from "./run-button";
import ThemeSelector from "./theme-selector";

async function Header() {
  const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string,
  );
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-20">
      <div
        className="flex items-center justify-between
    bg-[#0e0f14] border border-white/5
    px-8 py-4 mb-6
    rounded-xl
    shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="flex items-center gap-4 group">
            {/* Logo Container */}
            <div
              className="flex items-center justify-center
          size-10 rounded-lg
          bg-linear-to-br from-blue-500/10 to-purple-500/10
          border border-white/10
          group-hover:border-white/20
          transition-all duration-300"
            >
              <Blocks className="size-5 text-blue-400 transition-transform duration-300 group-hover:rotate-6" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-wide text-white">
                CODEMON
              </span>
              <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              href="/snippets"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all",
              )}
            >
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Snippets</span>
            </Link>
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={!!convexUser?.isPro} />
          </div>
          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="
      relative flex items-center gap-2
      px-3.5 py-2 rounded-lg
      bg-amber-500/10
      border border-amber-400/20
      text-amber-300 text-sm font-medium
      hover:bg-amber-500/15
      hover:border-amber-400/40
      transition-all duration-200
      shadow-[0_0_0_rgba(0,0,0,0)]
      hover:shadow-[0_4px_20px_rgba(251,191,36,0.15)]
    "
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Pro
            </Link>
          )}

          <SignedIn>
            <div className="flex items-center gap-3">
              <RunButton />

              <div className="pl-3 border-l border-white/5">
                <HeaderProfileBtn />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
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

              <SignUpButton>
                <Button
                  className="
            h-9 px-4
            rounded-lg text-sm font-medium
            bg-blue-600 hover:bg-blue-500
            text-white
            transition-all duration-200
            shadow-[0_4px_20px_rgba(59,130,246,0.25)]
          "
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default Header;
