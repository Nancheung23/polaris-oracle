"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/button";

export default function ConnectWalletButton() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  if (connected && publicKey) {
    return (
      <Button variant="outline" onClick={() => disconnect()}>
        {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
      </Button>
    );
  }

  return (
    <Button onClick={() => setVisible(true)}>
      Connect Wallet
    </Button>
  );
}