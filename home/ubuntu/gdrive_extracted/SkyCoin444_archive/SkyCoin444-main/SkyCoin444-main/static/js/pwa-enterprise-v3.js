<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V3 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v3.js').then(() => {
                    console.log('%c📱 Enterprise PWA v3 with push + background sync – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V3 = new EnterprisePWA_V3();
    window.enterprisePWA_V3.init();
</script>