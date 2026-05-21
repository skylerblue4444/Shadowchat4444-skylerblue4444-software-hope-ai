<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V13 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window && 'BackgroundFetch' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v13.js').then(() => {
                    console.log('%c📱 Enterprise PWA v13 with push + background sync + background fetch – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V13 = new EnterprisePWA_V13();
    window.enterprisePWA_V13.init();
</script>