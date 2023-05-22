import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';
import { RotateCcw, Trophy, AlertCircle } from 'lucide-react';

const LuckyWheel = () => {
  const { account, signer, isSepolia } = useWallet();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [contractBalance, setContractBalance] = useState('0');
  const [userBalance, setUserBalance] = useState('0');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const wheelRef = useRef(null);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0x...'; // Will be set after deployment
  
  const prizes = [
    { id: 1, name: 'First Prize', amount: '0.05 ETH', probability: '1%', color: 'from-yellow-400 to-yellow-600' },
    { id: 2, name: 'Second Prize', amount: '0.02 ETH', probability: '10%', color: 'from-blue-400 to-blue-600' },
    { id: 3, name: 'Third Prize', amount: '0.01 ETH', probability: '20%', color: 'from-green-400 to-green-600' },
    { id: 0, name: 'No Prize', amount: '0 ETH', probability: '69%', color: 'from-gray-400 to-gray-600' }
  ];

  useEffect(() => {
    if (account && signer) {
      fetchBalances();
    }
  }, [account, signer]);

  const fetchBalances = async () => {
    try {
      const balance = await signer.provider.getBalance(account);
      setUserBalance(ethers.formatEther(balance));
      
      // Fetch contract balance if contract is deployed
      if (contractAddress !== '0x...') {
        const contractBalance = await signer.provider.getBalance(contractAddress);
        setContractBalance(ethers.formatEther(contractBalance));
      }
    } catch (err) {
      console.error('Error fetching balances:', err);
    }
  };

  const spinWheel = async () => {
    if (!account || !signer || !isSepolia) {
      setError('Please connect your wallet and switch to Sepolia testnet');
      return;
    }

    if (parseFloat(userBalance) < 0.01) {
      setError('Insufficient balance. You need at least 0.01 ETH to spin');
      return;
    }

    setIsSpinning(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate spinning animation
      const spinDuration = 3000;
      const startTime = Date.now();
      
      // Animate wheel rotation
      const animateWheel = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        if (wheelRef.current) {
          const rotation = 360 * 5 + (360 * progress); // 5 full rotations + progress
          wheelRef.current.style.transform = `rotate(${rotation}deg)`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateWheel);
        } else {
          // Show result after animation
          setTimeout(() => {
            showResult();
            setIsSpinning(false);
          }, 500);
        }
      };
      
      animateWheel();
      
      // In a real implementation, you would call the smart contract here
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // const tx = await contract.spinWheel({ value: ethers.parseEther('0.01') });
      // await tx.wait();
      
    } catch (err) {
      console.error('Error spinning wheel:', err);
      setError('Failed to spin wheel. Please try again.');
      setIsSpinning(false);
    }
  };

  const showResult = () => {
    // Simulate random result (in real app, this comes from smart contract)
    const random = Math.random();
    let result;
    
    if (random < 0.01) result = prizes[0]; // 1% - First prize
    else if (random < 0.11) result = prizes[1]; // 10% - Second prize
    else if (random < 0.31) result = prizes[2]; // 20% - Third prize
    else result = prizes[3]; // 69% - No prize
    
    setSpinResult(result);
    
    if (result.id > 0) {
      setSuccess(`Congratulations! You won ${result.amount}!`);
    }
    
    // Reset wheel position
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
  };

  const resetWheel = () => {
    setSpinResult(null);
    setError(null);
    setSuccess(null);
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lucky Wheel</h1>
        <p className="text-lg text-gray-600">Spin the wheel and win prizes on Ethereum Sepolia testnet!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Wheel Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Wheel */}
            <div 
              ref={wheelRef}
              className="w-80 h-80 rounded-full border-8 border-gray-200 relative transition-transform duration-3000 ease-out"
              style={{ transition: 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              {prizes.map((prize, index) => {
                const angle = (index * 90) + 45; // 4 sections, 90 degrees each
                return (
                  <div
                    key={prize.id}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: 'center'
                    }}
                  >
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${prize.color} flex items-center justify-center text-white font-bold text-sm text-center transform -rotate-${angle}`}>
                      <div>
                        <div className="font-bold">{prize.name}</div>
                        <div className="text-xs">{prize.amount}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-bold">LW</span>
                </div>
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-500"></div>
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={spinWheel}
            disabled={isSpinning || !account || !isSepolia}
            className="mt-8 btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Spinning...</span>
              </div>
            ) : (
              'Spin the Wheel (0.01 ETH)'
            )}
          </button>

          {/* Reset Button */}
          {spinResult && (
            <button
              onClick={resetWheel}
              className="mt-4 btn-secondary flex items-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>Spin Again</span>
            </button>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          {/* Prize Information */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Prize Information
            </h3>
            <div className="space-y-3">
              {prizes.map((prize) => (
                <div key={prize.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium">{prize.name}</span>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{prize.amount}</div>
                    <div className="text-sm text-gray-500">{prize.probability}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Balances */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Balances</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Your Balance:</span>
                <span className="font-semibold">{parseFloat(userBalance).toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Contract Balance:</span>
                <span className="font-semibold">{parseFloat(contractBalance).toFixed(4)} ETH</span>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {spinResult && (
            <div className={`card ${spinResult.id > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className="text-xl font-semibold mb-4">Spin Result</h3>
              <div className="text-center">
                <div className={`text-2xl font-bold ${spinResult.id > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                  {spinResult.name}
                </div>
                <div className="text-lg mt-2">{spinResult.amount}</div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle size={20} />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center space-x-2 text-green-800">
                <Trophy size={20} />
                <span className="font-medium">{success}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LuckyWheel;
