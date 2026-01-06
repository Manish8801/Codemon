import { Zap } from "lucide-react";
import Link from "next/link";

const CHEKOUT_URL =
  "https://codemon.lemonsqueezy.com/checkout/buy/42a9a7fc-551f-472e-951a-0cabd3eee61d";
export default function UpgradeButton() {
  return (
    <Link
      href={CHEKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}
