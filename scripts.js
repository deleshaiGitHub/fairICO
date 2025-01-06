const stakingContractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const stakingABI = [
    // Include the relevant ABI entries here for interacting with the contract
];

let provider, signer, stakingContract;

document.addEventListener("DOMContentLoaded", async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        stakingContract = new ethers.Contract(stakingContractAddress, stakingABI, signer);

        // Display initial status
        updateStakingStatus();
    } else {
        alert("MetaMask is not installed!");
    }

    // Lock tokens form submission
    document.getElementById("lockTokensForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("lockAmount").value;
        const period = document.getElementById("lockingPeriod").value;

        try {
            const tx = await stakingContract.lockTokens(amount, period);
            await tx.wait();
            alert("Tokens locked successfully!");
            updateStakingStatus();
        } catch (err) {
            console.error(err);
            alert("Error locking tokens.");
        }
    });

    // Unlock tokens
    document.getElementById("unlockTokensButton").addEventListener("click", async () => {
        try {
            const tx = await stakingContract.unlockTokens();
            await tx.wait();
            alert("Tokens unlocked successfully!");
            updateStakingStatus();
        } catch (err) {
            console.error(err);
            alert("Error unlocking tokens.");
        }
    });

    // Claim rewards
    document.getElementById("claimRewardsButton").addEventListener("click", async () => {
        try {
            const tx = await stakingContract.getRewards();
            await tx.wait();
            alert("Rewards claimed successfully!");
            updateStakingStatus();
        } catch (err) {
            console.error(err);
            alert("Error claiming rewards.");
        }
    });

    // Release vested tokens
    document.getElementById("releaseTokensButton").addEventListener("click", async () => {
        try {
            const tx = await stakingContract.release();
            await tx.wait();
            alert("Tokens released successfully!");
            updateStakingStatus();
        } catch (err) {
            console.error(err);
            alert("Error releasing tokens.");
        }
    });
});

// Update staking status
async function updateStakingStatus() {
    try {
        const totalRewardPoints = await stakingContract.totalRewardPoints();
        document.getElementById("stakingStatus").innerText = `Total Reward Points: ${totalRewardPoints}`;
    } catch (err) {
        console.error(err);
        document.getElementById("stakingStatus").innerText = "Unable to fetch status.";
    }
}
