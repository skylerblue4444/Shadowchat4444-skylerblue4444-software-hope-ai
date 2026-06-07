<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V7 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window && 'BackgroundFetch' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v7.js').then(() => {
                    console.log('%c📱 Enterprise PWA v7 with push + background sync + background fetch – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V7 = new EnterprisePWA_V7();
    window.enterprisePWA_V7.init();
</script>