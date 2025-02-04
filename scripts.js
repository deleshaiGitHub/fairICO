document.addEventListener('DOMContentLoaded', (event) => {
    const apiUrl = "https://api.scan.pulsechain.com/api";

    // Fetch pending transactions for an example address
    fetch(`${apiUrl}?module=account&action=pendingtxlist&address=0xE60B1B8bD493569a3E945be50A6c89d29a560Fa1`)
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
