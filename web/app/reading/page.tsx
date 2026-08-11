"use client";

import { useState } from "react";
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
import { useUserTicket } from "@/hooks/useUserTicket";
import { useConsumeTicket } from "@/hooks/useConsumeUserTicket";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ReadingPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [shichen, setShichen] = useState<Shichen>();
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
      console.log("Report:", report);
    } catch (err) {
      setError("Submission failed, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TicketGate>
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Enter Your Birth Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !isFormValid}
          >
            {loading ? "Submitting..." : "Generate My Reading"}
          </Button>
        </form>
      </div>
    </TicketGate>
  );
}
