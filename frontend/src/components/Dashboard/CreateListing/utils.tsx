import {
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";

import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    MINT_SIZE,
    // createAccount,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    getAccount,
    getMint,
    getAssociatedTokenAddress,
    getMinimumBalanceForRentExemptMint,
    createInitializeMintInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction,
    createInitializeAccountInstruction,
    getTransferFeeConfig,
} from "@solana/spl-token";

import {
    createCreateMetadataAccountV3Instruction,
    createUpdateMetadataAccountV2Instruction,
    PROGRAM_ID as METADATA_SPL_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

// import uploadOnArweave from "./Arweave/arweave.js";

import { connection } from "@/contract/launchpad/keys";
import { CreateTokenFormData } from "./types";
import { uploadArweave } from "@/lib/api";
import { IMetaData } from "@/lib/api/types";

export const createSPLToken = async (
    wallet: any,
    ownerWallet: string,
    formData: CreateTokenFormData

): Promise<{ tx: Transaction | null ; mintKeypair: Keypair }> => {
    let owner = wallet.publicKey; //new PublicKey(ownerWallet);
    let payer = wallet;
    let mintKeypair = Keypair.generate();
    let mintKey = mintKeypair.publicKey;
    const mintAuthority = wallet.publicKey;
    const freezeAuthority = wallet.publicKey;

    // Create Token
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const tokenATA = await getAssociatedTokenAddress(mintKey, owner);

    const tx = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mintKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
            mintKey,
            formData.decimals,
            mintAuthority,
            freezeAuthority,
            TOKEN_PROGRAM_ID,
        ),
        createAssociatedTokenAccountInstruction(
            payer.publicKey,
            tokenATA,
            owner,
            mintKey,
        ),
        createMintToInstruction(
            mintKey,
            tokenATA,
            mintAuthority,
            BigInt(formData.totalSupply * Math.pow(10, formData.decimals)),
        ),
    );


    const metadata: IMetaData = {
        name: formData.name,
        symbol: formData.symbol,
        decimal: formData.decimals,
        totalSupply: formData.totalSupply,
        description: formData.description,
        image: formData.icon?.url,
        website: formData.website,
        twitter: formData.twitter,
        telegram: formData.telegram,
        discord: formData.discord
    }

    const { url } = await uploadArweave(metadata);
    if (url == undefined) {
        return { tx: null, mintKeypair };
    }
    console.log("Metadata Uri: ", url);

    const [metadataPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("metadata"), METADATA_SPL_PROGRAM_ID.toBuffer(), mintKey.toBuffer()],
        METADATA_SPL_PROGRAM_ID,
    );

    const tokenMetadata = {
        name: formData.name,
        symbol: formData.symbol,
        uri: url,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
    };

    tx.add(
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mintKey,
                mintAuthority: wallet.publicKey,
                payer: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            },
            {
                createMetadataAccountArgsV3: {
                    data: tokenMetadata,
                    isMutable: true,
                    collectionDetails: null,
                },
            },
        )
    );


    return { tx, mintKeypair };
};
