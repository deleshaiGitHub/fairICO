// Import necessary libraries
const Web3 = require('web3');

// Configuration
const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d";
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
        "name": "executeDCA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_oracleAddress", "type": "address" },
            { "internalType": "address", "name": "_teddyAddress", "type": "address" },
            { "internalType": "address", "name": "_daiAddress", "type": "address" },
            { "internalType": "address", "name": "_plsAddress", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "daiAmount", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "plsAmount", "type": "uint256" }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "baseOrderSize", "type": "uint256" },
            { "internalType": "uint256", "name": "safetyOrderSize", "type": "uint256" },
            { "internalType": "uint256", "name": "priceDeviation", "type": "uint256" },
            { "internalType": "uint256", "name": "maxSafetyOrders", "type": "uint256" },
            { "internalType": "uint256", "name": "safetyOrderVolumeScale", "type": "uint256" },
            { "internalType": "uint256", "name": "safetyOrderStepScale", "type": "uint256" }
        ],
        "name": "initializeDCA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // More ABI entries as per your provided list
];

// Web3 instance
let web3;

// Initialize the DApp
async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected to Metamask");
    } else {
        console.error("Please install MetaMask to use this DApp.");
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Example function call: Deposit
    const deposit = async (daiAmount, plsAmount) => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.deposit(daiAmount, plsAmount).send({ from: accounts[0] });
        console.log("Deposit transaction successful");
    };

    // Example: Call deposit with dummy data
    document.getElementById("depositButton").addEventListener("click", () => {
        const dai = document.getElementById("daiAmount").value;
        const pls = document.getElementById("plsAmount").value;
        deposit(dai, pls);
    });

    // Fetch DAI Address (view function example)
    const fetchDaiAddress = async () => {
        const daiAddress = await contract.methods.daiAddress().call();
        console.log("DAI Address:", daiAddress);
    };

    // Fetch data on load
    fetchDaiAddress();
}

// Load DApp
window.addEventListener("load", init);
