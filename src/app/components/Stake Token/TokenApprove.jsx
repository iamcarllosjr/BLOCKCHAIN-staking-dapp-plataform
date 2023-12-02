"use client";
import { useState, useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "@/app/Context/Web3Context";
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
    <>
      <form onSubmit={approveToken} className="flex flex-col items-start justify-center gap-5 bg-zinc-600 rounded-md uppercase p-2 w-full">
        <label className="text-white">Token Approve</label>
        <input className="flex rounded-md w-full text-zinc-600 text-center outline-none font-bold p-3 text-3xl" type="text" ref={approvedTokenRef} />
        <button className="flex w-full justify-center text-zinc-600 bg-purple-400 p-3 uppercase tracking-wider" onClick={approveToken}>Approve</button>
      </form>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
    </>
  );
};

export default TokenApprove;
