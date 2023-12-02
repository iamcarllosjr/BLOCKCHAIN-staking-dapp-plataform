"use client";
import { useState, useEffect } from "react";
import connectWallet from "@/app/utils/connectWallet";
import AccountChange from "@/app/utils/accountChange";
import ChainIdChange from "@/app/utils/chainIdChange";
import Web3Context from "@/app/Context/Web3Context";
import Button from "../Button/Button";

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContractInstance: null,
    stakeContractInstance: null,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => AccountChange(setState));
    window.ethereum.on("chainChanged", () => ChainIdChange(setState));

    return () => {
      window.ethereum.removeListener("accountsChanged", () =>
        AccountChange(setState)
      );
      window.ethereum.removeListener("chainChanged", () =>
        ChainIdChange(setState)
      );
    };
  });

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const {
        provider,
        selectedAccount,
        stakingContractInstance,
        stakeTokenContractInstance,
        chainId,
      } = await connectWallet();

      console.log(
        "Provider:",
        provider,
        "Account:",
        selectedAccount,
        "Stake Contract:",
        stakingContractInstance,
        "Token Contract:",
        stakeTokenContractInstance,
        "Chain ID:",
        chainId
      );

      //Agora temos tudo precisamos para interagir com o contrato em outras partes do código
      //podemos enviar estas infos para qualquer lugar do código, via ContextProvider
      setState({
        provider,
        selectedAccount,
        stakingContractInstance,
        stakeTokenContractInstance,
        chainId,
      });
    } catch (error) {
      console.error("Erro connecting wallet", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
     <button className="flex justify-center text-white bg-purple-400 p-2 uppercase tracking-wider" onClick={handleWallet}>
     {!isLoading ? "Connected" : "Connect to Wallet"}
     </button>

    </div>
  );

};

export default Wallet;
