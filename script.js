// Initialize Web3
const web3 = new Web3(window.ethereum);

// Contract details
const contractAddress = '0x303CDf9a4E9730d281162e086E2F21C2b3Ab6b7d';
let contractABI = [];

// Load ABI from external file
fetch('contractABI.json')
  .then((response) => response.json())
  .then((abi) => {
    contractABI = abi;
    window.contract = new web3.eth.Contract(contractABI, contractAddress);
  })
  .catch((error) => {
    console.error('Error loading ABI:', error);
  });

// Handle Deposit Form Submission
document.getElementById('depositForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const daiAmount = document.getElementById('daiAmount').value;
  const plsAmount = document.getElementById('plsAmount').value;

  try {
    // Request user's account via MetaMask
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userAddress = accounts[0];

    // Call deposit function
    await window.contract.methods.deposit(daiAmount, plsAmount).send({ from: userAddress });
    document.getElementById('output').innerText = 'Deposit successful!';
  } catch (error) {
    console.error('Error depositing funds:', error);
    document.getElementById('output').innerText = 'Error: ' + error.message;
  }
});
