import type { Gender } from "@/lib/constants/gender";
import type { Shichen } from "@/lib/constants/shichen";

export interface Report {
  _id: string;
  walletAddress: string;
  name: string;
  gender: Gender;
  birthDate: string;
  shichen: Shichen;
  location: string;
  reportContent?: {
    basic?: string;
    overview?: string;
    analysis?: string;
    topics?: {
      health?: string;
      study?: string;
      business?: string;
      money?: string;
      relationship?: string;
      marriage?: string;
    };
    details?: string[];
    summary?: string;
  };
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface User {
  _id: string;
  walletAddress: string;
  firstSeenAt: string;
  lastActiveAt: string;
  reportCount: number;
}
