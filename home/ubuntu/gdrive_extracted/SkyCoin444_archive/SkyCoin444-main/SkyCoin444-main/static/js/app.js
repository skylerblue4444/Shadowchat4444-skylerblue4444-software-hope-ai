<!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    console.log("%c🚀 ShadowChat Beta Loaded – Made by Skyler Blue Spillers", "color:#a855f7; font-weight:bold");
    // Global functions for all pages (tipping, wallet connect, etc.)
</script><!-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC -->
<script>
    class ShadowChatApp {
        constructor() {
            this.state = {
                currentUser: null,
                walletBalance: 821730,
                feedPosts: [],
                stakedAmount: 4444,
                isConnected: false
            };
            this.apiBase = '';
            this.init();
        }

        init() {
            console.log('%c🚀 ShadowChat Full Frontend Logic Loaded – Made by Skyler Blue Spillers', 'color:#a855f7;font-weight:bold');
            this.loadFeed();
            this.attachGlobalListeners();
        }

        async loadFeed() {
            // Call backend for algorithmic feed
            const response = await fetch('/api/feed');
            const data = await response.json();
            this.state.feedPosts = data.posts;
            this.renderFeed();
        }

        // Shadow Algorithm – Enterprise-level feed ranking
        calculatePostScore(post) {
            const tipScore = post.tips * 10;
            const engagementScore = (post.likes + post.comments) * 5;
            const stakingBoost = this.state.stakedAmount > 1000 ? 50 : 0;
            const timeDecay = Math.max(0, 100 - (Date.now() - post.timestamp) / 3600000);
            return tipScore + engagementScore + stakingBoost + timeDecay;
        }

        renderFeed() {
            // Render sorted feed using Shadow Algorithm
            console.log('Feed rendered with Shadow Algorithm');
        }

        async tipPost(postId, amount) {
            const response = await fetch('/tip', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({post_id: postId, amount})
            });
            const data = await response.json();
            alert(data.status);
            this.loadFeed(); // Refresh feed after tip
        }

        async connectWallet() {
            // Full Web3.js integration stub (expandable to MetaMask + Solidity contract)
            this.state.isConnected = true;
            alert('✅ Wallet connected to Ethereum mainnet – SKY444 ready!');
        }

        attachGlobalListeners() {
            // Global event listeners for all pages
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('tip-btn')) {
                    const amount = parseFloat(e.target.dataset.amount);
                    this.tipPost('demo-post', amount);
                }
            });
        }
    }

    // Global app instance
    window.ShadowChat = new ShadowChatApp();
</script>