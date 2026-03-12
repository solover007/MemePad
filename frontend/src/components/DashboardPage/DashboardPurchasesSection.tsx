"use client";

import { PURCHASE_LIST } from "@/lib/utils/constants";
import { DashboardPurchaseItem } from "./DashboardPurchaseItem";
import { useBuyLogs } from "@/lib/api";
import { getLogHistory } from "@/contract/launchpad/presale";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

import presale1Data from '../../json/presale_1.json'
import presale2Data from '../../json/presale_2.json'

const filterPresale1Data = (publicKey: string) => {
  const data = [];
  for (const tx of presale1Data) {
    if (tx.from.toLowerCase() == publicKey.toLowerCase()) {
      data.push({
        created_at: new Date(tx.time * 1000).toLocaleString(),
        amount: tx.token.toFixed(2),
        token: 'SOL',
        pur_amount: tx.amount.toFixed(2),
      })
    }
  }
  return data;
}

const filterPresale2Data = (publicKey: string) => {
  const data = [];
  for (const tx of presale2Data) {
    if (tx.signer.toLowerCase() == publicKey.toLowerCase()) {
      data.push({
        created_at: new Date(tx.created_at * 1000).toLocaleString(),
        amount: tx.amount,
        token: tx.token,
        pur_amount: tx.pur_amount,
      })
    }
  }
  return data;
}

export const DashboardPurchasesSection = () => {

  const [logs, setLogs] = useState<any[]>([]);
  const wallet = useWallet();
  useEffect(() => {
    const getLogData = async () => {
      if (wallet?.publicKey) {
        let _logs = [...filterPresale1Data(wallet.publicKey.toBase58()), ...filterPresale2Data(wallet.publicKey.toBase58())]
      
        _logs = _logs.sort((a, b) => {
          if (a.created_at < b.created_at) return 1;
          else if (a.created_at > b.created_at) return -1;
          return 0;
        });
        setLogs(_logs);
      }
    };

    getLogData();
  }, [wallet]);

  return (
    <div
      className="bg-white rounded-[0.188rem] pt-6 pb-4 px-4 lg:w-[755px] flex-grow"
      style={{ boxShadow: "0px 12px 0px 0px #4B2ED1" }}
    >
      <p className="font-broad text-2xl mb-4">PURCHASeS</p>
      <div className="space-y-2">
        {logs?.map((item) => (
          <DashboardPurchaseItem
            key={item.id}
            id={item.id || 0}
            name={"MEMEPad"}
            symbol={"MPAD"}
            amount={item.amount}
            quote={item.token}
            amountInUsd={item.pur_amount?.toString()}
            status={""}
            date={item.created_at}
            image={
              "https://arweave.net/I55qtHXZWaEzblm97EeITc3NmUAo-f6xEt5Wb4Bz8YI"
            }
          />
        ))}
      </div>
    </div>
  );
};
