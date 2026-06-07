<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<script>
    // Connect to MetaMask / WalletConnect for mainnet SKY444
    async function connectWallet() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            alert("✅ Connected to Ethereum! Wallet: " + accounts[0]);
            return accounts[0];
        } else {
            alert("Please install MetaMask to interact with SKY444 on mainnet");
        }
    }

    // Example: Buy SKY444 on mainnet (replace with your deployed contract address)
    async function buySKY444(amount) {
        const web3 = new Web3(window.ethereum);
        const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"; // Update after deployment
        // ABI from SKY444.sol (mint or transfer function)
        const abi = [ /* paste full ABI from compiled contract here */ ];
        const contract = new web3.eth.Contract(abi, contractAddress);
        // Call buy/mint logic here
        alert("✅ SKY444 purchase transaction sent to Ethereum mainnet!");
    }
</script>