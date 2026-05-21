<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class ShadowAlgorithm {
        static rankPosts(posts, userStakingLevel) {
            return posts.sort((a, b) => {
                const scoreA = this.scorePost(a, userStakingLevel);
                const scoreB = this.scorePost(b, userStakingLevel);
                return scoreB - scoreA;
            });
        }

        static scorePost(post, stakingLevel) {
            const base = post.tips * 25 + post.likes * 10 + post.comments * 15;
            const stakingMultiplier = 1 + (stakingLevel / 100);
            const freshness = Math.max(0.1, 1 - (Date.now() - post.timestamp) / (1000 * 60 * 60 * 24));
            return base * stakingMultiplier * freshness;
        }
    }

    window.ShadowAlgorithm = ShadowAlgorithm;
</script>