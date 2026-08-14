import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import fs from "fs";

const secretKeyArray = JSON.parse(
  fs.readFileSync("/home/yannan/.config/solana/id.json", "utf-8"),
);
const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));
console.log("Base58 private key:", bs58.encode(keypair.secretKey));
console.log("Public key:", keypair.publicKey.toBase58());
