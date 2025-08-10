import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../../lib/api';

interface WalletData {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  transactionCount: number;
}

interface Props {
  showDetails?: boolean;
  className?: string;
}

const WalletBalance: React.FC<Props> = ({ showDetails = false, className = '' }) => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getWallet();
      // The API client returns the wallet data directly
      if (response) {
        setWallet({
          balance: response.balance,
          totalEarned: response.totalEarned,
          totalSpent: response.totalSpent,
          transactionCount: 0 // Will be populated if available
        });
      }
    } catch (err: any) {
      console.error('Error loading wallet:', err);
      setError('Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-none p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-none w-20 mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-none w-32"></div>
        </div>
      </div>
    );
  }

  if (error || !wallet) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 rounded-none p-4 ${className}`}>
        <p className="text-red-600 dark:text-red-400 text-sm">{error || 'Wallet not found'}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-none p-4 ${className}`}
    >
      {/* Balance Header */}
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-none flex items-center justify-center">
          <span className="text-white text-sm font-bold">PC</span>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Polar Coins Balance
          </p>
          <motion.p 
            key={wallet.balance}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {formatNumber(wallet.balance)} PC
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="border-t border-blue-200 dark:border-blue-700 pt-3 mt-3"
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Earned</p>
              <p className="font-semibold text-green-600 dark:text-green-400">
                +{formatNumber(wallet.totalEarned)} PC
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Spent</p>
              <p className="font-semibold text-red-600 dark:text-red-400">
                -{formatNumber(wallet.totalSpent)} PC
              </p>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              <span>{wallet.transactionCount} transactions</span>
              <button 
                onClick={loadWalletData}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WalletBalance; 