<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V5 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v5.js').then(() => {
                    console.log('%c📱 Enterprise PWA v5 with push + background sync + notifications – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V5 = new EnterprisePWA_V5();
    window.enterprisePWA_V5.init();
</script>