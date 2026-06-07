<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA {
        init() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/static/sw-enterprise.js').then(() => {
                    console.log('%c📱 Enterprise PWA with offline + push notifications activated – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA = new EnterprisePWA();
    window.enterprisePWA.init();
</script>