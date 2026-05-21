// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * SkyCoin444 Smart Contracts
 * Production-Grade Blockchain Integration
 * Multi-Chain Support: Ethereum, Polygon, BSC, Avalanche, Arbitrum, Optimism
 */

// ============================================================================
// 1. SKY TOKEN - ERC20 with Advanced Features
// ============================================================================

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract SkyToken is IERC20 {
    string public name = "SkyCoin";
    string public symbol = "SKY";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public isBlacklisted;

    address public owner;
    uint256 public taxRate = 2; // 2% tax on transfers
    address public taxCollector;

    event Burn(address indexed from, uint256 amount);
    event Mint(address indexed to, uint256 amount);

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        taxCollector = msg.sender;
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(!isBlacklisted[msg.sender], "Sender is blacklisted");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        uint256 tax = (amount * taxRate) / 100;
        uint256 netAmount = amount - tax;

        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += netAmount;
        balanceOf[taxCollector] += tax;

        emit Transfer(msg.sender, recipient, netAmount);
        emit Transfer(msg.sender, taxCollector, tax);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        require(!isBlacklisted[sender], "Sender is blacklisted");
        require(balanceOf[sender] >= amount, "Insufficient balance");
        require(allowance[sender][msg.sender] >= amount, "Allowance exceeded");

        uint256 tax = (amount * taxRate) / 100;
        uint256 netAmount = amount - tax;

        balanceOf[sender] -= amount;
        balanceOf[recipient] += netAmount;
        balanceOf[taxCollector] += tax;
        allowance[sender][msg.sender] -= amount;

        emit Transfer(sender, recipient, netAmount);
        emit Transfer(sender, taxCollector, tax);
        return true;
    }

    function burn(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Burn(msg.sender, amount);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint");
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Mint(to, amount);
    }

    function blacklist(address account) public {
        require(msg.sender == owner, "Only owner can blacklist");
        isBlacklisted[account] = true;
    }

    function removeFromBlacklist(address account) public {
        require(msg.sender == owner, "Only owner can remove from blacklist");
        isBlacklisted[account] = false;
    }
}

// ============================================================================
// 2. NFT MARKETPLACE - ERC721 with Royalties
// ============================================================================

interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
}

contract SkyCoinNFT is IERC721 {
    string public name = "SkyCoin NFT";
    string public symbol = "SKYNFT";

    mapping(uint256 => address) public tokenOwner;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public tokenApproval;
    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => uint256) public royaltyPercentage;
    mapping(uint256 => address) public royaltyRecipient;

    uint256 public nextTokenId = 1;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, string memory uri, uint256 royalty, address royaltyAddr) public returns (uint256) {
        require(msg.sender == owner, "Only owner can mint");
        uint256 tokenId = nextTokenId++;
        tokenOwner[tokenId] = to;
        balanceOf[to]++;
        tokenURI[tokenId] = uri;
        royaltyPercentage[tokenId] = royalty;
        royaltyRecipient[tokenId] = royaltyAddr;
        emit Transfer(address(0), to, tokenId);
        return tokenId;
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        require(tokenOwner[tokenId] != address(0), "Token does not exist");
        return tokenOwner[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(tokenOwner[tokenId] == from, "Not the owner");
        require(msg.sender == from || msg.sender == tokenApproval[tokenId], "Not authorized");

        tokenOwner[tokenId] = to;
        balanceOf[from]--;
        balanceOf[to]++;
        tokenApproval[tokenId] = address(0);

        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        require(msg.sender == tokenOwner[tokenId], "Not the owner");
        tokenApproval[tokenId] = to;
        emit Approval(msg.sender, to, tokenId);
    }
}

// ============================================================================
// 3. STAKING CONTRACT - Yield Generation
// ============================================================================

contract StakingContract {
    SkyToken public token;
    address public owner;

    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 rewardRate;
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    uint256 public baseRewardRate = 10; // 10% APY

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

    constructor(address tokenAddress) {
        token = SkyToken(tokenAddress);
        owner = msg.sender;
    }

    function stake(uint256 amount) public {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (stakes[msg.sender].amount > 0) {
            claimReward();
        }

        stakes[msg.sender].amount += amount;
        stakes[msg.sender].startTime = block.timestamp;
        stakes[msg.sender].rewardRate = baseRewardRate;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        require(stakes[msg.sender].amount >= amount, "Insufficient staked amount");

        claimReward();

        stakes[msg.sender].amount -= amount;
        totalStaked -= amount;

        require(token.transfer(msg.sender, amount), "Transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    function claimReward() public {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(stakeInfo.amount > 0, "No stake found");

        uint256 timeStaked = block.timestamp - stakeInfo.startTime;
        uint256 reward = (stakeInfo.amount * stakeInfo.rewardRate * timeStaked) / (365 days * 100);

        stakeInfo.startTime = block.timestamp;

        require(token.transfer(msg.sender, reward), "Reward transfer failed");
        emit RewardClaimed(msg.sender, reward);
    }

    function getReward(address user) public view returns (uint256) {
        StakeInfo storage stakeInfo = stakes[user];
        if (stakeInfo.amount == 0) return 0;

        uint256 timeStaked = block.timestamp - stakeInfo.startTime;
        return (stakeInfo.amount * stakeInfo.rewardRate * timeStaked) / (365 days * 100);
    }
}

// ============================================================================
// 4. ICO CONTRACT - Initial Coin Offering
// ============================================================================

contract ICO {
    SkyToken public token;
    address public owner;
    uint256 public rate = 1000; // 1 ETH = 1000 SKY
    uint256 public totalRaised;
    uint256 public maxCap = 10000 ether;
    bool public icoActive = true;

    mapping(address => uint256) public contributions;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event ICOEnded();

    constructor(address tokenAddress) {
        token = SkyToken(tokenAddress);
        owner = msg.sender;
    }

    function buyTokens() public payable {
        require(icoActive, "ICO is not active");
        require(msg.value > 0, "Must send ETH");
        require(totalRaised + msg.value <= maxCap, "Exceeds max cap");

        uint256 tokenAmount = msg.value * rate;
        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");
        emit TokensPurchased(msg.sender, tokenAmount);
    }

    function endICO() public {
        require(msg.sender == owner, "Only owner can end ICO");
        icoActive = false;
        emit ICOEnded();
    }

    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}

// ============================================================================
// 5. GOVERNANCE CONTRACT - DAO Voting
// ============================================================================

contract Governance {
    SkyToken public token;
    address public owner;

    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed proposalId, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor(address tokenAddress) {
        token = SkyToken(tokenAddress);
        owner = msg.sender;
    }

    function createProposal(string memory description) public returns (uint256) {
        require(token.balanceOf(msg.sender) > 0, "Must hold SKY tokens");

        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.description = description;
        proposal.deadline = block.timestamp + 7 days;

        emit ProposalCreated(proposalId, description);
        return proposalId;
    }

    function vote(uint256 proposalId, bool support) public {
        require(token.balanceOf(msg.sender) > 0, "Must hold SKY tokens");
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        proposal.hasVoted[msg.sender] = true;

        uint256 votingPower = token.balanceOf(msg.sender);
        if (support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }

        emit VoteCast(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) public {
        require(msg.sender == owner, "Only owner can execute");
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.deadline, "Voting still ongoing");
        require(!proposal.executed, "Already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal rejected");

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
}
