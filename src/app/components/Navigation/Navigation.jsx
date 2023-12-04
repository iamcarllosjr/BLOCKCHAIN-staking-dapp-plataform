"use client";
import ClaimReward from "../Claim Reward/ClaimReward";
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";
import { useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";

const Navigation = () => {
  const { selectedAccount } = useContext(Web3Context);

  return (
    <header className="flex items-center justify-between p-2 bg-zinc-900 text-white fixed w-full h-16 top-0">
      <div className="flex gap-5">
      <ConnectedAccount />
      <ConnectedNetwork />
      </div>
      {selectedAccount && <ClaimReward />}
    </header>
  );
};

export default Navigation;
