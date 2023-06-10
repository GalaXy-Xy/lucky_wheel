import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Trophy, Medal, TrendingUp, Users } from 'lucide-react';

const Leaderboard = () => {
  const { account, signer } = useWallet();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  // Mock data for development - in production this would come from smart contract
  const mockLeaderboard = [
    { address: '0x1234...5678', totalWinnings: '0.25', spins: 15, rank: 1 },
    { address: '0x8765...4321', totalWinnings: '0.18', spins: 12, rank: 2 },
    { address: '0x9876...5432', totalWinnings: '0.15', spins: 10, rank: 3 },
    { address: '0x5432...9876', totalWinnings: '0.12', spins: 8, rank: 4 },
    { address: '0x3456...7890', totalWinnings: '0.10', spins: 7, rank: 5 },
    { address: '0x7890...3456', totalWinnings: '0.08', spins: 6, rank: 6 },
    { address: '0x2345...6789', totalWinnings: '0.06', spins: 5, rank: 7 },
    { address: '0x6789...2345', totalWinnings: '0.05', spins: 4, rank: 8 },
    { address: '0x4567...8901', totalWinnings: '0.03', spins: 3, rank: 9 },
    { address: '0x8901...4567', totalWinnings: '0.02', spins: 2, rank: 10 }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
      
      // Find user rank if connected
      if (account) {
        const userEntry = mockLeaderboard.find(entry => 
          entry.address.toLowerCase() === account.toLowerCase()
        );
        if (userEntry) {
          setUserRank(userEntry.rank);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [account]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300';
    return 'bg-white border-gray-200';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-lg text-gray-600">Top players by total winnings</p>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-lg text-gray-600">Top players by total winnings</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{leaderboard.length}</div>
          <div className="text-sm text-gray-600">Total Players</div>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">0.94 ETH</div>
          <div className="text-sm text-gray-600">Total Distributed</div>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">0.25 ETH</div>
          <div className="text-sm text-gray-600">Highest Win</div>
        </div>
      </div>

      {/* User Rank Display */}
      {userRank && (
        <div className="card bg-blue-50 border-blue-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Your Ranking</h3>
                <p className="text-sm text-blue-700">You are currently #{userRank} on the leaderboard!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">#{userRank}</div>
              <div className="text-sm text-blue-600">Rank</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Player</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Winnings</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Spins</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg. Win</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr 
                  key={player.rank} 
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    player.address.toLowerCase() === account?.toLowerCase() ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(player.rank)}
                      <span className="font-semibold text-gray-900">{player.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {player.address.slice(2, 4).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-mono text-sm text-gray-700">{player.address}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-semibold text-green-600">{player.totalWinnings} ETH</span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-600">{player.spins}</td>
                  <td className="py-4 px-4 text-right text-gray-600">
                    {(parseFloat(player.totalWinnings) / player.spins).toFixed(3)} ETH
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 card bg-gray-50 border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mt-1">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How the Leaderboard Works</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Rankings are based on total ETH winnings from all spins</li>
              <li>• Players with the same winnings are ranked by number of spins</li>
              <li>• Leaderboard updates automatically after each spin</li>
              <li>• Only successful spins with prizes count towards ranking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
