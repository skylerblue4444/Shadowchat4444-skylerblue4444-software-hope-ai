<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v2.js').then(() => {
                    console.log('%c📱 Enterprise PWA v2 with push notifications + offline mode – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA = new EnterprisePWA();
    window.enterprisePWA.init();
</script>