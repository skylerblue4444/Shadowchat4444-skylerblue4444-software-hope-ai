-- ════════════════════════════════════════════════════════════════════════════
-- SKY444 — PostgreSQL Schema Initialization
-- Author: Skyler Blue Spillers — IITRL LLC
-- ════════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "citext";     -- case-insensitive email
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- fast text search

-- ─── Users ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username         VARCHAR(64) UNIQUE NOT NULL,
    email            CITEXT UNIQUE,
    wallet_address   VARCHAR(128) UNIQUE NOT NULL,
    password_hash    VARCHAR(255),
    xp               BIGINT DEFAULT 0,
    level            INTEGER DEFAULT 1,
    streak_days      INTEGER DEFAULT 0,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at     TIMESTAMPTZ,
    is_verified      BOOLEAN DEFAULT FALSE,
    is_banned        BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users (wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_username_trgm ON users USING GIN (username gin_trgm_ops);

-- ─── Transactions (mirror of blockchain for fast queries) ──────────────────
CREATE TABLE IF NOT EXISTS transactions (
    id           BIGSERIAL PRIMARY KEY,
    tx_hash      VARCHAR(128) UNIQUE NOT NULL,
    from_addr    VARCHAR(128) NOT NULL,
    to_addr      VARCHAR(128) NOT NULL,
    amount       NUMERIC(36, 8) NOT NULL,
    fee          NUMERIC(36, 8) DEFAULT 0,
    memo         TEXT,
    tx_type      VARCHAR(32) NOT NULL DEFAULT 'transfer',
    block_height BIGINT,
    status       VARCHAR(16) DEFAULT 'pending',
    created_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_tx_from   ON transactions (from_addr);
CREATE INDEX IF NOT EXISTS idx_tx_to     ON transactions (to_addr);
CREATE INDEX IF NOT EXISTS idx_tx_block  ON transactions (block_height);
CREATE INDEX IF NOT EXISTS idx_tx_time   ON transactions (created_at DESC);

-- ─── Blocks ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blocks (
    height       BIGINT PRIMARY KEY,
    block_hash   VARCHAR(128) UNIQUE NOT NULL,
    prev_hash    VARCHAR(128) NOT NULL,
    merkle_root  VARCHAR(128),
    nonce        BIGINT,
    difficulty   INTEGER,
    miner_addr   VARCHAR(128),
    tx_count     INTEGER DEFAULT 0,
    total_fees   NUMERIC(36, 8) DEFAULT 0,
    mined_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_blocks_miner ON blocks (miner_addr);
CREATE INDEX IF NOT EXISTS idx_blocks_time  ON blocks (mined_at DESC);

-- ─── Mining sessions ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mining_sessions (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_addr   VARCHAR(128) NOT NULL,
    threads       INTEGER DEFAULT 1,
    pool          VARCHAR(64),
    started_at    TIMESTAMPTZ DEFAULT NOW(),
    ended_at      TIMESTAMPTZ,
    total_hashes  BIGINT DEFAULT 0,
    blocks_found  INTEGER DEFAULT 0,
    total_earned  NUMERIC(36, 8) DEFAULT 0,
    status        VARCHAR(16) DEFAULT 'active'
);
CREATE INDEX IF NOT EXISTS idx_mining_user ON mining_sessions (user_id, started_at DESC);

-- ─── Staking positions ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS staking_positions (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
    amount         NUMERIC(36, 8) NOT NULL,
    tier           VARCHAR(32) NOT NULL,
    apy_bps        INTEGER NOT NULL,
    staked_at      TIMESTAMPTZ DEFAULT NOW(),
    unlock_at      TIMESTAMPTZ NOT NULL,
    rewards_earned NUMERIC(36, 8) DEFAULT 0,
    is_active      BOOLEAN DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_staking_user ON staking_positions (user_id);

-- ─── ShadowChat messages ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
    id           BIGSERIAL PRIMARY KEY,
    room         VARCHAR(64) NOT NULL DEFAULT 'global',
    sender_id    UUID REFERENCES users(id) ON DELETE SET NULL,
    sender_name  VARCHAR(64) NOT NULL,
    content      TEXT NOT NULL,
    is_shadow    BOOLEAN DEFAULT FALSE,
    vanish_at    TIMESTAMPTZ,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_chat_room_time ON chat_messages (room, created_at DESC);

-- ─── NFTs ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nfts (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(128) NOT NULL,
    description    TEXT,
    image_url      TEXT,
    rarity         VARCHAR(32),
    collection     VARCHAR(64),
    creator_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    owner_id       UUID REFERENCES users(id) ON DELETE SET NULL,
    price          NUMERIC(36, 8),
    is_listed      BOOLEAN DEFAULT FALSE,
    minted_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_nft_owner  ON nfts (owner_id);
CREATE INDEX IF NOT EXISTS idx_nft_rarity ON nfts (rarity);

-- ─── Governance proposals ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS proposals (
    id           BIGSERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  TEXT NOT NULL,
    proposer_id  UUID REFERENCES users(id) ON DELETE SET NULL,
    votes_yes    NUMERIC(36, 8) DEFAULT 0,
    votes_no     NUMERIC(36, 8) DEFAULT 0,
    votes_abstain NUMERIC(36, 8) DEFAULT 0,
    status       VARCHAR(16) DEFAULT 'active',
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    ends_at      TIMESTAMPTZ NOT NULL
);

-- ─── Audit log ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
    id         BIGSERIAL PRIMARY KEY,
    user_id    UUID REFERENCES users(id) ON DELETE SET NULL,
    action     VARCHAR(64) NOT NULL,
    payload    JSONB,
    ip_addr    INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_log (created_at DESC);

-- ─── Triggers: auto-update `updated_at` on users ──────────────────────────
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_users ON users;
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- ─── Done ─────────────────────────────────────────────────────────────────
-- End of SKY444 schema initialization
