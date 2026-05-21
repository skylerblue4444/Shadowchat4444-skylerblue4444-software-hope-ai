<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class StakingManager {
        async stake(amount, days) {
            const res = await fetch('/api/stake', {
                method: 'POST',
                body: JSON.stringify({amount, days})
            });
            const data = await res.json();
            alert(`✅ Staked ${amount} SKY444 for ${days} days – Sky Cycle bonus activated!`);
        }
    }
    window.stakingManager = new StakingManager();
</script>