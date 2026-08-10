import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  walletAddress: string;
  firstSeenAt: Date;
  lastActiveAt: Date;
  reportCount: number;
}

const UserSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "firstSeenAt", updatedAt: false },
  },
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
