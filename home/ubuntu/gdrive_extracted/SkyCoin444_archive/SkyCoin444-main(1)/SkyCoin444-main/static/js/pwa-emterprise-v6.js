<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V6 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window && 'BackgroundFetch' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v6.js').then(() => {
                    console.log('%c📱 Enterprise PWA v6 with push + background sync + background fetch – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V6 = new EnterprisePWA_V6();
    window.enterprisePWA_V6.init();
</script>