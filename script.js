const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/-b9x-YpIwfCG6EpnctUpMECRvRTKCZ9W"
);

const SHIB_TOKEN_ADDRESS = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
const WETH_TOKEN_ADDRESS = "0xC02aaA39b223FE8D0a0E5C4F27eAD9083C756Cc2";
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAP_ROUTER_ABI = [
  {
    name: "getAmountsOut",
    type: "function",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" }
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
    constant: true,
    stateMutability: "view"
  }
];

let shibPrice = 0;

// Update SHIB price periodically
async function fetchSHIBPrice() {
  const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, provider);
  const amountIn = ethers.utils.parseUnits("1", 18); // 1 WETH
  const path = [WETH_TOKEN_ADDRESS, SHIB_TOKEN_ADDRESS];

  try {
    const amountsOut = await router.getAmountsOut(amountIn, path);
    shibPrice = parseFloat(ethers.utils.formatUnits(amountsOut[1], 18));
    document.getElementById("shib-price").textContent = `SHIB Price: $${(shibPrice * 1000).toFixed(8)}`;
  } catch (error) {
    console.error("Error fetching SHIB price:", error);
    document.getElementById("shib-price").textContent = "Failed to fetch price.";
  }
}

// DCA Bot Logic
let botInterval;
document.getElementById("dca-setup-form").addEventListener("submit", (event) => {
  event.preventDefault();

  if (botInterval) {
    clearInterval(botInterval);
  }

  const dcaAmount = parseFloat(document.getElementById("dca-amount").value);
  const dcaThreshold = parseFloat(document.getElementById("dca-threshold").value);
  const dcaInterval = parseInt(document.getElementById("dca-interval").value) * 1000;

  if (isNaN(dcaAmount) || isNaN(dcaThreshold) || isNaN(dcaInterval)) {
    alert("Please enter valid values.");
    return;
  }

  document.getElementById("bot-status").textContent = "Active";

  let lastPrice = shibPrice;

  botInterval = setInterval(async () => {
    await fetchSHIBPrice();

    if (shibPrice < lastPrice * (1 - dcaThreshold / 100)) {
      console.log(`Price dropped by ${dcaThreshold}% or more. Executing buy.`);
      // Execute buy logic
      executeBuy(dcaAmount);
    }

    lastPrice = shibPrice;
  }, dcaInterval);
});

// Execute a Uniswap buy
async function executeBuy(amount) {
  console.log(`Executing buy for ${amount} ETH worth of SHIB.`);
  // Here you can implement the logic to interact with Uniswap and perform the buy.
}

// Fetch SHIB price immediately and then periodically
fetchSHIBPrice();
setInterval(fetchSHIBPrice, 60000); // Refresh price every 60 seconds
