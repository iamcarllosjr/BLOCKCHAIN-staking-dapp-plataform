// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard{
  using SafeMath for uint256;
  IERC20 public stakingToken;
  IERC20 public rewardToken;

  uint public constant REWARD_RATE = 20; //20 tokens
  uint public REWARD_TIME = 120; //2 minutos em segundos
  uint private totalStakedTokens;
  uint public rewardPerTokenStored;
  uint public lastUpdateTime;

  mapping(address=>uint) public stakedBalance;
  mapping(address=>uint) public rewards;
  mapping(address=>uint) public userRewardPerTokenPaid;

  event Staked(address indexed user, uint256 indexed amount);
  event Withdrawn(address indexed user, uint256 indexed amount);
  event RewardsClaimed(address indexed user, uint256 indexed amount);
  
  constructor(address _stakingToken,address _rewardToken){
    stakingToken = IERC20(_stakingToken);
    rewardToken = IERC20(_rewardToken);
  }

  function stake(uint amount) external nonReentrant updateReward(msg.sender){
    require(amount > 0,"Amount must be greater than zero");
    totalStakedTokens = totalStakedTokens.add(amount);
    stakedBalance[msg.sender] = stakedBalance[msg.sender].add(amount);
    emit Staked(msg.sender,amount);
    bool success = stakingToken.transferFrom(msg.sender,address(this),amount);
    require(success,"Transfer Failed");
  }
  function withdrawStakedTokens(uint amount) external nonReentrant updateReward(msg.sender)  {
    require(amount > 0,"Amount must be greater than zero");
    require(stakedBalance[msg.sender] >= amount,"Staked amount not enough");
    totalStakedTokens = totalStakedTokens.sub(amount);
    stakedBalance[msg.sender]=stakedBalance[msg.sender].sub(amount);
    emit Withdrawn(msg.sender, amount);
    bool success = stakingToken.transfer(msg.sender,amount);
    require(success,"Transfer Failed");
  }

  function getReward() external nonReentrant updateReward(msg.sender){
     uint reward = rewards[msg.sender];
     require(reward > 0,"No rewards to claim");
     rewards[msg.sender] = 0;
     emit RewardsClaimed(msg.sender, reward);
     bool success = rewardToken.transfer(msg.sender,reward);
     require(success,"Transfer Failed");
  }

  function rewardPerToken() public view returns(uint){
    if(totalStakedTokens == 0){
        return rewardPerTokenStored;
    }
    uint currentTime = block.timestamp;
    uint elapsedTime = currentTime.sub(lastUpdateTime);

    // Convertendo a taxa de recompensa para tokens por segundo
    // 1**18 ou 1e18 é  1 * 10 ** 18 = 1000000000000000000 (com 18 casas decimais)
    uint rewardRatePerSecond = REWARD_RATE.mul(1e18).div(REWARD_TIME); 
    // Calculando a recompensa total durante o tempo decorrido
    uint totalRewards = rewardRatePerSecond.mul(elapsedTime);
    // Calculando o novo valor de recompensa por token
    uint newRewardPerToken = rewardPerTokenStored.add(totalRewards.mul(1e18).div(totalStakedTokens));
    return newRewardPerToken;
  }


  function earned(address account) public view returns(uint){
    return stakedBalance[account].mul(rewardPerToken().sub(userRewardPerTokenPaid[account])).div(1e18).add(rewards[account]);
  }

  modifier updateReward(address account){
    rewardPerTokenStored = rewardPerToken();
    lastUpdateTime = block.timestamp;
    rewards[account] = earned(account);
    userRewardPerTokenPaid[account] = rewardPerTokenStored;
    _;
  }
}