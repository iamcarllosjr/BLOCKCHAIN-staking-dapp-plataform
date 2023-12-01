import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from "./components/Display Pannel/DisplayPannel";
import TokenApprove from "./components/Stake Token/TokenApprove";

export default function Home() {
  return (
    <>
       <Wallet>
        <Navigation />
        <DisplayPannel />
        <TokenApprove />
       </Wallet>
    </>
  )
}
