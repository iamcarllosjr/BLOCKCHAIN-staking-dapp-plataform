"use client";
import { useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";

const ConnectedAccount = () => {
  const { selectedAccount } = useContext(Web3Context);

  return <p>{selectedAccount ? selectedAccount : "Connect Account"}</p>;
};

export default ConnectedAccount;
