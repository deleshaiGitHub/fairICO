const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d";
const contractABI = [
  [
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
]
];

let web3;
let contract;
let userAddress;

window.addEventListener('load', async () => {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('deposit').addEventListener('click', depositFunds);
    document.getElementById('initializeDCA').addEventListener('click', initializeDCA);
    document.getElementById('executeDCA').addEventListener('click', executeDCA);
    document.getElementById('withdraw').addEventListener('click', withdrawFunds);
    document.getElementById('stopDCA').addEventListener('click', stopDCA);
});

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        userAddress = accounts[0];
        document.getElementById('walletAddress').innerText = `Wallet Address: ${userAddress}`;
        document.getElementById('actions').style.display = 'block';

        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert('Please install MetaMask to use this feature.');
    }
}

async function depositFunds() {
    const daiAmount = document.getElementById('daiAmount').value;
    const plsAmount = document.getElementById('plsAmount').value;

    await contract.methods.deposit(web3.utils.toWei(daiAmount, 'ether'), web3.utils.toWei(plsAmount, 'ether'))
        .send({ from: userAddress });
    alert('Deposit successful');
}

async function initializeDCA() {
    const baseOrderSize = document.getElementById('baseOrderSize').value;
    const safetyOrderSize = document.getElementById('safetyOrderSize').value;
    const priceDeviation = document.getElementById('priceDeviation').value;
    const maxSafetyOrders = document.getElementById('maxSafetyOrders').value;
    const safetyVolumeScale = document.getElementById('safetyVolumeScale').value;
    const safetyStepScale = document.getElementById('safetyStepScale').value;

    await contract.methods.initializeDCA(
        web3.utils.toWei(baseOrderSize, 'ether'),
        web3.utils.toWei(safetyOrderSize, 'ether'),
        priceDeviation,
        maxSafetyOrders,
        safetyVolumeScale,
        safetyStepScale
    ).send({ from: userAddress });

    alert('DCA initialized');
}

async function executeDCA() {
    await contract.methods.executeDCA().send({ from: userAddress });
    alert('DCA executed');
}

async function withdrawFunds() {
    await contract.methods.withdraw().send({ from: userAddress });
    alert('Funds withdrawn');
}

async function stopDCA() {
    await contract.methods.stopDCA().send({ from: userAddress });
    alert('DCA stopped');
}
