// Connecting to the Ethereum provider (Metamask or Web3 provider)
const web3 = new Web3(window.ethereum);
let contract;

const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d"; // Your contract address
const abi = contractABI; // Imported ABI from contractABI.js

// Connect to the contract
async function initContract() {
    const accounts = await web3.eth.requestAccounts();
    contract = new web3.eth.Contract(abi, contractAddress);
    const userAccount = accounts[0];
    console.log("Connected Account: ", userAccount);
}

// Handle Deposit
document.getElementById("deposit-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const daiAmount = document.getElementById("dai-amount").value;
    const plsAmount = document.getElementById("pls-amount").value;

    const accounts = await web3.eth.requestAccounts();
    await contract.methods.deposit(daiAmount, plsAmount).send({ from: accounts[0] });
    alert("Deposit Successful!");
});

// Handle Withdraw
document.getElementById("withdraw-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.requestAccounts();
    await contract.methods.withdraw().send({ from: accounts[0] });
    alert("Withdraw Successful!");
});

// Handle DCA Initialization
document.getElementById("dca-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const baseOrderSize = document.getElementById("base-order-size").value;
    const safetyOrderSize = document.getElementById("safety-order-size").value;
    const priceDeviation = document.getElementById("price-deviation").value;
    const maxSafetyOrders = document.getElementById("max-safety-orders").value;
    const safetyOrderVolumeScale = document.getElementById("safety-order-volume-scale").value;
    const safetyOrderStepScale = document.getElementById("safety-order-step-scale").value;

    const accounts = await web3.eth.requestAccounts();
    await contract.methods.initializeDCA(
        baseOrderSize,
        safetyOrderSize,
        priceDeviation,
        maxSafetyOrders,
        safetyOrderVolumeScale,
        safetyOrderStepScale
    ).send({ from: accounts[0] });

    alert("DCA Initialized!");
});

// Handle Stop DCA
document.getElementById("stop-dca").addEventListener("click", async () => {
    const accounts = await web3.eth.requestAccounts();
    await contract.methods.stopDCA().send({ from: accounts[0] });
    alert("DCA Stopped!");
});

// Handle Execute DCA
document.getElementById("execute-dca").addEventListener("click", async () => {
    const accounts = await web3.eth.requestAccounts();
    await contract.methods.executeDCA().send({ from: accounts[0] });
    alert("DCA Executed!");
});

// Initialize the contract when the page loads
window.addEventListener("load", async () => {
    await initContract();
});
