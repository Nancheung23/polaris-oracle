import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import bs58 from "bs58";

const NEW_MINT_ADDRESS = "CU8bWG3wCK2FX8w7qc4P7FF2CKaTxt3Q3xR3HfCDDMeS";
const TOKEN_NAME = "Polaris Oracle Token";
const TOKEN_SYMBOL = "POT";
const METADATA_URI =
  "https://raw.githubusercontent.com/Nancheung23/polaris-oracle/refs/heads/main/web/public/metadata.json";

async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );

  const authoritySecret = process.env.ADMIN_WALLET_SECRET_KEY;
  if (!authoritySecret) throw new Error("Missing ADMIN_WALLET_SECRET_KEY");
  const authority = Keypair.fromSecretKey(bs58.decode(authoritySecret));

  const mint = new PublicKey(NEW_MINT_ADDRESS);

  const [metadataPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    METADATA_PROGRAM_ID,
  );

  const ix = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPda,
      mint,
      mintAuthority: authority.publicKey,
      payer: authority.publicKey,
      updateAuthority: authority.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        data: {
          name: TOKEN_NAME,
          symbol: TOKEN_SYMBOL,
          uri: METADATA_URI,
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null,
        },
        isMutable: true,
        collectionDetails: null,
      },
    },
  );

  const tx = new Transaction().add(ix);
  const sig = await sendAndConfirmTransaction(connection, tx, [authority]);

  console.log("Metadata created. Tx:", sig);
  console.log("Metadata PDA:", metadataPda.toBase58());
}

main().catch(console.error);
