import EarnedReward from "./EarnedReward";
import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";


const DisplayPannel = () => {
    return (
        <div className="flex flex-col uppercase gap-2 text-white justify-center w-96 mt-5">
            <StakedAmount />
            <RewardRate />
            <EarnedReward />
        </div>
    )
  
}

export default DisplayPannel