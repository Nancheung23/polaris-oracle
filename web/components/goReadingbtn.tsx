"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function GoReadingbtn() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  const handleClick = () => {
    if (connected) {
      router.push("/reading"); 
    } else {
      setVisible(true); 
    }
  };

  return (
    <Button size="lg" className="h-12 px-8 text-lg font-medium" onClick={handleClick}>
      Get Your Reading <ArrowRight className="ml-2" />
    </Button>
  );
}