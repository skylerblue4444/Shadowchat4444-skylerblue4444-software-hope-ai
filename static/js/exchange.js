<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class ExchangeManager {
        async executeTrade(from, to, amount) {
            await fetch('/transaction', { method: 'POST', body: JSON.stringify({amount}) });
            alert(`✅ Traded ${amount} ${from} for ${to} on-chain!`);
        }
    }
    window.exchangeManager = new ExchangeManager();
</script>