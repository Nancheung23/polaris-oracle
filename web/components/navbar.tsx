"use client"

import { Sparkles } from "lucide-react";
import Link from "next/link";
import ConnectWalletButton from "./ConnectWalletButton";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Navbar() {
    // const {data: session } = useSession();
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <Sparkles />
                    Polaris Oracle
                </Link>
                    <ConnectWalletButton />
            </div>
        </nav>
    );
}