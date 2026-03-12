import { PublicKey } from "@solana/web3.js";

export const isMainnet = true;

export const GLOBAL_STATE_SEED = "GLOBAL_STATE_SEED";
export const PRESALE_STATE_SEED = "PRESALE_STATE_SEED";
export const VAULT_SEED = "VAULT_SEED";
export const USER_STATE_SEED = "USER_STATE_SEED";

export const DENOMINATOR = 100_000; // 100%

export const PAD_PRESALE_FEE = 5_000; // 5%

export const PRESALE_CREATE_FEE = 0.5; // SOL

export const PRESALE_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
    "6u5XvaqXctmmEKkHHTtRiDTkLvLLPYj2X1ghN3ZfYs3S",
);

export const GUMMY_TOKEN = new PublicKey(
  process.env.NEXT_PUBLIC_GUMMY_TOKEN ||
    "6dfWY4xCEf5mFxtkSBNmXDoUqQ2ponSQ631FbhThBqk4",
);

export const ADMIN_WALLET =
  process.env.NEXT_PUBLIC_ADMIN_WALLET ||
  "BX6cWeFGEcTHtiUjAHYFsxKyHFNpBJizprRYYMW9dTTR";

// JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY || "") ||
export const pk = [
  223, 23, 249, 53, 210, 103, 22, 46, 223, 88, 17, 209, 166, 226, 211, 100, 6,
  84, 89, 159, 43, 219, 13, 76, 58, 41, 120, 196, 136, 234, 118, 148, 11, 109,
  84, 48, 245, 129, 158, 153, 236, 218, 36, 38, 53, 95, 250, 219, 241, 105, 103,
  42, 20, 103, 7, 229, 208, 35, 136, 121, 42, 41, 121, 246,
];

export const LOCKER_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_LOCKER_CONTRACT_ADDRESS ||
    "6u5XvaqXctmmEKkHHTtRiDTkLvLLPYj2X1ghN3ZfYs3S",
);