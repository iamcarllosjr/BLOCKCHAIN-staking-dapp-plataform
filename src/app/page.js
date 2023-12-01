import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from "./components/Display Pannel/DisplayPannel";
import TokenApprove from "./components/Stake Token/TokenApprove";
import StakeAmount from "./components/Stake Token/StakeAmount";
import WithdrawStakeAmount from "./components/Withdraw/Withdraw";

export default function Home() {
  return (
    <>
       <Wallet>
        <Navigation />
        <DisplayPannel />
        <TokenApprove />
        <StakeAmount />
        <WithdrawStakeAmount />
       </Wallet>
    </>
  )
}
