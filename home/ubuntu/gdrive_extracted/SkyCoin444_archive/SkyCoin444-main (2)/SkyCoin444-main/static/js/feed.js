<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class FeedManager {
        constructor() {
            this.posts = [];
        }
        async load() {
            const res = await fetch('/api/feed');
            this.posts = await res.json();
            this.posts = window.ShadowAlgorithm.rank(this.posts, window.shadowCore.user.staked);
            this.render();
        }
        render() {
            console.log('🎯 Feed ranked by Shadow Algorithm (tips + staking + freshness)');
        }
    }
    window.feedManager = new FeedManager();
</script>