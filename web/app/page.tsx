import GoReadingbtn from "@/components/goReadingbtn";
import { PlatformStats } from "@/components/platformStats";
import { HeroBackground } from "@/components/heroBackground";
import { HowItWorksSection } from "@/components/hotItWorksSection";
import { TokenInfoSection } from "@/components/tokenInfoSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <div className="relative isolate">
          <HeroBackground />

          <section className="container mx-auto px-4 py-32">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-black mb-6 text-6xl font-bold">
                Your fortune, written in code and stars.
              </h1>
              <p className="text-muted-foreground mb-10 text-xl">
                Connect your wallet, share your birth details, and receive an
                AI-powered reading grounded in ancient astrology.
              </p>
              <div className="flex flex-col items-center gap-4">
                <GoReadingbtn />
                <p className="text-sm text-muted-foreground">
                  Powered by Solana. Pay only for what you use.
                </p>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 pb-24">
            <div className="mx-auto max-w-4xl">
              <PlatformStats />
            </div>
          </section>
        </div>

        <HowItWorksSection />
        <TokenInfoSection />
      </main>
    </div>
  );
}
