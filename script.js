const RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/-b9x-YpIwfCG6EpnctUpMECRvRTKCZ9W";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

let botInterval = null;
let lastBuyPrice = null;

// Fetch SHIB price from a Uniswap pair contract
async function fetchShibPrice() {
  try {
    const shibPrice = await getShibPrice(); // Add Uniswap price logic here
    document.getElementById("shib-price").innerText = `$${shibPrice}`;
    return parseFloat(shibPrice);
  } catch (error) {
    document.getElementById("shib-price").innerText = "Error fetching price";
    console.error("Error fetching SHIB price:", error);
  }
}

// Start the DCA bot
function startDcaBot() {
  const buyAmount = parseFloat(document.getElementById("buy-amount").value);
  const threshold = parseFloat(document.getElementById("threshold").value) / 100;
  const interval = parseInt(document.getElementById("interval").value) * 1000;

  if (isNaN(buyAmount) || isNaN(threshold) || isNaN(interval)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (botInterval) clearInterval(botInterval); // Clear previous intervals

  botInterval = setInterval(async () => {
    const currentPrice = await fetchShibPrice();

    if (lastBuyPrice === null || currentPrice <= lastBuyPrice * (1 - threshold)) {
      console.log(`DCA Buy Triggered at Price: $${currentPrice}`);
      await executeBuy(buyAmount); // Placeholder for actual trade logic
      lastBuyPrice = currentPrice;
    }
  }, interval);

  document.getElementById("bot-status").innerText = "Bot is running.";
  document.getElementById("start-bot").disabled = true;
  document.getElementById("stop-bot").disabled = false;
}

// Stop the DCA bot
function stopDcaBot() {
  if (botInterval) clearInterval(botInterval);
  botInterval = null;
  document.getElementById("bot-status").innerText = "Bot is not running.";
  document.getElementById("start-bot").disabled = false;
  document.getElementById("stop-bot").disabled = true;
}

// Placeholder for executing the buy
async function executeBuy(amount) {
  console.log(`Executing buy with amount: ${amount} ETH`);
  // Add Uniswap Router interaction logic here
}

// Attach event listeners
document.getElementById("start-bot").addEventListener("click", startDcaBot);
document.getElementById("stop-bot").addEventListener("click", stopDcaBot);

// Fetch price initially and update every 10 seconds
fetchShibPrice();
setInterval(fetchShibPrice, 10000);
