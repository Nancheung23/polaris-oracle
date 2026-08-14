"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SHICHEN, type Shichen } from "@/lib/constants/shichen";

interface ShichenSelectProps {
  value: Shichen | "";
  onChange: (value: Shichen) => void;
}

export function ShichenSelect({ value, onChange }: ShichenSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Shichen)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select birth hour" />
      </SelectTrigger>
      <SelectContent>
        {SHICHEN.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label} ({item.range})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
