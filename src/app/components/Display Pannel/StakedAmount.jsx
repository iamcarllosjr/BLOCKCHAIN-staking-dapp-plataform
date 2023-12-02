"use client";
import { useState, useEffect, useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";
import StakingContext from "@/app/Context/StakingContext";
import { ethers } from "ethers";

const StakedAmount = () => {
    const { stakingContractInstance, selectedAccount } = useContext(Web3Context);
    const { isReloaded } = useContext(StakingContext);
    const [stakedAmount, setStakedAmount] = useState("0");

    useEffect(() => {
        const fetchStakedBalance = async () => {
            try {
                const amountStakedWei = await stakingContractInstance.stakedBalance(selectedAccount);  
                const convertWeiToEther = ethers.formatUnits(amountStakedWei.toString(), 18);
                console.log(convertWeiToEther);
                setStakedAmount(convertWeiToEther);
            } catch (error) {
                console.error("Error Fetching Data...", error.message)   
            }

        }
        stakingContractInstance && fetchStakedBalance();
    }, [stakingContractInstance, selectedAccount, isReloaded]);

    return (
        <div>
            <p>Staked Amount : {stakedAmount}</p>
        </div>
    )
  
}

export default StakedAmount