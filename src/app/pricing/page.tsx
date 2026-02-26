import LoginButton from "@/components/login-button";
import NavigationHeader from "@/components/navigation-header";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Star } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import FeatureCategory from "./_components/feature-category";
import FeatureItem from "./_components/feature-item";
import ProPlanView from "./_components/pro-plan-view";
import UpgradeButton from "./_components/upgrade-button";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20 selection:text-blue-200">
      <NavigationHeader />

      <main className="relative pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <div className="relative inline-block">
              <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6">
                Elevate Your <br /> Development Experience
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join the next generation of developers with our professional suite
              of tools
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative bg-[#12121a] rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e2e] flex items-center justify-center mb-4 ring-1 ring-gray-800/60 group-hover:ring-blue-500/20">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5">
              {/* Header */}
              <div className="relative p-8 md:p-12 text-center">
                <div className="inline-flex p-3 rounded-xl bg-[#1e1e2e] ring-1 ring-gray-800/60 mb-6">
                  <Star className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-semibold text-white mb-4">
                  Lifetime Pro Access
                </h2>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-2xl text-gray-400">$</span>
                  <span className="text-6xl font-semibold text-white">39</span>
                  <span className="text-xl text-gray-400">one-time</span>
                </div>
                <p className="text-gray-400 text-lg">
                  Unlock the full potential of CodeCraft
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-12 px-8 pb-12">
                <FeatureCategory label="Development">
                  {FEATURES.development.map((feature, idx) => (
                    <FeatureItem key={feature + idx}>{feature}</FeatureItem>
                  ))}
                </FeatureCategory>

                <FeatureCategory label="Collaboration">
                  {FEATURES.collaboration.map((feature, idx) => (
                    <FeatureItem key={feature + idx}>{feature}</FeatureItem>
                  ))}
                </FeatureCategory>

                <FeatureCategory label="Deployment">
                  {FEATURES.deployment.map((feature, idx) => (
                    <FeatureItem key={feature + idx}>{feature}</FeatureItem>
                  ))}
                </FeatureCategory>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center pb-8 gap-4">
                <SignedIn>
                  <UpgradeButton />
                </SignedIn>

                <SignedOut>
                  <LoginButton />
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default PricingPage;
