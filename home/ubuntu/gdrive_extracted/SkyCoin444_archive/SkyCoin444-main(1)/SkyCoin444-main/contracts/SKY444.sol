// SPDX-License-Identifier: MIT
// Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
// SKY444 Token - Mainnet Ready

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SKY444 is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 444_444_444 * 10 ** 18; // 8 decimals in UI, but 18 on-chain standard

    constructor() ERC20("skyCoin444", "SKY444") Ownable(msg.sender) {
        // Genesis allocation (10% pre-mine to founder)
        _mint(msg.sender, 44_444_444 * 10 ** 18);
    }
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SKY444 is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 444_444_444 * 10 ** 18;

    constructor() ERC20("skyCoin444", "SKY444") Ownable(msg.sender) {
        _mint(msg.sender, 44_444_444 * 10 ** 18);
    }

    function _update(address from, address to, uint256 value) internal override {
        uint256 burnAmount = value * 2 / 100;
        super._update(from, to, value - burnAmount);
        if (burnAmount > 0) {
            _burn(from, burnAmount);
        }
    }
}
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
        _mint(to, amount);
    }

    // 2% burn on every transfer (deflationary like tokenomics)
    function _update(address from, address to, uint256 value) internal override {
        uint256 burnAmount = value * 2 / 100; // 2% burn
        super._update(from, to, value - burnAmount);
        if (burnAmount > 0) {
            _burn(from, burnAmount);
        }
    }

    // View functions for UI
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}