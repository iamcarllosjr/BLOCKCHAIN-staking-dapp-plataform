"use client";
import { useState, useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";
import Button from "../Button/Button";

const ClaimReward = () => {
  const { stakingContractInstance } = useContext(Web3Context);
  const [transactionStatus, setTransactionStatus] = useState("");

    const claimReward = async () => {
        try{
            const transaction = await stakingContractInstance.getReward();
            const receipt = await transaction.wait();
            setTransactionStatus("Transaction is pending...");
            if(receipt.status === 1){
                setTransactionStatus("Withdraw is Successful");
                setTimeout(() => {
                    setTransactionStatus("")
                }, 5000)
            } else {
                setTransactionStatus("Transaction Failed")
            }

        }catch(error){
            console.error("Withdraw Failed", error.message);
        }

    }


  return (
    <>
      <Button onClick={claimReward} type="button" label="Clain Reward" />
      {transactionStatus && <div>{transactionStatus}</div>}
    </>
  );
};

export default ClaimReward;