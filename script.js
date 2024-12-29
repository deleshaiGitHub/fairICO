// Configuration
const TOKEN_ADDRESS = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"; // SHIBA INU (SHIB)
const API_URL = "https://api.coingecko.com/api/v3/simple/token_price/ethereum";
const THRESHOLD_PRICE = 0.00001; // Example threshold price in USD
let currentPrice = null;

// HTML Elements
const tokenPriceElement = document.getElementById("tokenPrice");
const statusElement = document.getElementById("status");

// Function to Fetch Token Price
async function fetchTokenPrice() {
    try {
        const response = await fetch(`${API_URL}?contract_addresses=${TOKEN_ADDRESS}&vs_currencies=usd`);
        const data = await response.json();

        // Update price
        currentPrice = data[TOKEN_ADDRESS.toLowerCase()].usd;
        tokenPriceElement.textContent = `$${currentPrice.toFixed(8)}`;

        // Check Condition
        if (currentPrice < THRESHOLD_PRICE) {
            statusElement.textContent = "Price below threshold! Time to act!";
            statusElement.classList.replace("status", "error");

            // Example Action
            console.log("Trigger action: Price below threshold.");
        } else {
            statusElement.textContent = "Monitoring...";
            statusElement.classList.replace("error", "status");
        }
    } catch (error) {
        console.error("Error fetching price:", error);
        statusElement.textContent = "Error fetching price!";
        statusElement.classList.replace("status", "error");
    }
}

// Periodically Check Price
setInterval(fetchTokenPrice, 10000); // Check every 10 seconds
fetchTokenPrice(); // Initial call
