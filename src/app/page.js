import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from "./components/Display Pannel/DisplayPannel";
import { StakingProvider } from "./Context/StakingContext";
import TokensDisplay from "./components/Stake Token/TokensDisplay";

export default function Home() {
  return (
    <main className=" bg-zinc-600 h-screen w-full">
       <Wallet>
        <Navigation />
        <div className="flex flex-col items-center justify-center gap-3 rounded-md p-5 mt-12 w-1/2">
        <StakingProvider>
        <DisplayPannel />
        <TokensDisplay />
        </StakingProvider>
        </div>    
       </Wallet>
    </main>
  )
}
