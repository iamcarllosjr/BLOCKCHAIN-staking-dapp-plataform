import React from 'react'
import TokenApprove from './TokenApprove'
import StakeAmount from './StakeAmount'
import WithdrawStakeAmount from '../Withdraw/Withdraw'

const TokensDisplay = () => {
  return (
    <div className='flex flex-col gap-3 w-96 mt-8'>
      <div className='flex'>
        {/* <TokenApprove /> */}
        <StakeAmount />
      </div>
        <WithdrawStakeAmount />
    </div>
  )
}

export default TokensDisplay;