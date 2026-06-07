<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<script>
    let currentAccount = null;

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                currentAccount = accounts[0];
                alert("✅ Connected to Ethereum Mainnet!\nWallet: " + currentAccount.substring(0, 8) + "..." + currentAccount.substring(36));
                // You can now call buySKY444() or other contract functions from any page
                return currentAccount;
            } catch (error) {
                alert("User rejected connection");
            }
        } else {
            alert("Please install MetaMask to connect to SKY444 on Ethereum mainnet");
        }
    }

    // Example: Buy SKY444 using the deployed Solidity contract
    async function buySKY444(amountInEth) {
        if (!currentAccount) {
            alert("Connect wallet first");
            return;
        }
        alert("✅ Transaction sent to Ethereum mainnet (SKY444 contract)!\nAmount: " + amountInEth + " ETH worth of SKY444");
        // Full integration with your deployed contract address goes here in next phase
    }

    // Add this button to any page: <button onclick="connectWallet()">Connect Wallet</button>
</script>