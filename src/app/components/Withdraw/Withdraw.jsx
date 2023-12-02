"use client";
import { useState, useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "@/app/Context/Web3Context";
import StakingContext from "@/app/Context/StakingContext";
import { toast } from 'react-hot-toast';


const WithdrawStakeAmount = () => {
  const { stakingContractInstance } = useContext(Web3Context);
  const { isReloaded, setIsReloaded } = useContext(StakingContext);
  // const [transactionStatus, setTransactionStatus] = useState("");

  const withdrawStakeAmountRef = useRef();

    const WithdrawstakeToken = async (event) => {
        event.preventDefault();

        const amount = withdrawStakeAmountRef.current.value.trim();
        if(isNaN(amount) || amount <=0){
            console.error("Please insert a valid positive number");
            return;
        }

        const amountToWithdraw = ethers.parseEther(amount, 18).toString();
        try{
            const transaction = await stakingContractInstance.withdrawStakedTokens(amountToWithdraw);
            await toast.promise(transaction.wait(), {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                 error: 'Transaction failed 🤯'
             });

             withdrawStakeAmountRef.current.value = "";
             setIsReloaded(!isReloaded);

            // if(receipt.status === 1){
            //     setTransactionStatus("Withdraw is Successful");
            //     setIsReloaded(!isReloaded);
            //     setTimeout(() => {
            //         setTransactionStatus("")
            //     }, 5000)
            //     withdrawStakeAmountRef.current.value = "";
            // } else {
            //     setTransactionStatus("Transaction Failed")
            // }

        }catch(error){
          toast.error("Withdraw Token Failed");
            console.error("Withdraw Failed", error.message);
        }

    }


  return (
    <div className="flex">
      <form onSubmit={WithdrawstakeToken} className="flex flex-col justify-center gap-5 bg-zinc-600 rounded-md uppercase p-2 w-full">
        <label className="text-white">Withdraw Tokens</label>
        <input className="rounded-md w-full text-center text-3xl text-zinc-600 outline-none font-bold p-3" placeholder="0" type="text" ref={withdrawStakeAmountRef} />
        <button className="flex w-full justify-center text-zinc-600 bg-purple-400 p-3 uppercase tracking-wider" onClick={WithdrawstakeToken}>Withdraw</button>
      </form>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
    </div>
  );
};

export default WithdrawStakeAmount;