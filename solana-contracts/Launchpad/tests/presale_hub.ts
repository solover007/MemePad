import { expect } from 'chai';

import * as anchor from '@project-serum/anchor';
import {
    BN,
    Program,
    web3,
} from '@project-serum/anchor';
import {
    Account,
    AccountLayout,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createMint,
    getAccount,
    getAssociatedTokenAddressSync,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    TOKEN_PROGRAM_ID,
    transfer,
} from '@solana/spl-token';
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction
} from '@solana/web3.js';

import { PresaleHub } from '../target/types/presale_hub';

describe('presale_hub', () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.PresaleHub as Program<PresaleHub>;
    const PROGRAM_ID = program.programId;

    // If program is undefined, log the workspace for debugging
    if (!program) {
        console.log("Workspace Configuration:", anchor.workspace);
    }

    it('should have a valid program ID', () => {
        console.log("Program ID:", PROGRAM_ID.toString());
    });

    // Accounts and initial values
    let myBaseToken: PublicKey;
    let myBaseTokenATA: Account; // Token Account on Owner
    let myBaseTokenVaultAddress: PublicKey; //Token Account on Presale PDA
    let myBaseTokenVault: Account; //Token Account on Presale PDA
    let presalePDA: PublicKey;
    let presaleBump: number;
    let userStatePDA: PublicKey;
    let userStateBump: number;
    let marketId: PublicKey;
    let presalePDAValutPDA: PublicKey;
    let presalePDAVaultPDABump: number;
    let presalePDAValut: Account;
    let globalState: PublicKey;

    let quoteToken0: PublicKey = new PublicKey("So11111111111111111111111111111111111111112");
    let quoteToken1: PublicKey;
    let quoteToken2: PublicKey;
    let quoteToken3: PublicKey;
    let quoteToken4: PublicKey;

    let myQuoteToken0ATA: Account;
    let myQuoteToken1ATA: Account;
    let myQuoteToken2ATA: Account;
    let myQuoteToken3ATA: Account;
    let myQuoteToken4ATA: Account;

    let presaleQuoteToken0ATA: Account;
    let presaleQuoteToken1ATA: Account;
    let presaleQuoteToken2ATA: Account;
    let presaleQuoteToken3ATA: Account;
    let presaleQuoteToken4ATA: Account;

    const whitelistedTokens: PublicKey[] = [];
    let userQuoteTokenATA: Account;

    const onwerSecretKey = new Uint8Array([47, 113, 77, 68, 233, 101, 172, 57, 255, 188, 118, 14, 203, 203, 73, 96, 141, 227, 151, 24, 193, 216, 49, 22, 33, 228, 221, 188, 226, 185, 255, 2, 45, 39, 218, 90, 129, 125, 227, 138, 202, 143, 10, 78, 188, 164, 4, 248, 172, 213, 54, 117, 32, 251, 79, 74, 246, 3, 218, 90, 80, 131, 236, 72])
    const owner = Keypair.fromSecretKey(onwerSecretKey);
    const user = Keypair.generate();
    const SOL_TOKEN_PUBKEY = new PublicKey("So11111111111111111111111111111111111111112")
    const DENOMINATER = 100_000;
    const baseTokenDecimals = 9;
    const quoteTokenDecimals = 5;

    const connection = new Connection('http://localhost:8899', 'confirmed');
    const SPL_ACCOUNT_LAYOUT = AccountLayout;
    // Get TokenBalance
    const getWalletTokenAccount = async (wallet: PublicKey) => {
        const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
            programId: TOKEN_PROGRAM_ID,
        });

        return walletTokenAccount.value.map((i) => ({
            pubkey: i.pubkey,
            programId: i.account.owner,
            accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
        }));
    };

    const getWalletTokenBalance = async (
        walletPubKey: PublicKey,
        addr: any,
        decimal = 9
    ): Promise<number> => {
        const walletTokenAccounts = await getWalletTokenAccount(
            new PublicKey(walletPubKey)
        );
        let tokenBalance = 0;
        if (walletTokenAccounts && walletTokenAccounts.length > 0) {
            for (const acc of walletTokenAccounts) {
                if (acc.accountInfo.mint.toBase58() === addr) {
                    tokenBalance = Number(acc.accountInfo.amount); // / 10 ** decimal;
                    break;
                }
            }
        }

        return tokenBalance;
    };

    function numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    before(async () => {
        // Airdrop SOL to the wallet
        await provider.connection.confirmTransaction(
            await provider.connection.requestAirdrop(owner.publicKey, 2e9), // 2 SOL
            "confirmed"
        );
        var balance = await connection.getBalance(owner.publicKey);
        console.log(`Balance of owner account: ${owner.publicKey.toBase58()}: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

        await provider.connection.confirmTransaction(
            await provider.connection.requestAirdrop(user.publicKey, 2e9), // 2 SOL
            "confirmed"
        );
        balance = await connection.getBalance(user.publicKey);
        console.log(`Balance of user account: ${user.publicKey.toBase58()}: ${balance / web3.LAMPORTS_PER_SOL} SOL`);



        // Create Token Mint for myBaseToken
        myBaseToken = await createMint(
            provider.connection,
            owner,
            owner.publicKey, //mint authority
            owner.publicKey, //freeze authority
            9, // decimals
        );
        console.log(`myBaseToken Mint Address: ${myBaseToken.toBase58()}`);

        // Get or create the associated token account for the mint
        myBaseTokenATA = await getOrCreateAssociatedTokenAccount(
            connection, // connection
            owner, // payer
            myBaseToken, // mint
            owner.publicKey, // owner's public key
            true
        );
        console.log(`myBaseToken ATA Address: ${myBaseTokenATA.address.toBase58()}`);
        console.log(`myBaseToken ATA Mint Address: ${myBaseTokenATA.mint.toBase58()}`);
        console.log(`myBaseToken ATA Owner: ${myBaseTokenATA.owner.toBase58()}`);
        // Mint tokens to the token account
        await mintTo(
            connection, // connection
            owner, // payer
            myBaseToken, // mint
            myBaseTokenATA.address, // token account
            owner.publicKey, // mint authority
            1_000_000 * Math.pow(10, baseTokenDecimals) // amount
        );
        console.log(`Token Account Address: ${myBaseTokenATA.address.toBase58()}`);
        console.log(`myBaseToken Account Balance: ${(await connection.getTokenAccountBalance(myBaseTokenATA.address)).value.amount}`);

        // myQuoteToken0ATA = await getOrCreateAssociatedTokenAccount(connection, owner, quoteToken0, owner.publicKey, true);
        // console.log('myQuoteToken0ATA: ', myQuoteToken0ATA.address.toBase58());

        quoteToken1 = await createMint(provider.connection, user, user.publicKey, user.publicKey, 5);
        console.log("QuoteToken1: ", quoteToken1.toBase58());
        // myQuoteToken1ATA = await getOrCreateAssociatedTokenAccount(connection, user, quoteToken1, user.publicKey, true);

        quoteToken2 = await createMint(provider.connection, user, user.publicKey, user.publicKey, 5);
        console.log("QuoteToken2: ", quoteToken2.toBase58());
        // myQuoteToken2ATA = await getOrCreateAssociatedTokenAccount(connection, user, quoteToken2, user.publicKey, true);

        quoteToken3 = await createMint(provider.connection, user, user.publicKey, user.publicKey, 5);
        console.log("QuoteToken3: ", quoteToken3.toBase58());
        // myQuoteToken3ATA = await getOrCreateAssociatedTokenAccount(connection, user, quoteToken3, user.publicKey, true);

        quoteToken4 = await createMint(provider.connection, user, user.publicKey, user.publicKey, 5);
        console.log("QuoteToken4: ", quoteToken4.toBase58());
        // myQuoteToken4ATA = await getOrCreateAssociatedTokenAccount(connection, user, quoteToken4, user.publicKey, true);

        whitelistedTokens.push(
            quoteToken0,
            quoteToken1,
            quoteToken2,
            quoteToken3,
            quoteToken4
        );
    });

    it('should initialize a presale', async () => {
        const globalStateSeed = "GLOBAL_STATE_SEED";
        let bump: number;
        [globalState, bump] = await PublicKey.findProgramAddress(
            [Buffer.from(globalStateSeed)],
            program.programId
        )
        try {
            let tx = await program.methods
                .initialize(owner.publicKey)
                .accounts({
                    signer: owner.publicKey,
                    globalState: globalState,
                    rent: SYSVAR_RENT_PUBKEY,
                    systemProgram: SystemProgram.programId
                })
                .signers([owner])
                .rpc();

            console.log("Presale is initialized by owner", tx);

        } catch (error) {
            console.error(error);
        }
    });
    const softcapAmount = new anchor.BN(1000_000_000_000); // 1000 sol
    const hardcapAmount = new anchor.BN(10000_000_000_000); // 10000 sol
    const startTime = new anchor.BN(Math.floor(Date.now() / 1000) + 3); // 10 seconds from now
    const endTime = new anchor.BN(Math.floor(Date.now() / 1000) + 7200); // 1 hour from now
    const presalePrice = [new anchor.BN(5_000 * DENOMINATER), new anchor.BN(5_000 * DENOMINATER), new anchor.BN(5_000 * DENOMINATER), new anchor.BN(5_000 * DENOMINATER), new anchor.BN(5_000 * DENOMINATER)]; // 5,000/1sol
    const buyTokenAmount = 1;
    const listingPrice = new anchor.BN(4_000 * DENOMINATER); // 4,000 /sol
    const lpPercent = new anchor.BN(50);
    const isAutoListing = true;
    const lockPeriod = new anchor.BN(86400); // 1 day
    const minBuy = new anchor.BN(100_000_000); // 0.1 sol
    const maxBuy = new anchor.BN(10_000_000_000); // 10 sol
    const refundType = 0; // example value, replace with actual enum if applicable
    const isVesting = 0; //no vesting
    const tgeDate = new anchor.BN(new Date().getTime());
    const tgePercent = new anchor.BN(20);
    const cycleDays = new anchor.BN(30);
    const cycleReleasePercent = new anchor.BN(30);
    const padFeePct = new anchor.BN(10);
    const valid_quote_token_acount = 3;


    const quoteTokenId = 1;
    const presaleQuoteTokenATAs: Account[] = [];


    it('should create a presale', async () => {
        const PRESALE_STATE_SEED = "PRESALE_STATE_SEED";
        [presalePDA, presaleBump] = await PublicKey.findProgramAddress(
            [Buffer.from(PRESALE_STATE_SEED), myBaseToken.toBuffer()],
            program.programId
        );
        console.log(`PresalePDA: ${presalePDA.toBase58()}`);

        myBaseTokenVaultAddress = getAssociatedTokenAddressSync(myBaseToken, presalePDA, true);
        console.log(`myBaseTokenVault: ${myBaseTokenVaultAddress.toBase58()}`);

        // Create token vault associated with presale state
        // myBaseTokenVault = await getOrCreateAssociatedTokenAccount(
        //     connection,
        //     owner,
        //     myBaseToken,
        //     presalePDA,
        //     true,
        // );

        const VAULT_SEED = "VAULT_SEED";
        [presalePDAValutPDA, presalePDAVaultPDABump] = await PublicKey.findProgramAddress(
            [Buffer.from(VAULT_SEED), presalePDA.toBuffer()],
            program.programId
        );

        // Create quote token vault associated with presale state
        // presalePDAValut = await getOrCreateAssociatedTokenAccount(
        //     connection,
        //     owner,
        //     SOL_TOKEN_PUBKEY,
        //     presalePDA,
        //     true
        // );

        presaleQuoteToken0ATA = await getOrCreateAssociatedTokenAccount(connection, owner, quoteToken0, presalePDA, true);
        presaleQuoteToken1ATA = await getOrCreateAssociatedTokenAccount(connection, owner, quoteToken1, presalePDA, true);
        presaleQuoteToken2ATA = await getOrCreateAssociatedTokenAccount(connection, owner, quoteToken2, presalePDA, true);
        presaleQuoteToken3ATA = await getOrCreateAssociatedTokenAccount(connection, owner, quoteToken3, presalePDA, true);
        presaleQuoteToken4ATA = await getOrCreateAssociatedTokenAccount(connection, owner, quoteToken4, presalePDA, true);
        presaleQuoteTokenATAs.push(
            presaleQuoteToken0ATA,
            presaleQuoteToken1ATA,
            presaleQuoteToken2ATA,
            presaleQuoteToken3ATA,
            presaleQuoteToken4ATA,
        );

        let tx: string;
        try {
            tx = await program.methods
                .createPresale(
                    myBaseToken,
                    // SOL_TOKEN_PUBKEY,
                    softcapAmount,
                    hardcapAmount,
                    startTime,
                    endTime,
                    presalePrice,
                    listingPrice,
                    lpPercent,
                    isAutoListing,
                    lockPeriod,
                    minBuy,
                    maxBuy,
                    refundType,
                    isVesting,
                    tgeDate,
                    tgePercent,
                    cycleDays,
                    cycleReleasePercent,
                    padFeePct,
                    valid_quote_token_acount,
                    whitelistedTokens
                )
                .accounts({
                    authority: owner.publicKey,
                    presaleState: presalePDA,
                    vault: presalePDAValutPDA,
                    tokenVault: myBaseTokenVaultAddress,
                    tokenMint: myBaseToken,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    systemProgram: SystemProgram.programId,
                })
                .signers([owner])
                .rpc();
        } catch (err) {
            console.log("createPresale: ", err);
            return;
        }

        console.log("State is created by owner", tx);

        const amount = 500_000_000; // (Number(hardcapAmount) / LAMPORTS_PER_SOL) * (Number(presalePrice) / DENOMINATER);
        console.log("Token Amount for presale", amount);
        //Transfer tokens to presale
        // console.log("myBaseTokenVault before transfer", (await connection.getTokenAccountBalance(myBaseTokenVault)).value.amount);
        console.log("myBaseTokenATA before transfer", (await getAccount(connection, myBaseTokenATA.address)).amount);
        // console.log("myBaseTokenVault before transfer", (await getAccount(connection, myBaseTokenVault)).amount);
        try {
            await transfer(
                connection,
                owner,
                myBaseTokenATA.address,
                myBaseTokenVaultAddress,
                owner.publicKey,
                amount
            )
        } catch (err) {
            console.log("create: Transfer error: ", err);
            return;
        }

        console.log("myBaseTokenVault after transfer", (await getAccount(connection, myBaseTokenVaultAddress)).amount);
        console.log("myBaseTokenATA after transfer", (await getAccount(connection, myBaseTokenATA.address)).amount);

        const presaleAccount = await program.account.presaleState.fetch(presalePDA);
        expect(presaleAccount.tokenMintAddress.toString()).to.equal(myBaseToken.toString());
        expect(presaleAccount.softcapAmount.toNumber()).to.equal(1_000_000_000_000); // 1000 sol
        expect(presaleAccount.hardcapAmount.toNumber()).to.equal(10_000_000_000_000); // 10000 sol
        expect(presaleAccount.startTime.toNumber()).to.equal(startTime.toNumber());
        expect(presaleAccount.endTime.toNumber()).to.equal(endTime.toNumber());
        expect(presaleAccount.presalePrice[quoteTokenId].toNumber()).to.equal(presalePrice[quoteTokenId].toNumber());
        expect(presaleAccount.listingPrice.toNumber()).to.equal(listingPrice.toNumber());
        expect(presaleAccount.lpPercent.toNumber()).to.equal(lpPercent.toNumber());
        expect(presaleAccount.isAutoListing).to.equal(isAutoListing);
        expect(presaleAccount.lockPeriod.toNumber()).to.equal(lockPeriod.toNumber());
        expect(presaleAccount.minBuy.toNumber()).to.equal(minBuy.toNumber());
        expect(presaleAccount.maxBuy.toNumber()).to.equal(maxBuy.toNumber());
        expect(presaleAccount.refundType).to.equal(refundType);
        expect(presaleAccount.state).to.equal(1);
        // expect(presaleAccount.totalTokensFairlaunch.toNumber()).to.equal(totalTokensFairlaunch.toNumber());
    });

    // it('should deposit tokens', async () => {
    //     let info = await getAccount(provider.connection, myBaseTokenATA.address);
    //     console.log(`myBaseTokenATA amount: ${info.amount}`);
    //     info = await getAccount(provider.connection, myBaseTokenVault);
    //     console.log(`myBaseTokenVault amount: ${info.amount}`);
    //     try {
    //         let tx = await program.methods.depositToken(new BN(0.3 * LAMPORTS_PER_SOL))
    //             .accounts({
    //                 payer: owner.publicKey,
    //                 presaleState: presalePDA,
    //                 tokenMint: myBaseToken,
    //                 tokenVault: myBaseTokenVault,
    //                 userVault: myBaseTokenATA.address,
    //                 rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    //                 systemProgram: SystemProgram.programId,
    //                 tokenProgram: TOKEN_PROGRAM_ID,
    //                 associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
    //             })
    //             .signers([owner])
    //             .rpc();

    //         console.log("Deposit transaction successful with ID:", tx);

    //         info = await getAccount(provider.connection, myBaseTokenATA.address);
    //         console.log(`myBaseTokenATA amount: ${info.amount}`);
    //         info = await getAccount(provider.connection, myBaseTokenVault);
    //         console.log(`myBaseTokenVault amount: ${info.amount}`);
    //     } catch (error) {
    //         console.error("Transaction failed:", error);
    //     }
    // });

    it('should buy tokens with SOL', async () => {
        await provider.connection.confirmTransaction(
            await provider.connection.requestAirdrop(user.publicKey, 5e9),
            "confirmed"
        )
        console.log('user sol balance: ', await connection.getBalance(user.publicKey));
        const tokenAmount = new anchor.BN(1 * Math.pow(10, baseTokenDecimals)); // 1 Token
        const quoteTokenAmount = presalePrice[quoteTokenId]; // 1 Quote Token

        const USER_STATE_SEED = "USER_STATE_SEED";
        [userStatePDA, userStateBump] = await PublicKey.findProgramAddress(
            [Buffer.from(USER_STATE_SEED), myBaseToken.toBuffer(), user.publicKey.toBuffer()],
            program.programId
        );

        // Get or create the associated token account for the mint
        userQuoteTokenATA = await getOrCreateAssociatedTokenAccount(
            connection, // connection
            user, // payer
            whitelistedTokens[quoteTokenId], // mint
            user.publicKey, // owner's public key
            true
        );

        console.log("Quote token Mint: ", quoteTokenId, whitelistedTokens[quoteTokenId].toBase58());
        console.log("userQuoteTokenATA: ", userQuoteTokenATA.address.toBase58());

        await mintTo(
            connection, // connection
            user, // payer
            whitelistedTokens[quoteTokenId], // mint
            userQuoteTokenATA.address, // token account
            user.publicKey, // mint authority
            1_000_000 * Math.pow(10, quoteTokenDecimals) // amount
        );

        console.log(`user Quote Token Account Balance: ${(await connection.getTokenAccountBalance(userQuoteTokenATA.address)).value.amount}`);

        // let presaleQuoteTokenATA = presalePDAValut;

        // simulateTimeTravel()

        try {
            let tx = await program.methods.buyTokenWithSol(quoteTokenId, tokenAmount, quoteTokenAmount)
                .accounts({
                    buyer: user.publicKey,
                    presaleState: presalePDA,
                    userState: userStatePDA,
                    vault: presalePDAValutPDA,
                    tokenMint: myBaseToken,
                    buyerTokenAccount: userQuoteTokenATA.address,
                    presaleWhitelistedTokenAccount: presaleQuoteTokenATAs[quoteTokenId].address,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID
                })
                .signers([user])
                .rpc();

            const userStateInfo = await program.account.userState.fetchNullable(userStatePDA);

            // console.log("userStatePDA Data", userStateInfo);
            console.log("userStatePDA QuoteToken Amount:", Number(userStateInfo.buyQuoteTokenAmount[quoteTokenId].toString()));
            console.log("userStatePDA myBaseToken amount:", Number(userStateInfo.buyTokenAmount.toString()));
            console.log("Buy transaction successful with ID: ", tx);
            console.log("User myBaseToken Balance: ", await getWalletTokenBalance(user.publicKey, myBaseToken, 9));
            const tokenOnPresalePDA = await connection.getBalance(presalePDA);
            console.log(`tokenOnPresalePDA: ${tokenOnPresalePDA}`)
            const presaleStateInfo = await program.account.presaleState.fetchNullable(presalePDA);
            // console.log(`PresalePDA Sale Type: ${presaleStateInfo.saleType}`);
            console.log(`Sold myBaseToken Amount: ${presaleStateInfo.soldTokenAmount}`);
            console.log(`Toal particitapints: ${presaleStateInfo.holders}`);
            console.log('user sol balance: ', await connection.getBalance(user.publicKey));
            console.log('presale vault sol balance: ', await connection.getBalance(presalePDAValutPDA));

            console.log(`user Quote Token Account Balance: ${(await connection.getTokenAccountBalance(userQuoteTokenATA.address)).value.amount}`);
            console.log(`Presale Quote Token Account Balance: ${(await connection.getTokenAccountBalance(presaleQuoteTokenATAs[quoteTokenId].address)).value.amount}`);

        } catch (error) {
            console.error("Transaction failed:", error);
        }
    });

    it('should perform emergency withdrawal', async () => {
        const presaleAccount = await program.account.presaleState.fetch(presalePDA);
        let balance = await connection.getBalance(presaleAccount.vault);
        let userAccount = await program.account.userState.fetch(userStatePDA);
        console.log('Presale PDA balance: ', balance);
        console.log('Buy Quote amount: ', new BN(userAccount.buyQuoteTokenAmount[quoteTokenId]).toNumber());
        balance = await connection.getBalance(user.publicKey);
        console.log('User balance: ', balance);
        // const userAccount = await program.account.presaleState.fetch(userStatePDA);
        // balance = await connection.getBalance(userAccount.ad)
        try {
            let tx = await program.methods.emergencyWithdraw(quoteTokenId)
                .accounts({
                    buyer: user.publicKey,
                    presaleState: presalePDA,
                    userState: userStatePDA,
                    vault: presalePDAValutPDA,
                    tokenMint: myBaseToken,
                    buyerTokenAccount: userQuoteTokenATA.address,
                    presaleWhitelistedTokenAccount: presaleQuoteTokenATAs[quoteTokenId].address,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID
                })
                .signers([user])
                .rpc()

            console.log("Emergency withdrawal transaction successful with ID:", tx);

            setTimeout(async () => {
                balance = await connection.getBalance(presaleAccount.vault);
                console.log('Presale PDA balance: ', balance);
                balance = await connection.getBalance(user.publicKey);
                console.log('User balance: ', balance);

                console.log(`user Quote Token Account Balance: ${(await connection.getTokenAccountBalance(userQuoteTokenATA.address)).value.amount}`);
                console.log(`Presale Quote Token Account Balance: ${(await connection.getTokenAccountBalance(presaleQuoteTokenATAs[quoteTokenId].address)).value.amount}`);
            }, 3000)
            // userAccount = await program.account.userState.fetch(userStatePDA);
        } catch (error) {
            console.log("Emergency withdrawal transaction failed:\n", error)
        }

        // Add assertions to check if emergency withdrawal was successful
    });

    // it('should perform withdrawal', async () => {
    //     const presaleAccount = await program.account.presaleState.fetch(presalePDA);
    //     let balance = await connection.getBalance(presaleAccount.vault);
    //     let userAccount = await program.account.userState.fetch(userStatePDA);
    //     console.log('Presale PDA balance: ', balance);
    //     console.log('Buy Quote amount: ', new BN(userAccount.buyQuoteTokenAmount).toNumber());
    //     balance = await connection.getBalance(owner.publicKey);
    //     console.log('User balance: ', balance);
    //     // const userAccount = await program.account.presaleState.fetch(userStatePDA);
    //     // balance = await connection.getBalance(userAccount.ad)
    //     try {
    //         let tx = await program.methods.withdrawSol()
    //             .accounts({
    //                 authority: owner.publicKey,
    //                 presaleState: presalePDA,
    //                 vault: presalePDAValutPDA,
    //                 tokenMint: myBaseToken,
    //                 systemProgram: SystemProgram.programId
    //             })
    //             .signers([owner])
    //             .rpc()

    //         console.log("Withdrawal transaction successful with ID:", tx);

    //         setTimeout(async () => {
    //             balance = await connection.getBalance(presaleAccount.vault);
    //             console.log('Presale PDA balance: ', balance);
    //             balance = await connection.getBalance(owner.publicKey);
    //             console.log('Owner balance: ', balance);
    //         }, 3000)
    //         balance = await connection.getBalance(presaleAccount.vault);
    //         console.log('Presale PDA balance: ', balance);
    //         balance = await connection.getBalance(owner.publicKey);
    //         console.log('Owner balance: ', balance);
    //         // userAccount = await program.account.userState.fetch(userStatePDA);
    //     } catch (error) {
    //         console.log("Withdrawal transaction failed:\n", error)
    //     }

    //     // Add assertions to check if emergency withdrawal was successful
    // });
});