<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    // Neon glow animation on buttons
    function addNeonEffect() {
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.boxShadow = '0 0 25px #a855f7';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.boxShadow = '';
            });
        });
    }

    // Auto-refresh feed every 30 seconds
    setInterval(() => {
        if (window.shadowCore) window.shadowCore.fetchFeed();
    }, 30000);

    console.log('%c✨ Extra polish utilities loaded', 'color:#a855f7');
</script>