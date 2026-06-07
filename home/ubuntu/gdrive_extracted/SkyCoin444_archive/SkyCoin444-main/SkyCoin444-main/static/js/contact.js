<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    async function submitContact(formData) {
        await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
        alert('✅ Message sent to Skyler – he will call you at 479-406-8378');
    }
</script>