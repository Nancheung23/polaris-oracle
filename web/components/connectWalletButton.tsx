"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Copy, LogOut, RefreshCw } from "lucide-react";

export default function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false);
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return <Button disabled>Connect Wallet</Button>;
  }

  if (connected && publicKey) {
    const address = publicKey.toBase58();
    const short = `${address.slice(0, 4)}...${address.slice(-4)}`;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">{short}</Button>}
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(address)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setVisible(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Change wallet
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => disconnect()}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <Button onClick={() => setVisible(true)}>Connect Wallet</Button>;
}
