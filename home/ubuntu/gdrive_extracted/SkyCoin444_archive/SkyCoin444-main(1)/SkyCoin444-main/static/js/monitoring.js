<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    async function checkHealth() {
        const res = await fetch('/health');
        const data = await res.json();
        console.log('✅ Health check passed:', data);
    }
    setInterval(checkHealth, 60000);
</script>