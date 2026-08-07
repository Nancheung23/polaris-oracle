import { AnchorProvider, Program } from "@coral-xyz/anchor";
import idl from "./idl.json";
import { PROGRAM_ID } from "./constants";
import type { Anchor } from "./types/anchor";

export function getProgram(provider: AnchorProvider) {
  return new Program<Anchor>(idl as Anchor, provider);
}