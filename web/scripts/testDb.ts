import { connectDB } from "../lib/db";

async function test() {
  await connectDB();
  console.log("MongoDB connected");
  process.exit(0);
}

test().catch((err) => {
  console.error("Connection error:", err);
  process.exit(1);
});
