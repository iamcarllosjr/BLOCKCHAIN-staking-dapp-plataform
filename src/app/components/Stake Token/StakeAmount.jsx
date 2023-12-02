"use client";
import { useState, useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "@/app/Context/Web3Context";
import StakingContext from "@/app/Context/StakingContext";
import { toast } from "react-hot-toast";

const StakeAmount = () => {
  const { stakingContractInstance, stakeTokenContractInstance } = useContext(Web3Context);
  const { isReloaded, setIsReloaded } = useContext(StakingContext);
  // const [transactionStatus, setTransactionStatus] = useState("");

  const stakeAmountRef = useRef();

  const stakeToken = async (event) => {
    event.preventDefault();

    const amount = stakeAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error("Please insert a valid positive number");
      return;
    }

    const amountToStake = ethers.parseEther(amount, 18).toString();
    try {
      const approve = await stakeTokenContractInstance.approve(stakingContractInstance.target, amountToStake);
      
      await toast.promise(approve.wait(), {
        loading: "Approving transaction...",
        success: "Transaction approved successful 👌",
        error: "Transaction failed 🤯",
      });

      const transaction = await stakingContractInstance.stake(amountToStake);

      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });

      stakeAmountRef.current.value = "";
      setIsReloaded(!isReloaded);

      // if (receipt.status === 1) {
    //     setIsReload(!isReload);
    //     stakeAmountRef.current.value = "";
    //   } else {
    //       toast.error("Transaction failed. Please try again.")
    //   }

    } catch (error) {
      toast.error("Staking Failed");
      console.error("Staking Failed", error.message);
    }
  };

  return (
    <div className="flex">
      <form onSubmit={stakeToken} className="flex flex-col justify-center gap-5 bg-zinc-600 rounded-md uppercase p-2 w-full">
        <label className="text-white">Amount To Stake</label>
        <input className="rounded-md w-full text-zinc-600 text-center outline-none font-bold p-3 text-3xl" type="text" placeholder="0" ref={stakeAmountRef} />
        <button className="flex w-full justify-center text-zinc-600 bg-purple-400 p-3 uppercase tracking-wider" onClick={stakeToken}>Stake</button>
      </form>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
    </div>
  );
};

export default StakeAmount;
