document.addEventListener('DOMContentLoaded', (event) => {
    const apiUrl = "https://api.scan.pulsechain.com/api";

    // Fetch pending transactions for an example address
    fetch(`${apiUrl}?module=account&action=pendingtxlist&address=0xA1077a294dDE1B09bB078844df40758a5D0f9a27`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "1") {
                document.getElementById('data').textContent = JSON.stringify(data.result, null, 2);
            } else {
                document.getElementById('data').textContent = "No pending transactions or error.";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('data').textContent = "Error fetching data.";
        });

    // You can add more API calls here for other data points like:
    // - Latest transactions
    // - Token holders
    // - Block information
});
