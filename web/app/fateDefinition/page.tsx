import { Sparkles, Calendar, Bot, Coins } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: Sparkles,
    title: "Your birth chart",
    description:
      "We calculate your natal chart using Zi Wei Dou Shu (紫微斗数), a centuries-old Chinese astrological system. From your birth date, time, and gender, we derive your twelve palaces, major and minor stars, and the Four Transformations that shape your natal chart — all computed deterministically, the same way a human astrologer would work from a physical chart.",
  },
  {
    icon: Calendar,
    title: "Decade and yearly cycles",
    description:
      "Beyond your natal chart, we calculate the ten-year decade cycles (大限) and their corresponding yearly transits for the first eight decades of your life — each year mapped to a palace and its own set of transformations.",
  },
  {
    icon: Bot,
    title: "AI-assisted interpretation",
    description:
      "The structural data from your chart is passed to an AI model, which writes your reading in plain, accessible English — translating traditional astrological patterns into a personality profile and life guidance you can actually use, without requiring any prior knowledge of Chinese astrology.",
  },
  {
    icon: Coins,
    title: "Paid for on-chain, per reading",
    description:
      "Every reading is paid for individually using the x402 payment protocol on Solana — no subscriptions, no accounts beyond your wallet. A portion of each payment is burned, permanently reducing the token supply.",
  },
];

export default function FateDefinitionPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-20 -left-20 h-105 w-105 rounded-full bg-indigo-100/60 blur-3xl motion-safe:animate-[float-a_16s_ease-in-out_infinite]" />
          <div className="absolute top-0 right-0 h-95 w-95 rounded-full bg-amber-100/50 blur-3xl motion-safe:animate-[float-b_18s_ease-in-out_infinite]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-white" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            How your reading is made
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A transparent look at the methodology behind every Polaris Oracle
            reading.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-6 top-6 bottom-6 w-px bg-border"
            />

            <div className="space-y-12">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="pt-1.5">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Step {index + 1}
                      </p>
                      <h2 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/reading">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Your Reading
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
