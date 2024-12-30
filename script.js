window.addEventListener('load', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        // Fallback to local node or another provider if needed
    }

    // ABI of your DCABot contract
    const contractABI = [
        // Copy and paste your ABI here. Here's a condensed version of what it should look like:
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
// ... other function definitions here ...
    ];

    const contractAddress = "0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d"; // Replace with your contract address

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    async function getAccounts() {
        return await web3.eth.getAccounts();
    }

    async function deposit() {
        const accounts = await getAccounts();
        const daiAmount = document.getElementById('daiAmount').value;
        const plsAmount = document.getElementById('plsAmount').value;
        
        try {
            await contract.methods.deposit(daiAmount, plsAmount).send({ from: accounts[0] });
            document.getElementById('status').innerText = "Deposit successful!";
        } catch (error) {
            console.error('Deposit error:', error);
            document.getElementById('status').innerText = "Deposit failed: " + error.message;
        }
    }

    async function initializeDCA() {
        const accounts = await getAccounts();
        // Example values, should be user inputs or from UI elements
        const params = [1000, 100, 5, 5, 10, 5]; 

        try {
            await contract.methods.initializeDCA(...params).send({ from: accounts[0] });
            document.getElementById('status').innerText = "DCA initialized!";
        } catch (error) {
            console.error('InitializeDCA error:', error);
            document.getElementById('status').innerText = "Initialization failed: " + error.message;
        }
    }

    async function executeDCA() {
        const accounts = await getAccounts();
        try {
            await contract.methods.executeDCA().send({ from: accounts[0] });
            document.getElementById('status').innerText = "DCA executed!";
        } catch (error) {
            console.error('ExecuteDCA error:', error);
            document.getElementById('status').innerText = "Execution failed: " + error.message;
        }
    }

    async function stopDCA() {
        const accounts = await getAccounts();
        try {
            await contract.methods.stopDCA().send({ from: accounts[0] });
            document.getElementById('status').innerText = "DCA stopped!";
        } catch (error) {
            console.error('StopDCA error:', error);
            document.getElementById('status').innerText = "Stop failed: " + error.message;
        }
    }

    async function withdraw() {
        const accounts = await getAccounts();
        try {
            await contract.methods.withdraw().send({ from: accounts[0] });
            document.getElementById('status').innerText = "Withdrawal successful!";
        } catch (error) {
            console.error('Withdraw error:', error);
            document.getElementById('status').innerText = "Withdrawal failed: " + error.message;
        }
    }
});
