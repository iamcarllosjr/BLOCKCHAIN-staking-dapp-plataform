import { useContext, useState, useEffect } from "react";
import Web3Context from "@/app/Context/Web3Context";
import { ethers } from "ethers";

const ConnectedAccount = () => {
  const { selectedAccount, stakeTokenContractInstance } = useContext(Web3Context);
  const [balance, setBalance] = useState("");

  const getQuantityTokens = async () => {

      const balanceWei = await stakeTokenContractInstance.balanceOf(
        selectedAccount
      );
      const balanceFormated = ethers.formatUnits(balanceWei.toString(), 18);
      const fixedValueReward = parseFloat(balanceFormated).toFixed(2)
      setBalance(fixedValueReward);
    }

    useEffect(() => {
      getQuantityTokens()
    })

return (
  <div className="flex gap-5">
    <p>{(selectedAccount && selectedAccount.length > 0) ? `Account : ${selectedAccount.substring(0, 6)}...${selectedAccount.substring(38)}` : ""} </p>
    <p>{selectedAccount && `Balance : ${balance}`}</p>
  </div>
)
}
;

export default ConnectedAccount;
