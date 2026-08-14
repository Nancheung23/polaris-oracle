import { AmbientBackground } from "@/components/ambientBackground";
import { GitCompareArrows, CheckCircle2, Clock } from "lucide-react";

const SHIPPED_FEATURES = [
  "AI-generated Zi Wei Dou Shu readings covering personality, career, wealth, relationships, and decade-by-decade timelines",
  "On-chain ticketing on Solana — buy once, use once, no subscriptions",
  "Per-reading AI payment via the x402 protocol, with a portion of every payment burned",
  "Multi-reading history — generate and revisit as many readings as you like",
];

const UPCOMING_FEATURES = [
  "Daily fortune / short daily reading based on your existing natal chart",
  // TODO: 补充其他计划中的功能
];

export default function AboutPage() {
  return (
    <div className="relative">
      <AmbientBackground />
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        {/* 履历介绍 */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-6">About</h1>
          <div className="rounded-2xl border bg-white/70 backdrop-blur-sm p-8">
            {/* TODO: 替换成真实履历/自我介绍 */}
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hi, I&apos;m [YOUR NAME]. I&apos;m a [YOUR ROLE/BACKGROUND],
              building Polaris Oracle as a way to combine my interest in [Zi Wei
              Dou Shu / blockchain / AI — 按实际情况改] with hands-on Solana
              development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {/* TODO: 补充第二段，比如项目缘起、你的技术栈背景等 */}
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

        {/* 已上线功能 */}
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

        {/* 待开发功能 */}
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
            These are ongoing ideas, not commitments — timelines may shift as
            the project evolves.
          </p>
        </section>
      </div>
    </div>
  );
}
