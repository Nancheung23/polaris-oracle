"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    id: "connect",
    title: "Connect & Buy",
    description:
      "Connect your Solana wallet and buy a reading ticket. Pay only for what you use, no subscriptions.",
    image: "/showcase/step-connect.png",
  },
  {
    id: "details",
    title: "Enter Your Details",
    description:
      "Share your name, birth date, time, and location. Your chart is calculated using traditional Zi Wei Dou Shu methodology.",
    image: "/showcase/step-details.png",
  },
  {
    id: "reading",
    title: "Get Your Reading",
    description:
      "Receive a full AI-powered reading covering your personality, career, wealth, relationships, and decade-by-decade life timeline.",
    image: "/showcase/step-reading.png",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-2">How it works</h2>
        <p className="text-muted-foreground text-center mb-12">
          From wallet to reading in three steps.
        </p>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-3">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "w-full text-left rounded-lg border p-4 transition-colors",
                  activeStep === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="relative aspect-4/3 rounded-xl border bg-muted overflow-hidden">
            <Image
              key={current.id}
              src={current.image}
              alt={current.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top animate-in fade-in duration-300"
            />
          </div>
        </div>
        <div className="text-center mt-14">
          <Link
            href="/fateDefinition"
            className="group inline-flex items-center gap-2 text-base font-medium text-primary border-b-2 border-transparent hover:border-primary transition-colors pb-1"
          >
            See how your reading is calculated
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
