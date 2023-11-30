import { ethers } from "ethers";
import stakeContractABI from "../ABI/stakeContractABI.json";
import stakeTokenABI from "../ABI/stakeTokenABI.json";
import Web3Context from "@/app/context/Web3Context";

const stakingContractAddress = "0xfB528B5905C8f9398fb625Ab4155C567A75cCC9F";
const stakeTokenAddress = "0xfB528B5905C8f9398fb625Ab4155C567A75cCC9F";

const connectWallet = async () => {

    let [provider, signer, selectedAccount, stakingContractInstance, tokenContractInstance, chainId] = [null,null,null,null,null,null];

    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
    
            let chainIdHex = await window.ethereum.request({
                method: "eth_chainId"
            })
    
            chainId = parseInt(chainIdHex);
    
            if(accounts.length > 0){
                selectedAccount = accounts[0]
            } else {
                console.log("No ethereum accounts available");
            }
    
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
    
            stakingContractInstance = new ethers.Contract(stakingContractAddress, stakeContractABI, signer);
            tokenContractInstance = new ethers.Contract(stakeTokenAddress, stakeTokenABI, signer);

        } catch (error) {console.error(error); throw error}
    } 

  return { provider, selectedAccount, stakingContractInstance, tokenContractInstance, chainId }

}

export default connectWallet;