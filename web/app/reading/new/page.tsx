"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShichenSelect } from "@/components/shichenSelect";
import { GENDER, type Gender } from "@/lib/constants/gender";
import type { Shichen } from "@/lib/constants/shichen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketGate } from "@/components/ticketGate";
import { AmbientBackground } from "@/components/ambientBackground";
import { useUserTicket } from "@/hooks/useUserTicket";
import { useConsumeTicket } from "@/hooks/useConsumeUserTicket";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewReadingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [shichen, setShichen] = useState<Shichen | "">("");
  const [location, setLocation] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = name && gender && birthDate && shichen && location;

  const { refetch } = useUserTicket();
  const { consumeTicket } = useConsumeTicket();
  const { publicKey } = useWallet();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await consumeTicket();
      if (!result) {
        setError("Failed to consume ticket");
        return;
      }

      await refetch();

      const response = await fetch("/api/generateReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          birthDate,
          shichen,
          location,
          txSignature: result.txSignature,
          walletAddress: publicKey?.toBase58(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const report = await response.json();
      router.push(`/reading/${report._id}`);
    } catch {
      setError("Submission failed, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <AmbientBackground />
      <div className="container mx-auto px-4">
        <TicketGate>
          <div className="max-w-md mx-auto py-16">
            <Link
              href="/reading"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to My Readings
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Enter Your Birth Details
              </h1>
              <p className="text-sm text-muted-foreground">
                This information shapes your natal chart calculation.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border bg-white/70 backdrop-blur-sm p-8"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={gender}
                  onValueChange={(v) => setGender(v as Gender)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Birth Hour</Label>
                <ShichenSelect value={shichen} onChange={setShichen} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Birth Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Beijing"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-3">
                <Link href="/reading" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 h-11"
                  disabled={loading || !isFormValid}
                >
                  {loading ? "Submitting..." : "Generate My Reading"}
                </Button>
              </div>
            </form>
          </div>
        </TicketGate>
      </div>
    </div>
  );
}
