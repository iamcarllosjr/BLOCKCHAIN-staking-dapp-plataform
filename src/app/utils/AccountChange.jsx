const AccountChange = async (setState) => {
    const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
    })
    const selectedAccount = accounts[0];
    console.log(selectedAccount)
    setState(prevState=>({...prevState,selectedAccount}))
}

export default AccountChange;