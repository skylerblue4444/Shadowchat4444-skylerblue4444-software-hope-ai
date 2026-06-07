<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class GovernanceManager {
        async vote(proposalId, choice) {
            const res = await fetch('/api/vote', {
                method: 'POST',
                body: JSON.stringify({proposalId, choice, staked: window.shadowCore.user.staked})
            });
            const data = await res.json();
            alert(`✅ Vote recorded on-chain: ${data.status}`);
        }
    }
    window.governance = new GovernanceManager();
</script>