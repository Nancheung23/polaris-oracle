import { Connection } from "@solana/web3.js";
import { PROGRAM_ID } from "@/lib/constants";
import idl from "@/lib/idl.json";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { RPC_URL } from "../constants/constants";

interface VerifyResult {
  valid: boolean;
  reason?: string;
  orderId?: number;
}

export async function verifyConsumeTicketTx(
  txSignature: string,
  walletAddress: string,
): Promise<VerifyResult> {
  const connection = new Connection(RPC_URL, "confirmed");
  const tx = await connection.getParsedTransaction(txSignature, {
    maxSupportedTransactionVersion: 0,
  });
  // is exist?
  if (!tx) {
    return { valid: false, reason: "Transaction not found" };
  }
  // is succeed?
  if (tx.meta?.err) {
    return { valid: false, reason: "Transaction failed on-chain" };
  }

  const signer = tx.transaction.message.accountKeys[0].pubkey.toBase58();
  // is same wallet?
  if (signer !== walletAddress) {
    return { valid: false, reason: "Signer does not match claimed wallet" };
  }
  // is consume ticket?
  const consumeTicketInstruction = idl.instructions.find(
    (ix) => ix.name === "consume_ticket",
  );
  if (!consumeTicketInstruction?.discriminator) {
    return {
      valid: false,
      reason: "Consume ticket discriminator not found in IDL",
    };
  }

  const consumeTicketDiscriminator = consumeTicketInstruction.discriminator;
  const ix = tx.transaction.message.instructions.find(
    (instruction) => instruction.programId.toBase58() === PROGRAM_ID.toBase58(),
  );
  // exist instruction?
  if (!ix) {
    return { valid: false, reason: "No instruction found for our program" };
  }
  // exist data?
  if (!("data" in ix) || typeof ix.data !== "string") {
    return {
      valid: false,
      reason: "Instruction data missing or invalid format",
    };
  }
  const ixData = bs58.decode(ix.data);
  for (let i = 0; i < consumeTicketDiscriminator.length; i++) {
    // compare discriminator
    if (ixData[i] !== consumeTicketDiscriminator[i]) {
      return {
        valid: false,
        reason: "Instruction discriminator does not match consume_ticket",
      };
    }
  }

  // success
  return { valid: true };
}
