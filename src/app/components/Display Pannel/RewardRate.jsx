"use client";
import { useState, useEffect, useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";
import { ethers } from "ethers";

const RewardRate = () => {
    const { stakingContractInstance, selectedAccount } = useContext(Web3Context);
    const [rewardRate, setRewardRate] = useState("0");

    useEffect(() => {
        const fetchRewardRate = async () => {
            try {
                const rewardTokenRate = await stakingContractInstance.REWARD_RATE();  
                const convertWeiToEther = ethers.formatUnits(rewardTokenRate.toString(), 18);
                console.log(convertWeiToEther);
                setRewardRate(convertWeiToEther);
            } catch (error) {
                console.error("Error Fetching Data...", error.message)   
            };

        }
        stakingContractInstance && fetchRewardRate();

    }, [stakingContractInstance, selectedAccount]);

    return (
        <div>
            <p>Reward Rate : {rewardRate} /seconds</p>
        </div>
    )
 
}

export default RewardRate;