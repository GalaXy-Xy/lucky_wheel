import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Clock, Trophy, X, Filter, Download } from 'lucide-react';

const History = () => {
  const { account, signer } = useWallet();
  const [userHistory, setUserHistory] = useState([]);
  const [globalHistory, setGlobalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('user');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for development
  const mockUserHistory = [
    { id: 1, timestamp: '2023-06-15 14:30:00', result: 'First Prize', reward: '0.05 ETH', status: 'claimed', txHash: '0x1234...5678' },
    { id: 2, timestamp: '2023-06-14 16:45:00', result: 'No Prize', reward: '0 ETH', status: 'completed', txHash: '0x8765...4321' },
    { id: 3, timestamp: '2023-06-13 09:20:00', result: 'Second Prize', reward: '0.02 ETH', status: 'claimed', txHash: '0x9876...5432' },
    { id: 4, timestamp: '2023-06-12 11:15:00', result: 'Third Prize', reward: '0.01 ETH', status: 'claimed', txHash: '0x5432...9876' },
    { id: 5, timestamp: '2023-06-11 13:40:00', result: 'No Prize', reward: '0 ETH', status: 'completed', txHash: '0x3456...7890' }
  ];

  const mockGlobalHistory = [
    { id: 1, player: '0x1234...5678', timestamp: '2023-06-15 14:30:00', result: 'First Prize', reward: '0.05 ETH', txHash: '0x1234...5678' },
    { id: 2, player: '0x8765...4321', timestamp: '2023-06-15 13:20:00', result: 'Second Prize', reward: '0.02 ETH', txHash: '0x8765...4321' },
    { id: 3, player: '0x9876...5432', timestamp: '2023-06-15 12:10:00', result: 'No Prize', reward: '0 ETH', txHash: '0x9876...5432' },
    { id: 4, player: '0x5432...9876', timestamp: '2023-06-15 11:00:00', result: 'Third Prize', reward: '0.01 ETH', txHash: '0x5432...9876' },
    { id: 5, player: '0x3456...7890', timestamp: '2023-06-15 10:50:00', result: 'No Prize', reward: '0 ETH', txHash: '0x3456...7890' },
    { id: 6, player: '0x7890...3456', timestamp: '2023-06-15 10:30:00', result: 'Second Prize', reward: '0.02 ETH', txHash: '0x7890...3456' },
    { id: 7, player: '0x2345...6789', timestamp: '2023-06-15 10:10:00', result: 'No Prize', reward: '0 ETH', txHash: '0x2345...6789' },
    { id: 8, player: '0x6789...2345', timestamp: '2023-06-15 09:50:00', result: 'Third Prize', reward: '0.01 ETH', txHash: '0x6789...2345' },
    { id: 9, player: '0x4567...8901', timestamp: '2023-06-15 09:30:00', result: 'No Prize', reward: '0 ETH', txHash: '0x4567...8901' },
    { id: 10, player: '0x8901...4567', timestamp: '2023-06-15 09:10:00', result: 'First Prize', reward: '0.05 ETH', txHash: '0x8901...4567' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUserHistory(mockUserHistory);
      setGlobalHistory(mockGlobalHistory);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getResultIcon = (result) => {
    if (result === 'First Prize') return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (result === 'Second Prize') return <Trophy className="w-5 h-5 text-gray-400" />;
    if (result === 'Third Prize') return <Trophy className="w-5 h-5 text-amber-600" />;
    return <X className="w-5 h-5 text-gray-400" />;
  };

  const getResultColor = (result) => {
    if (result === 'First Prize') return 'text-yellow-600 bg-yellow-50';
    if (result === 'Second Prize') return 'text-gray-600 bg-gray-50';
    if (result === 'Third Prize') return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getStatusColor = (status) => {
    if (status === 'claimed') return 'text-green-600 bg-green-50';
    if (status === 'pending') return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const filteredUserHistory = userHistory.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'wins') return item.reward !== '0 ETH';
    if (filter === 'losses') return item.reward === '0 ETH';
    return true;
  });

  const filteredGlobalHistory = globalHistory.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'wins') return item.reward !== '0 ETH';
    if (filter === 'losses') return item.reward === '0 ETH';
    return true;
  });

  const paginatedGlobalHistory = filteredGlobalHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredGlobalHistory.length / itemsPerPage);

  const exportHistory = () => {
    const data = activeTab === 'user' ? filteredUserHistory : filteredGlobalHistory;
    const csvContent = [
      ['ID', 'Player', 'Timestamp', 'Result', 'Reward', 'Status', 'Transaction Hash'],
      ...data.map(item => [
        item.id,
        item.player || 'You',
        item.timestamp,
        item.result,
        item.reward,
        item.status || 'completed',
        item.txHash
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lucky-wheel-history-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Spin History</h1>
          <p className="text-lg text-gray-600">Track your spins and global activity</p>
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
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Spin History</h1>
        <p className="text-lg text-gray-600">Track your spins and global activity</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('user')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'user'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Your History
        </button>
        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'global'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Global History
        </button>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Results</option>
            <option value="wins">Wins Only</option>
            <option value="losses">Losses Only</option>
          </select>
        </div>
        
        <button
          onClick={exportHistory}
          className="btn-secondary flex items-center space-x-2"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* History Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Result</th>
                {activeTab === 'global' && (
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Player</th>
                )}
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Reward</th>
                {activeTab === 'user' && (
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                )}
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'user' ? filteredUserHistory : paginatedGlobalHistory).map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {getResultIcon(item.result)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(item.result)}`}>
                        {item.result}
                      </span>
                    </div>
                  </td>
                  
                  {activeTab === 'global' && (
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-700">{item.player}</span>
                    </td>
                  )}
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{item.timestamp}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-right">
                    <span className={`font-semibold ${item.reward === '0 ETH' ? 'text-gray-500' : 'text-green-600'}`}>
                      {item.reward}
                    </span>
                  </td>
                  
                  {activeTab === 'user' && (
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  
                  <td className="py-4 px-4">
                    <a
                      href={`https://sepolia.etherscan.io/tx/${item.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {item.txHash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination for Global History */}
        {activeTab === 'global' && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredGlobalHistory.length)} of {filteredGlobalHistory.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {activeTab === 'user' ? filteredUserHistory.length : filteredGlobalHistory.length}
          </div>
          <div className="text-sm text-gray-600">Total Spins</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {(activeTab === 'user' ? filteredUserHistory : filteredGlobalHistory)
              .filter(item => item.reward !== '0 ETH')
              .length}
          </div>
          <div className="text-sm text-gray-600">Wins</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {(activeTab === 'user' ? filteredUserHistory : filteredGlobalHistory)
              .reduce((sum, item) => sum + parseFloat(item.reward), 0)
              .toFixed(3)}
          </div>
          <div className="text-sm text-gray-600">Total ETH Won</div>
        </div>
      </div>
    </div>
  );
};

export default History;
