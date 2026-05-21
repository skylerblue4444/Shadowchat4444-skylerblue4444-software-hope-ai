
<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
    async function installPWA() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
        }
    }
</script>