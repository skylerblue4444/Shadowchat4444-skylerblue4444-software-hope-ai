<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script src="https://cdn.jsdelivr.net/npm/ethers@6.13.2/dist/ethers.umd.min.js"></script>
<script>
    let provider, signer, contract;

    const SKY444_ABI = [ /* Full ABI from SKY444.sol – paste the compiled ABI here */ ];
    const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_MAINNET_ADDRESS"; // Update after deployment

    async function connectWalletFull() {
        if (!window.ethereum) return alert("Install MetaMask");
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, SKY444_ABI, signer);
        alert("✅ Connected to Ethereum Mainnet – Full SKY444 contract ready!");
    }

    async function buySKY444(amount) {
        if (!contract) return alert("Connect wallet first");
        const tx = await contract.mint(await signer.getAddress(), ethers.parseEther(amount.toString()));
        await tx.wait();
        alert("✅ SKY444 purchased on mainnet!");
    }

    async function stakeSKY444(amount) {
        if (!contract) return alert("Connect wallet first");
        const tx = await contract.approve(/* staking contract address */, ethers.parseEther(amount.toString()));
        await tx.wait();
        alert("✅ SKY444 staked on mainnet!");
    }

    window.web3Full = { connectWalletFull, buySKY444, stakeSKY444 };
</script>