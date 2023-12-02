"use client";
import { useState, useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "@/app/Context/Web3Context";
import StakingContext from "@/app/Context/StakingContext";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const StakeAmount = () => {
  const { stakingContractInstance } = useContext(Web3Context);
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
    <div>
      <form onSubmit={stakeToken}>
        <label>Amount To Stake:</label>
        <input type="text" ref={stakeAmountRef} />
        <Button onClick={stakeToken} type="submit" label="Stake" />
      </form>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
    </div>
  );
};

export default StakeAmount;
