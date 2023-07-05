import { ethers } from 'ethers';

// Contract ABI - this would be imported from the compiled contract
export const CONTRACT_ABI = [
  "function spinWheel() external payable",
  "function claimPrize(uint256 spinId) external",
  "function getPlayerSpins(address player) external view returns (uint256[])",
  "function spins(uint256) external view returns (address player, uint8 result, uint256 reward, uint256 timestamp, bool claimed)",
  "function playerTotalWinnings(address) external view returns (uint256)",
  "function spinId() external view returns (uint256)",
  "function SPIN_COST() external view returns (uint256)",
  "function FIRST_PRIZE() external view returns (uint256)",
  "function SECOND_PRIZE() external view returns (uint256)",
  "function THIRD_PRIZE() external view returns (uint256)",
  "event SpinResult(address indexed player, uint256 indexed spinId, uint8 result, uint256 reward)",
  "event PrizeClaimed(address indexed player, uint256 amount)"
];

export class LuckyWheelContract {
  constructor(contractAddress, signer) {
    this.contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    this.signer = signer;
  }

  async spinWheel() {
    try {
      const spinCost = await this.contract.SPIN_COST();
      const tx = await this.contract.spinWheel({ value: spinCost });
      return await tx.wait();
    } catch (error) {
      console.error('Error spinning wheel:', error);
      throw error;
    }
  }

  async claimPrize(spinId) {
    try {
      const tx = await this.contract.claimPrize(spinId);
      return await tx.wait();
    } catch (error) {
      console.error('Error claiming prize:', error);
      throw error;
    }
  }

  async getPlayerSpins(playerAddress) {
    try {
      const spinIds = await this.contract.getPlayerSpins(playerAddress);
      const spins = [];
      
      for (const spinId of spinIds) {
        const spin = await this.contract.spins(spinId);
        spins.push({
          id: spinId.toString(),
          player: spin.player,
          result: spin.result,
          reward: ethers.formatEther(spin.reward),
          timestamp: new Date(parseInt(spin.timestamp) * 1000).toISOString(),
          claimed: spin.claimed
        });
      }
      
      return spins;
    } catch (error) {
      console.error('Error getting player spins:', error);
      throw error;
    }
  }

  async getPlayerTotalWinnings(playerAddress) {
    try {
      const winnings = await this.contract.playerTotalWinnings(playerAddress);
      return ethers.formatEther(winnings);
    } catch (error) {
      console.error('Error getting player winnings:', error);
      throw error;
    }
  }

  async getContractInfo() {
    try {
      const [spinCost, firstPrize, secondPrize, thirdPrize, totalSpins] = await Promise.all([
        this.contract.SPIN_COST(),
        this.contract.FIRST_PRIZE(),
        this.contract.SECOND_PRIZE(),
        this.contract.THIRD_PRIZE(),
        this.contract.spinId()
      ]);

      return {
        spinCost: ethers.formatEther(spinCost),
        firstPrize: ethers.formatEther(firstPrize),
        secondPrize: ethers.formatEther(secondPrize),
        thirdPrize: ethers.formatEther(thirdPrize),
        totalSpins: totalSpins.toString()
      };
    } catch (error) {
      console.error('Error getting contract info:', error);
      throw error;
    }
  }

  async getContractBalance() {
    try {
      const balance = await this.signer.provider.getBalance(this.contract.target);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting contract balance:', error);
      throw error;
    }
  }

  // Listen to events
  onSpinResult(callback) {
    this.contract.on('SpinResult', callback);
  }

  onPrizeClaimed(callback) {
    this.contract.on('PrizeClaimed', callback);
  }

  // Remove event listeners
  removeAllListeners() {
    this.contract.removeAllListeners();
  }
}

// Utility functions
export const formatEther = (wei) => ethers.formatEther(wei);
export const parseEther = (ether) => ethers.parseEther(ether);
export const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

// Error handling
export const getErrorMessage = (error) => {
  if (error.code === 'ACTION_REJECTED') {
    return 'Transaction was rejected by user';
  }
  if (error.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds for transaction';
  }
  if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
    return 'Transaction may fail - check your input';
  }
  if (error.message.includes('user rejected')) {
    return 'Transaction was rejected';
  }
  return error.message || 'An unknown error occurred';
};

// Network validation
export const validateNetwork = (chainId) => {
  const SEPOLIA_CHAIN_ID = 11155111n;
  return chainId === SEPOLIA_CHAIN_ID;
};

// Transaction status helpers
export const getTransactionStatus = (receipt) => {
  if (receipt.status === 1) {
    return { success: true, message: 'Transaction successful' };
  } else {
    return { success: false, message: 'Transaction failed' };
  }
};
