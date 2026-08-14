"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ComingSoonButtonProps {
  label: string;
  message?: string;
}

export function ComingSoonButton({
  label,
  message = "This feature is coming soon.",
}: ComingSoonButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="relative">
      <Button variant="outline" className="w-full" onClick={handleClick}>
        <Sparkles className="h-4 w-4 mr-2" />
        {label}
      </Button>
      {showToast && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-11 z-30 whitespace-nowrap rounded-lg bg-foreground text-background text-xs px-3 py-2 shadow-lg animate-in fade-in slide-in-from-bottom-1 duration-200">
          {message}
        </div>
      )}
    </div>
  );
}
