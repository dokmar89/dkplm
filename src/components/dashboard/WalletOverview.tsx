import React, { useState } from 'react';
import { Wallet, Plus, X, QrCode, Download } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { paymentService } from '../../services/paymentService';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

const predefinedAmounts = [500, 1000, 5000];

interface WalletOverviewProps {
  balance: number;
  transactions?: {
    id: string;
    amount: number;
    date: string;
    type: 'credit' | 'debit';
    invoiceUrl?: string;
    invoiceNumber?: string;
  }[];
}

export const WalletOverview = ({ balance, transactions = [] }) => {
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const handleGeneratePayment = async () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount <= 0) return;

    if (!user?.uid) {
      console.error('No user ID found');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Generating payment details for amount:', amount, 'userId:', user.uid);
      const details = await paymentService.generatePaymentDetails(amount, user.uid);
      console.log('Generated payment details:', details);
      const payment = await paymentService.createPaymentRecord(details);
      console.log('Created payment record:', payment);
      setPaymentDetails(payment);
    } catch (error) {
      console.error('Error generating payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowChargeModal(false);
    setSelectedAmount(null);
    setCustomAmount('');
    setPaymentDetails(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium">Wallet Overview</h2>
              <div className="flex items-baseline space-x-2 mt-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{formatCurrency(balance)}</span>
              </div>
            </div>
            <Button onClick={() => setShowChargeModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Credit
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <Plus className={`h-4 w-4 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <Wallet className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.type === 'credit' ? 'Credit Added' : 'Verification Fee'}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    {transaction.invoiceUrl && (
                      <a
                        href={transaction.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showChargeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Credit</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount(amount.toString());
                    setPaymentDetails(null);
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
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(Number(e.target.value));
                    setPaymentDetails(null);
                  }}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter amount in CZK"
                  min="0"
                  step="100"
                />
                <span className="absolute right-3 top-2 text-gray-500">Kč</span>
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-4">
                <p>Generating payment details...</p>
              </div>
            )}

            {!isLoading && paymentDetails && (
              <div className="border rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Bank Account:</span>
                    <span className="font-medium">{paymentService.getBankDetails().accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IBAN:</span>
                    <span className="font-medium">{paymentService.getBankDetails().iban}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Variable Symbol:</span>
                    <span className="font-medium">{paymentDetails.variableSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(paymentDetails.amount)}
                    </span>
                  </div>
                  {paymentDetails.invoiceNumber && (
                    <div className="flex justify-between">
                      <span>Invoice Number:</span>
                      <span className="font-medium">{paymentDetails.invoiceNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-center mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <QrCode className="h-32 w-32" />
                      <p className="text-xs text-center mt-2 text-gray-500">
                        Scan to pay
                      </p>
                    </div>
                  </div>
                  {paymentDetails.invoiceUrl && (
                    <div className="flex justify-center mt-4">
                      <a
                        href={paymentDetails.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:text-primary/80"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isLoading && !paymentDetails && (selectedAmount || customAmount) && (
              <Button
                onClick={handleGeneratePayment}
                className="w-full mb-4"
                disabled={isLoading}
              >
                Generate Payment Details
              </Button>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
