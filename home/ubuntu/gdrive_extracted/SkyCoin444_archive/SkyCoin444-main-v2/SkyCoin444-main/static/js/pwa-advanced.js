<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class AdvancedPWA {
        init() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/static/sw.js').then(() => {
                    console.log('%c📱 Advanced PWA + offline support activated – billion-user mobile ready', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.advancedPWA = new AdvancedPWA();
    window.advancedPWA.init();
</script>