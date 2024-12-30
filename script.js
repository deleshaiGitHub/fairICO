const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d"; // Replace with actual contract address
const contractABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "daiAmount", "type": "uint256" },
            { "internalType": "uint256", "name": "plsAmount", "type": "uint256" }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3;
let contract;
let userAddress;

window.addEventListener("load", async () => {
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
    document.getElementById("depositButton").addEventListener("click", depositFunds);
    document.getElementById("withdrawButton").addEventListener("click", withdrawFunds);
});

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        userAddress = accounts[0];
        document.getElementById("walletAddress").innerText = `Connected Wallet: ${userAddress}`;
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

async function depositFunds() {
    const daiAmount = document.getElementById("daiAmount").value;
    const plsAmount = document.getElementById("plsAmount").value;

    if (!daiAmount || !plsAmount) {
        alert("Please enter valid DAI and PLS amounts.");
        return;
    }

    try {
        await contract.methods
            .deposit(web3.utils.toWei(daiAmount, "ether"), web3.utils.toWei(plsAmount, "ether"))
            .send({ from: userAddress });
        alert("Deposit successful!");
    } catch (error) {
        console.error("Error during deposit:", error);
        alert("Deposit failed. Check the console for more details.");
    }
}

async function withdrawFunds() {
    try {
        await contract.methods.withdraw().send({ from: userAddress });
        alert("Withdraw successful!");
    } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("Withdrawal failed. Check the console for more details.");
    }
}
