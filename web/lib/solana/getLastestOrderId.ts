import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { getProgram } from "@/lib/program";
import { PROGRAM_ID, ADMIN } from "@/lib/constants";
import { RPC_URL } from "../constants/constants";

export async function getLatestOrderId(walletAddress: string): Promise<number> {
  const connection = new Connection(RPC_URL, "confirmed");

  const dummyWallet = {
    publicKey: PublicKey.default,
    signTransaction: async (tx: never) => tx,
    signAllTransactions: async (txs: never) => txs,
  };

  const provider = new AnchorProvider(connection, dummyWallet as never, {});
  const program = getProgram(provider);

  const userPubkey = new PublicKey(walletAddress);
  const [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), ADMIN.toBuffer(), userPubkey.toBuffer()],
    PROGRAM_ID,
  );

  const account = await program.account.userState.fetch(userPda);
  return Number(account.lastOrderId);
}
