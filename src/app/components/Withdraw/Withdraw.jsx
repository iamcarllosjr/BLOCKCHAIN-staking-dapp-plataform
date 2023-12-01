"use client";
import { useState, useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "@/app/Context/Web3Context";
import Button from "../Button/Button";

const WithdrawStakeAmount = () => {
  const { stakingContractInstance } = useContext(Web3Context);
  const [transactionStatus, setTransactionStatus] = useState("");

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
            setTransactionStatus("Transaction is pending...");
            const receipt = await transaction.wait();
            if(receipt.status === 1){
                setTransactionStatus("Withdraw is Successful");
                setTimeout(() => {
                    setTransactionStatus("")
                }, 5000)
                withdrawStakeAmountRef.current.value = "";
            } else {
                setTransactionStatus("Transaction Failed")
            }

        }catch(error){
            console.error("Withdraw Failed", error.message);
        }

    }


  return (
    <div>
      <form onSubmit={WithdrawstakeToken}>
        <label>Amount To Withdraw:</label>
        <input type="text" ref={withdrawStakeAmountRef} />
        <Button onClick={WithdrawstakeToken} type="submit" label="Withdraw Tokens" />
      </form>
      {transactionStatus && <div>{transactionStatus}</div>}
    </div>
  );
};

export default WithdrawStakeAmount;