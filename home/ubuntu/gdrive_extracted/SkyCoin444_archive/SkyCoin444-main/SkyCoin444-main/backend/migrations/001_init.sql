-- Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
CREATE TABLE IF NOT EXISTS user_balances (
    address VARCHAR PRIMARY KEY,
    balance FLOAT DEFAULT 0.0,
    staked FLOAT DEFAULT 0.0
);