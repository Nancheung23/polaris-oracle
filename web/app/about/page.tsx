import { AmbientBackground } from "@/components/ambientBackground";
import { GitCompareArrows, CheckCircle2, Clock } from "lucide-react";

const SHIPPED_FEATURES = [
  "Full natal chart calculation using traditional Zi Wei Dou Shu (紫微斗数) methodology: \ntwelve palaces, major and minor stars, natal Four Transformations, and flying self-transformations, all computed deterministically",
  "Decade and yearly cycle mapping across the first eight decades of life, showing which palace governs each period and how the Four Transformations shift year to year",
  "AI-written readings that translate the raw chart data into plain-English personality insights and practical guidance: \nno astrology background required to understand your own reading",
  "On-chain ticketing on Solana: \nbuy a ticket once, consume it once, no subscriptions or recurring charges",
  "Per-reading AI inference paid for via the x402 payment protocol, with a portion of every payment burned on-chain",
  "Multi-reading history: \ngenerate and revisit as many readings as you like, each tied to your wallet",
];

const UPCOMING_FEATURES = [
  "Daily fortune: \nshort daily reading based on your existing natal chart",
  "Airdrop campaigns for loyal users",
  "Team-initiated token burns, announced transparently",
  "Ticket gifting between wallets",
];

export default function AboutPage() {
  return (
    <div className="relative">
      <AmbientBackground />
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-6">About</h1>
          <div className="rounded-2xl border bg-white/70 backdrop-blur-sm p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hi, I&apos;m Nan. I&apos;m a ICT student from TAMK(Tampere
              University of Applied Sciences), building Polaris Oracle as a way
              to put my interest in fullstack development and blockchain into
              practice.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m interested in fullstack development and blockchain, this
              project started because I wanted to build something I&apos;d
              actually use myself.
            </p>
            <a
              href="https://github.com/Nancheung23"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium hover:text-primary transition"
            >
              <GitCompareArrows className="h-4 w-4" />
              @Nancheung23 on GitHub
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            What Polaris Oracle does today
          </h2>
          <ul className="space-y-3">
            {SHIPPED_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">What&apos;s coming</h2>
          <ul className="space-y-3">
            {UPCOMING_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Clock className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-6">
            These are ongoing ideas, not commitments, timelines may shift as the
            project evolves.
          </p>
        </section>
      </div>
    </div>
  );
}
