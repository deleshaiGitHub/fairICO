const stakingContractABI = require('./staking_abi');

if (typeof Web3 !== "undefined") {
    web3 = new Web3(window.ethereum);

    const stakingContractAddress = '0xc67314c605A1A9F437a36f451B2C35e5A956562F';
    const stakingTokenAddress = '0x7D1F668D0CDb20127cF9ed657DC634c7c6b2c967';

    const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
    const stakingTokenContract = new web3.eth.Contract(tokenContractABI, stakingTokenAddress);

    async function approveAndStake() {
        let amount = document.getElementById('tokenAmount').value;
        let duration = document.getElementById('lockingPeriod').value;

        if (!amount || !duration) {
            alert('Please enter both amount and duration.');
            return;
        }

        try {
            const accounts = await web3.eth.requestAccounts();
            const fromAddress = accounts[0];

            // Approve staking contract to spend the staking tokens
            let approvalTx = await stakingTokenContract.methods.approve(stakingContractAddress, web3.utils.toWei(amount, 'ether')).send({
                from: fromAddress,
                gas: 300000
            });

            console.log('Token approved:', approvalTx);

            // Staking tokens
            let stakingTx = await stakingContract.methods.lockTokens(
                web3.utils.toWei(amount, 'ether'),
                duration
            ).send({
                from: fromAddress,
                gas: 300000
            });

            document.getElementById('transactionStatus').innerText = `Staking successful! Transaction: ${stakingTx.transactionHash}`;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('transactionStatus').innerText = 'An error occurred during staking.';
        }
    }

} else {
    console.log("Web3 not found. Please install MetaMask.");
}
