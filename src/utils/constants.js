// Application constants and configuration

// Network Configuration
export const NETWORKS = {
  MAINNET: {
    id: 1,
    name: 'Ethereum Mainnet',
    chainId: '0x1',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    explorer: 'https://etherscan.io',
    currency: 'ETH'
  },
  SEPOLIA: {
    id: 11155111,
    name: 'Sepolia Testnet',
    chainId: '0xaa36a7',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    explorer: 'https://sepolia.etherscan.io',
    currency: 'SEP'
  },
  HARDHAT: {
    id: 1337,
    name: 'Hardhat Local',
    chainId: '0x539',
    rpcUrl: 'http://127.0.0.1:8545',
    explorer: '',
    currency: 'ETH'
  }
};

// Game Configuration
export const GAME_CONFIG = {
  SPIN_COST: '0.01',
  FIRST_PRIZE: '0.05',
  SECOND_PRIZE: '0.02',
  THIRD_PRIZE: '0.01',
  FIRST_PRIZE_PROBABILITY: 0.01,    // 1%
  SECOND_PRIZE_PROBABILITY: 0.10,   // 10%
  THIRD_PRIZE_PROBABILITY: 0.20,    // 20%
  NO_PRIZE_PROBABILITY: 0.69        // 69%
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 3000,
  TOAST_DURATION: 5000,
  CONFETTI_DURATION: 3000,
  WHEEL_SPIN_DURATION: 3000,
  MAX_RECENT_SPINS: 10,
  ITEMS_PER_PAGE: 10
};

// API Endpoints
export const API_ENDPOINTS = {
  SEPOLIA_FAUCET: 'https://sepoliafaucet.com',
  ETHERSCAN_API: 'https://api.etherscan.io/api',
  INFURA_API: 'https://mainnet.infura.io/v3/',
  ALCHEMY_API: 'https://eth-mainnet.alchemyapi.io/v2/'
};

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  WRONG_NETWORK: 'Please switch to Sepolia testnet',
  INSUFFICIENT_BALANCE: 'Insufficient balance for transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again',
  NETWORK_ERROR: 'Network error. Please check your connection',
  USER_REJECTED: 'Transaction was rejected by user',
  CONTRACT_NOT_DEPLOYED: 'Smart contract not deployed on this network'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  NETWORK_SWITCHED: 'Network switched successfully',
  SPIN_SUCCESS: 'Wheel spun successfully!',
  PRIZE_CLAIMED: 'Prize claimed successfully!',
  TRANSACTION_CONFIRMED: 'Transaction confirmed on blockchain'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'lucky_wheel_user_preferences',
  GAME_HISTORY: 'lucky_wheel_game_history',
  WALLET_CONNECTION: 'lucky_wheel_wallet_connection',
  THEME_PREFERENCE: 'lucky_wheel_theme',
  LANGUAGE_PREFERENCE: 'lucky_wheel_language'
};

// Theme Configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// Language Configuration
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  ZH: 'zh',
  JA: 'ja'
};

// Game States
export const GAME_STATES = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  RESULT: 'result',
  CLAIMING: 'claiming',
  ERROR: 'error'
};

// Prize Types
export const PRIZE_TYPES = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  NONE: 0
};

// Prize Names
export const PRIZE_NAMES = {
  [PRIZE_TYPES.FIRST]: 'First Prize',
  [PRIZE_TYPES.SECOND]: 'Second Prize',
  [PRIZE_TYPES.THIRD]: 'Third Prize',
  [PRIZE_TYPES.NONE]: 'No Prize'
};

// Prize Colors
export const PRIZE_COLORS = {
  [PRIZE_TYPES.FIRST]: 'from-yellow-400 to-yellow-600',
  [PRIZE_TYPES.SECOND]: 'from-gray-400 to-gray-600',
  [PRIZE_TYPES.THIRD]: 'from-amber-400 to-amber-600',
  [PRIZE_TYPES.NONE]: 'from-gray-400 to-gray-600'
};

// Validation Rules
export const VALIDATION_RULES = {
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MIN_BIO_LENGTH: 10,
  MAX_BIO_LENGTH: 500,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000
};

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  MAX_LOADING_TIME: 3000,
  MAX_ANIMATION_TIME: 5000,
  MAX_API_RESPONSE_TIME: 10000
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ENABLE_SOCIAL_FEATURES: process.env.REACT_APP_ENABLE_SOCIAL === 'true',
  ENABLE_MULTI_LANGUAGE: process.env.REACT_APP_ENABLE_I18N === 'true',
  ENABLE_DARK_MODE: process.env.REACT_APP_ENABLE_DARK_MODE === 'true'
};

export default {
  NETWORKS,
  GAME_CONFIG,
  UI_CONFIG,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  THEMES,
  LANGUAGES,
  GAME_STATES,
  PRIZE_TYPES,
  PRIZE_NAMES,
  PRIZE_COLORS,
  VALIDATION_RULES,
  PERFORMANCE_THRESHOLDS,
  FEATURE_FLAGS
};
