import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const NavigationHeader = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#0a0a0f]/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10">
      <div className="absolute inset-0 bg-[#111218]/20" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              {/* Hover glow */}
              <div className="absolute -inset-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

              {/* Logo container */}
              <div className="relative bg-[#1a1a2e] p-2 rounded-lg ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-semibold bg-linear-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  CODEMON
                </span>
                <span className="text-xs text-blue-400/60 font-medium">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Snippets Link */}
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
          </div>

          {/* Right: Pro + Profile */}
          <div className="flex items-center gap-4">
            {/* Pro Button if not Pro */}
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg
              bg-[#1a1b22]/80 hover:bg-[#1f2028]/90
              ring-1 ring-white/10 hover:ring-amber-500/30
              text-amber-400 font-medium text-sm transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium">Pro</span>
              </Link>
            </SignedOut>

            {/* Profile / User Button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
