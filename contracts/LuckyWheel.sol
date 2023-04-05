// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LuckyWheel is ReentrancyGuard, Ownable {
    // Events
    event SpinResult(address indexed player, uint256 spinId, uint8 result, uint256 reward);
    event PrizeClaimed(address indexed player, uint256 amount);
    
    // Constants
    uint256 public constant SPIN_COST = 0.01 ether;
    uint256 public constant FIRST_PRIZE = 0.05 ether;
    uint256 public constant SECOND_PRIZE = 0.02 ether;
    uint256 public constant THIRD_PRIZE = 0.01 ether;
    
    // Probabilities (in basis points: 10000 = 100%)
    uint16 public constant FIRST_PRIZE_PROB = 100;   // 1%
    uint16 public constant SECOND_PRIZE_PROB = 1000; // 10%
    uint16 public constant THIRD_PRIZE_PROB = 2000;  // 20%
    
    // State variables
    uint256 public spinId;
    mapping(uint256 => SpinRecord) public spins;
    mapping(address => uint256) public playerTotalWinnings;
    mapping(address => uint256[]) public playerSpins;
    
    struct SpinRecord {
        address player;
        uint8 result; // 0: no prize, 1: first, 2: second, 3: third
        uint256 reward;
        uint256 timestamp;
        bool claimed;
    }
    
    constructor() {
        spinId = 0;
    }
    
    function spinWheel() external payable nonReentrant {
        require(msg.value == SPIN_COST, "Incorrect spin cost");
        require(address(this).balance >= FIRST_PRIZE, "Insufficient contract balance");
        
        // Generate random result
        uint8 result = _generateRandomResult();
        uint256 reward = _calculateReward(result);
        
        // Record the spin
        spins[spinId] = SpinRecord({
            player: msg.sender,
            result: result,
            reward: reward,
            timestamp: block.timestamp,
            claimed: false
        });
        
        playerSpins[msg.sender].push(spinId);
        
        if (reward > 0) {
            playerTotalWinnings[msg.sender] += reward;
        }
        
        emit SpinResult(msg.sender, spinId, result, reward);
        spinId++;
    }
    
    function claimPrize(uint256 _spinId) external nonReentrant {
        SpinRecord storage spin = spins[_spinId];
        require(spin.player == msg.sender, "Not your spin");
        require(!spin.claimed, "Already claimed");
        require(spin.reward > 0, "No prize to claim");
        
        spin.claimed = true;
        
        (bool success, ) = msg.sender.call{value: spin.reward}("");
        require(success, "Transfer failed");
        
        emit PrizeClaimed(msg.sender, spin.reward);
    }
    
    function _generateRandomResult() internal view returns (uint8) {
        uint256 random = uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            block.timestamp,
            msg.sender,
            spinId
        ));
        
        uint16 randomValue = uint16(random % 10000);
        
        if (randomValue < FIRST_PRIZE_PROB) {
            return 1; // First prize
        } else if (randomValue < FIRST_PRIZE_PROB + SECOND_PRIZE_PROB) {
            return 2; // Second prize
        } else if (randomValue < FIRST_PRIZE_PROB + SECOND_PRIZE_PROB + THIRD_PRIZE_PROB) {
            return 3; // Third prize
        } else {
            return 0; // No prize
        }
    }
    
    function _calculateReward(uint8 result) internal pure returns (uint256) {
        if (result == 1) return FIRST_PRIZE;
        if (result == 2) return SECOND_PRIZE;
        if (result == 3) return THIRD_PRIZE;
        return 0;
    }
    
    function getPlayerSpins(address player) external view returns (uint256[] memory) {
        return playerSpins[player];
    }
    
    function getTopPlayers(uint256 count) external view returns (address[] memory, uint256[] memory) {
        // This is a simplified version - in production you might want to use a more efficient data structure
        address[] memory players = new address[](count);
        uint256[] memory winnings = new uint256[](count);
        
        // For now, return empty arrays - this will be implemented in the next iteration
        return (players, winnings);
    }
    
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
    }
    
    receive() external payable {}
}
