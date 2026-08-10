import mongoose, { Schema, Document } from "mongoose";
import { GENDER, Gender } from "../constants/gender";
import { SHICHEN, Shichen } from "../constants/shichen";

export interface IReport extends Document {
  walletAddress: string;
  txSignature: string;
  orderId: number;
  name: string;
  gender: Gender;
  birthDate: Date;
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
      [key: string]: string | undefined;
    };
    details?: string[];
    summary?: string;
  };
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  expiresAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    walletAddress: {
      type: String,
      required: true,
      index: true,
    },
    txSignature: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
      enum: GENDER.map((g) => g.value),
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    shichen: {
      type: String,
      enum: SHICHEN.map((s) => s.value),
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    reportContent: {
      basic: {
        type: String,
      },
      overview: {
        type: String,
      },
      analysis: {
        type: String,
      },
      topics: {
        type: Map,
        of: String,
      },
      details: [
        {
          type: String,
        },
      ],
      summary: {
        type: String,
      },
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Report ||
  mongoose.model<IReport>("Report", ReportSchema);
