# Lucky Wheel - Decentralized Lottery DApp

A decentralized lucky wheel DApp built on Ethereum Sepolia testnet, featuring transparent prize distribution, fair random number generation, and a modern React frontend.

## 🎯 Features

- **Decentralized Lottery**: Built on Ethereum blockchain with smart contract automation
- **Fair Random Generation**: Uses cryptographic random number generation for unbiased results
- **Multiple Prize Tiers**: 
  - First Prize: 0.05 ETH (1% probability)
  - Second Prize: 0.02 ETH (10% probability)  
  - Third Prize: 0.01 ETH (20% probability)
  - No Prize: 69% probability
- **Real-time Leaderboard**: Track top players by total winnings
- **Comprehensive History**: View personal and global spin records
- **Mobile Responsive**: Optimized for all device sizes
- **MetaMask Integration**: Seamless wallet connection and network switching

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **Smart Contracts**: Solidity + Hardhat
- **Web3 Integration**: Ethers.js
- **State Management**: React Context + Hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- MetaMask browser extension
- Sepolia testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GalaXy-Xy/lucky_wheel.git
   cd lucky_wheel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Smart Contract Configuration
REACT_APP_CONTRACT_ADDRESS=0x... # Deployed contract address
REACT_APP_NETWORK_ID=11155111    # Sepolia testnet

# Optional: Infura/Alchemy endpoint
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

### Smart Contract Deployment

1. **Compile contracts**
   ```bash
   npm run compile
   ```

2. **Deploy to Sepolia**
   ```bash
   npm run deploy
   ```

3. **Update environment variables** with the deployed contract address

## 🎮 How to Play

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Switch Network**: Ensure you're on Sepolia testnet (automatic prompt if needed)
3. **Get Test ETH**: Visit [Sepolia Faucet](https://sepoliafaucet.com/) for free test tokens
4. **Spin the Wheel**: Click "Spin the Wheel" and confirm the 0.01 ETH transaction
5. **Claim Prizes**: If you win, prizes are automatically sent to your wallet
6. **Track Progress**: View your history and check the leaderboard

## 📱 User Interface

### Home Page
- Interactive lucky wheel with spinning animation
- Real-time balance display
- Prize information and probabilities
- Wallet connection status

### Leaderboard
- Top 10 players by total winnings
- Personal ranking display
- Statistics overview
- Real-time updates

### History
- Personal spin records with transaction details
- Global activity feed
- Filtering by result type
- CSV export functionality

## 🔒 Security Features

- **Reentrancy Protection**: Prevents double-spending attacks
- **Access Control**: Owner-only functions for contract management
- **Input Validation**: Comprehensive parameter checking
- **Event Logging**: All actions recorded on blockchain
- **Network Validation**: Automatic Sepolia testnet detection

## 🧪 Testing

### Smart Contract Tests
```bash
npm run test
```

### Frontend Tests
```bash
npm run test:frontend
```

### Integration Tests
```bash
npm run test:integration
```

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm run deploy:vercel
```

### Deploy to Netlify
```bash
npm run deploy:netlify
```

## 🌐 Network Support

Currently supports:
- **Sepolia Testnet** (Main development network)
- **Local Hardhat Network** (Development and testing)

Future support planned:
- **Ethereum Mainnet** (Production deployment)
- **Polygon** (Lower gas fees)
- **Arbitrum** (Fast finality)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing code formatting
- Use conventional commit messages
- Include tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](https://github.com/GalaXy-Xy/lucky_wheel/wiki)
- **Issues**: [GitHub Issues](https://github.com/GalaXy-Xy/lucky_wheel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GalaXy-Xy/lucky_wheel/discussions)
- **Email**: galaxyinblue@outlook.com

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries
- [Hardhat](https://hardhat.org/) for development framework
- [Ethers.js](https://docs.ethers.io/) for Web3 integration
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the frontend framework

## 📊 Project Status

- ✅ Smart Contract Development
- ✅ Frontend Implementation  
- ✅ Wallet Integration
- ✅ Testing Suite
- ✅ Documentation
- 🔄 Security Audit (In Progress)
- 🔄 Mainnet Deployment (Planned)

---

**Built with ❤️ by the GalaXy Team**

*For educational and entertainment purposes. Please gamble responsibly.*