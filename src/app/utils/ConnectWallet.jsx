import { ethers } from "ethers";
import stakeContractABI from "../ABI/stakeContractABI.json";
import stakeTokenABI from "../ABI/stakeTokenABI.json";

const stakingContractAddress = "0xBf3192C0D08d864fBCa87EeB23a43B4d6384C9Ca";
const stakeTokenAddress = "0x163E4cd796C579Ebe2193965d978873b610333Ec";

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
