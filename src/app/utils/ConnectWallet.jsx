import { ethers } from "ethers";
import stakeContractABI from "../ABI/stakeContractABI.json";
import stakeTokenABI from "../ABI/stakeTokenABI.json";

const stakingContractAddress = "0xF3DFEf6e553d07eE71f99c23B9A7b0Ad7A24ac28";
const stakeTokenAddress = "0xf171C4f81628d4286C23bD0141b973aedf076060";

const connectWallet = async () => {
    let [provider, signer, stakingContractInstance, stakeTokenContractInstance, chainId, selectedAccount] = [null, null, null, null, null, null];

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            let chainIdHex = await window.ethereum.request({
                method: "eth_chainId"
            });

            chainId = parseInt(chainIdHex);

            if (accounts.length > 0) {
                selectedAccount = accounts[0];
            } else {
                console.log("No ethereum accounts available");
            }

            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();

            stakingContractInstance = new ethers.Contract(stakingContractAddress, stakeContractABI, signer);
            stakeTokenContractInstance = new ethers.Contract(stakeTokenAddress, stakeTokenABI, signer);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return { provider, selectedAccount, stakingContractInstance, stakeTokenContractInstance, chainId };
};

export default connectWallet;
