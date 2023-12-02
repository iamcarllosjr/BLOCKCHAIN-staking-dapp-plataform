"use client";
import ClaimReward from "../Claim Reward/ClaimReward";
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";

const Navigation = () => {

  return (
    <header className="flex items-center justify-between p-2 bg-zinc-900 text-white fixed w-full top-0">
      <div className="flex gap-5">
      <ConnectedAccount />
      <ConnectedNetwork />
      </div>
      <ClaimReward />
    </header>
  );
};

export default Navigation;
