"use client";
import { useState, useEffect, useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";
import { ethers } from "ethers";

const EarnedReward = () => {
    const { stakingContractInstance, selectedAccount } = useContext(Web3Context);
    const [earnedReward, setEarnedReward] = useState("0");

    useEffect(() => {
        const fetchEarnedReward = async () => {
            try {
                const earnedTokenReward = await stakingContractInstance.earned(selectedAccount);  
                const convertToString = ethers.formatUnits(earnedTokenReward);
                const roundedFixed = parseFloat(convertToString).toFixed(2)
                
                console.log(roundedFixed);
                setEarnedReward(roundedFixed);
            } catch (error) {
                console.error("Error Fetching Data...", error.message)   
            };

        }
        
        const interval = setInterval(() => {
            stakingContractInstance && fetchEarnedReward();
        }, 8000);
        return () => clearInterval(interval);
    }, [stakingContractInstance, selectedAccount]);

    return (
        <div className="flex justify-between">
            <p>Earned Reward</p>
            <p>{earnedReward}</p>
        </div>
    )
  
}

export default EarnedReward