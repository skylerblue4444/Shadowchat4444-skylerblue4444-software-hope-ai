<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V14 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window && 'BackgroundFetch' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v14.js').then(() => {
                    console.log('%c📱 Enterprise PWA v14 with push + background sync + background fetch – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V14 = new EnterprisePWA_V14();
    window.enterprisePWA_V14.init();
</script>