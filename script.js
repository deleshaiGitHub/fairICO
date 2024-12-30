// Initialize Web3 if it's available
if (typeof window.ethereum !== 'undefined' || typeof web3 !== 'undefined') {
    // Modern dapp browsers or legacy dapp browsers
    window.web3 = new Web3(ethereum);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // Fallback - use your local node
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Contract ABI and Address
const contractABI = [
  {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "daiAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "plsAmount",
				"type": "uint256"
			}
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
			{
				"internalType": "address",
				"name": "_oracleAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_teddyAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_daiAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_plsAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "daiAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "plsAmount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "baseOrderSize",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrderSize",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceDeviation",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxSafetyOrders",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrderVolumeScale",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrderStepScale",
				"type": "uint256"
			}
		],
		"name": "initializeDCA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "OrderExecuted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "stopDCA",
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
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "daiAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "plsAmount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "daiAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oracleAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "plsAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "teddyAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userConfigs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "baseOrderSize",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrderSize",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceDeviation",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxSafetyOrders",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrderVolumeScale",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrderStepScale",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "daiBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "plsBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "initialPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "safetyOrdersPlaced",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d";

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get user accounts
async function getAccounts() {
    return await web3.eth.getAccounts();
}

// Deposit Function
async function deposit() {
    const accounts = await getAccounts();
    const daiAmount = document.getElementById('daiAmount').value;
    const plsAmount = document.getElementById('plsAmount').value;
    
    try {
        await contract.methods.deposit(daiAmount, plsAmount).send({ from: accounts[0] });
        document.getElementById('status').innerText = "Deposit successful!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerText = "Deposit failed: " + error.message;
    }
}

// Initialize DCA Function
async function initializeDCA() {
    const accounts = await getAccounts();
    // Here, you might want to get these values from user inputs or preset them
    const params = [1000, 100, 5, 5, 10, 5]; // Example values
    try {
        await contract.methods.initializeDCA(...params).send({ from: accounts[0] });
        document.getElementById('status').innerText = "DCA initialized!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerText = "Initialization failed: " + error.message;
    }
}

// Execute DCA Function
async function executeDCA() {
    const accounts = await getAccounts();
    try {
        await contract.methods.executeDCA().send({ from: accounts[0] });
        document.getElementById('status').innerText = "DCA executed!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerText = "Execution failed: " + error.message;
    }
}

// Stop DCA Function
async function stopDCA() {
    const accounts = await getAccounts();
    try {
        await contract.methods.stopDCA().send({ from: accounts[0] });
        document.getElementById('status').innerText = "DCA stopped!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerText = "Stop failed: " + error.message;
    }
}

// Withdraw Function
async function withdraw() {
    const accounts = await getAccounts();
    try {
        await contract.methods.withdraw().send({ from: accounts[0] });
        document.getElementById('status').innerText = "Withdrawal successful!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerText = "Withdrawal failed: " + error.message;
    }
}

// Check if MetaMask is installed
if (window.ethereum) {
    window.ethereum.enable(); // Request account access if needed
}
