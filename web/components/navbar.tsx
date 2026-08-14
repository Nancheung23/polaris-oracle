"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "./connectWalletButton";
import { useUserTicket } from "@/hooks/useUserTicket";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fateDefinition", label: "Fate Definition" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { connected } = useWallet();
  const { tickets } = useUserTicket();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary"
          >
            <Sparkles />
            Polaris Oracle
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {connected && (
            <Link
              href="/reading"
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              My Readings
            </Link>
          )}
          {connected && (
            <span className="text-sm text-muted-foreground">
              {tickets ?? 0} ticket{tickets === 1 ? "" : "s"}
            </span>
          )}
          <ConnectWalletButton />
        </div>
      </div>
    </nav>
  );
}
