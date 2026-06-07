<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class CasinoManager {
        spin() {
            const emojis = ["🍒","⭐","👻","🚀","💎","🔥"];
            const result = Array(3).fill().map(() => emojis[Math.floor(Math.random()*emojis.length)]).join("");
            document.getElementById("slot").innerHTML = result;
            if (Math.random() > 0.6) {
                alert("🎉 WINNER! +44.44 SKY444 added • 25% sent to charity on-chain");
                fetch('/tip', { method: 'POST', body: JSON.stringify({amount: 11})}); // charity donation
            } else {
                alert("Better luck next spin! Tip to play again 💸");
            }
        }
    }
    window.casinoManager = new CasinoManager();
</script>