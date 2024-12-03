import React, { useState } from 'react';
import { Wallet, Plus, QrCode } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';

const predefinedAmounts = [500, 1000, 5000];

export const WalletBalance = () => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const balance = 2500;

  const handleAddFunds = () => {
    const amount = selectedAmount || Number(customAmount);
    // Handle payment logic here
    setShowAddFunds(false);
    setSelectedAmount(null);
    setCustomAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium">Wallet Balance</h2>
          <div className="flex items-baseline space-x-2 mt-2">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{formatCurrency(balance)}</span>
          </div>
        </div>
        <Button onClick={() => setShowAddFunds(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </div>

      {showAddFunds && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add Funds</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 border rounded-lg text-center ${
                    selectedAmount === amount
                      ? 'border-primary text-primary'
                      : 'hover:border-gray-300'
                  }`}
                >
                  {formatCurrency(amount)}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Custom Amount</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full p-2 border rounded-md"
                placeholder="Enter amount in CZK"
              />
            </div>
            {(selectedAmount || customAmount) && (
              <div className="border rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Bank Account:</span>
                    <span className="font-medium">123456789/0100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Variable Symbol:</span>
                    <span className="font-medium">987654321</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedAmount || Number(customAmount))}
                    </span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <QrCode className="h-32 w-32" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddFunds(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddFunds}
                disabled={!selectedAmount && !customAmount}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};