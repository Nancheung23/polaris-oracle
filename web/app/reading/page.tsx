"use client"
import { ShichenSelect } from "@/components/shichenSelect";
import type { Shichen } from "@/lib/constants/shichen";
import { useState } from "react";

export default function Home() {
  const [shichen, setShichen] = useState<Shichen>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    
  // const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
            e.preventDefault();
    
            setError("");
            setLoading(true);
            }
    return (
    <div className="max-w-md mx-auto py-16 space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">出生时辰</label>
        <ShichenSelect value={shichen} onChange={setShichen} />
      </div>
      {/* 其他字段(性别、生日、地点)后续加在这里 */}
    </div>
  );
}