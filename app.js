// Connect to Ethereum provider (e.g., MetaMask)
const web3 = new Web3(window.ethereum);
let contract;

const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d"; // Replace with your contract address
const abi = contractABI; // Contract ABI from contractABI.js

// Initialize the contract
async function initContract() {
    const accounts = await web3.eth.requestAccounts();
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log("Connected Account: ", accounts[0]);
}

// Unified action: Deposit funds, initialize DCA, and execute the first order
document.getElementById("dca-action-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const daiAmount = document.getElementById("dai-amount").value;
    const plsAmount = document.getElementById("pls-amount").value;
    const baseOrderSize = document.getElementById("base-order-size").value;
    const safetyOrderSize = document.getElementById("safety-order-size").value;
    const priceDeviation = document.getElementById("price-deviation").value;
    const maxSafetyOrders = document.getElementById("max-safety-orders").value;
    const safetyOrderVolumeScale = document.getElementById("safety-order-volume-scale").value;
    const safetyOrderStepScale = document.getElementById("safety-order-step-scale").value;

    try {
        const accounts = await web3.eth.requestAccounts();
        const userAccount = accounts[0];

        // 1. Deposit Funds
        console.log("Depositing funds...");
        await contract.methods.deposit(daiAmount, plsAmount).send({ from: userAccount });
        console.log("Deposit successful!");

        // 2. Initialize DCA
        console.log("Initializing DCA...");
        await contract.methods.initializeDCA(
            baseOrderSize,
            safetyOrderSize,
            priceDeviation,
            maxSafetyOrders,
            safetyOrderVolumeScale,
            safetyOrderStepScale
        ).send({ from: userAccount });
        console.log("DCA Initialized!");

        // 3. Execute DCA
        console.log("Executing first DCA order...");
        await contract.methods.executeDCA().send({ from: userAccount });
        console.log("First DCA order executed!");
        
        alert("DCA Process Completed!");
    } catch (error) {
        console.error("Error during DCA process:", error);
        alert("An error occurred. Check the console for details.");
    }
});

// Stop DCA
document.getElementById("stop-dca").addEventListener("click", async () => {
    try {
        const accounts = await web3.eth.requestAccounts();
        await contract.methods.stopDCA().send({ from: accounts[0] });
        alert("DCA Stopped!");
    } catch (error) {
        console.error("Error stopping DCA:", error);
        alert("An error occurred while stopping DCA.");
    }
});

// Initialize the contract on page load
window.addEventListener("load", async () => {
    await initContract();
});
