"use client";
import { useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";

const ConnectedAccount = () => {
  const { selectedAccount } = useContext(Web3Context);

return <p>{(selectedAccount && selectedAccount.length > 0) ? `Account : ${selectedAccount.substring(0, 6)}...${selectedAccount.substring(38)}` : ""} </p>;
};

export default ConnectedAccount;
