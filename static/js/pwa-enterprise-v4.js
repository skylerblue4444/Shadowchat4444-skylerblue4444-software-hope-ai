<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class EnterprisePWA_V4 {
        init() {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'SyncManager' in window) {
                navigator.serviceWorker.register('/static/sw-enterprise-v4.js').then(() => {
                    console.log('%c📱 Enterprise PWA v4 with push + background sync + notifications – billion-user mobile scale', 'color:#a855f7;font-weight:bold');
                });
            }
        }
    }
    window.enterprisePWA_V4 = new EnterprisePWA_V4();
    window.enterprisePWA_V4.init();
</script>