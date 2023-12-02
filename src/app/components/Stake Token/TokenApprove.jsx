"use client";
import { useState, useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "@/app/Context/Web3Context";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const TokenApprove = () => {
  const { stakeTokenContractInstance, stakingContractInstance } = useContext(Web3Context);
//   const [transactionStatus, setTransactionStatus] = useState("");

  const approvedTokenRef = useRef();

  const approveToken = async (event) => {
    event.preventDefault();

    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error("Please insert a valid positive number");
      return;
    }

    const amountToSend = ethers.parseEther(amount, 18).toString();
    try {
      const transaction = await stakeTokenContractInstance.approve(stakingContractInstance.target, amountToSend);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      // if(receipt.status === 1){
      //     setTransactionStatus("Transaction is Successful");
      //     setTimeout(() => {
      //         setTransactionStatus("")
      //     }, 5000)
      //     approvedTokenRef.current.value = "";
      // } else {
      //     setTransactionStatus("Transaction Failed")
      // }
    } catch (error) {
      toast.error("Token Approval Failed");
      console.error("Token Approval Failed", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={approveToken}>
        <label>Token Approval:</label>
        <input type="text" ref={approvedTokenRef} />
        <Button onClick={approveToken} type="submit" label="Token Approval" />
      </form>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
    </div>
  );
};

export default TokenApprove;
