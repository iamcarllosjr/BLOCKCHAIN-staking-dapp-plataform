import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from "./components/Display Pannel/DisplayPannel";

export default function Home() {
  return (
    <>
       <Wallet>
        <Navigation />
        <DisplayPannel />
       </Wallet>
    </>
  )
}
