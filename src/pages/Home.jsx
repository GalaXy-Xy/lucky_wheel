import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import LuckyWheel from '../components/LuckyWheel';
import { AlertTriangle, Info } from 'lucide-react';

const Home = () => {
  const { account, isSepolia, switchToSepolia } = useWallet();

  if (!account) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Lucky Wheel</h1>
          <p className="text-gray-600 mb-6">
            Connect your MetaMask wallet to start spinning the wheel and win prizes on Ethereum Sepolia testnet!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium text-blue-900 mb-2">How to get started:</h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Install MetaMask browser extension</li>
                  <li>2. Create or import a wallet</li>
                  <li>3. Switch to Sepolia testnet</li>
                  <li>4. Get some test ETH from a faucet</li>
                  <li>5. Connect your wallet and start spinning!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isSepolia) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Switch to Sepolia Testnet</h1>
          <p className="text-gray-600 mb-6">
            This DApp only works on Ethereum Sepolia testnet. Please switch your network to continue.
          </p>
          <button
            onClick={switchToSepolia}
            className="btn-primary text-lg px-8 py-3"
          >
            Switch to Sepolia
          </button>
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium text-yellow-900 mb-2">Why Sepolia?</h3>
                <p className="text-sm text-yellow-800">
                  Sepolia is a testnet that allows you to test the DApp without spending real ETH. 
                  You can get free test ETH from various faucets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LuckyWheel />;
};

export default Home;
