"use client";
import { useState, useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";
import { toast } from 'react-hot-toast';

const ClaimReward = () => {
  const { stakingContractInstance } = useContext(Web3Context);
  // const [transactionStatus, setTransactionStatus] = useState("");

    const claimReward = async () => {
        try{
            const transaction = await stakingContractInstance.getReward();
            await toast.promise(transaction.wait(), {
                loading: "Transaction is pending...",
                success: "Transaction successful 👌",
                error: "Transaction failed 🤯"
            });

            // const receipt = await transaction.wait();
            // setTransactionStatus("Transaction is pending...");
            // if(receipt.status === 1){
            //     setTransactionStatus("Claim Reward is Successful");
                
            // } else {
            //     setTransactionStatus("Transaction Failed")
            // }

        }catch(error){
          toast.error("Claim Reward Failed");
            console.error("Claim Reward Failed", error.message);
        }

    }


  return (
    <>
      <button className="flex justify-center text-white bg-purple-400 p-2 uppercase tracking-wider" onClick={claimReward}>Claim Reward</button>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
    </>
  );
};

export default ClaimReward;