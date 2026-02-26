import { Zap } from "lucide-react";
import Link from "next/link";

const CHEKOUT_URL =
  "https://codemon.lemonsqueezy.com/checkout/buy/42a9a7fc-551f-472e-951a-0cabd3eee61d";
export default function UpgradeButton() {
  return (
    <Link
      href={CHEKOUT_URL}
      className="
    inline-flex items-center justify-center gap-2 px-6 py-3
    bg-[#1a1b22] hover:bg-[#1f2028]
    ring-1 ring-white/10 hover:ring-blue-500/30
    text-white font-medium text-sm
    rounded-lg transition-all duration-200
  "
    >
      <Zap className="w-5 h-5 text-blue-400" />
      Upgrade to Pro
    </Link>
  );
}
