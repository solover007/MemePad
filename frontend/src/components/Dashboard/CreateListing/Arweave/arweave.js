// const fs = require('fs');
import Arweave from "arweave";

// import wallet from "./wallet";
const wallet = undefined;

export default async function uploadOnArweave(_metadata) {
    console.log("init start...")

    const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 20000,
        logging: false,
    });
    console.log("init end...")

    // Upload metadata to Arweave
    const metadataRequest = JSON.stringify(_metadata);

    const metadataTransaction = await arweave.createTransaction({
        data: metadataRequest,
    });

    metadataTransaction.addTag("Content-Type", "application/json");

    let metadataUri = undefined;
    try {
        await arweave.transactions.sign(metadataTransaction, wallet);

        console.log("metadata txid", metadataTransaction.id);

        await arweave.transactions.post(metadataTransaction);

        metadataUri = metadataTransaction.id ? `https://arweave.net/${metadataTransaction.id}` : undefined;
    } catch (err) {
        console.error("Upload metadata error: ", err);
    }

    return metadataUri;
}
