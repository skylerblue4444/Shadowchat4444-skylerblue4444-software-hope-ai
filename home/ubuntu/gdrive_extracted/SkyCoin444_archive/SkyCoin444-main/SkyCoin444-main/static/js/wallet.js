<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class WalletManager {
        async send(to, amount) {
            const res = await fetch('/transaction', {
                method: 'POST',
                body: JSON.stringify({recipient: to, amount})
            });
            const data = await res.json();
            alert(`✅ Sent ${amount} SKY444 to ${to} on-chain!`);
        }
    }
    window.walletManager = new WalletManager();
</script>