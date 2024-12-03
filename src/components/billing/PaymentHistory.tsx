import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';

interface Payment {
  id: string;
  date: string;
  amount: number;
  type: 'deposit' | 'charge';
  description: string;
  invoiceId?: string;
}

const payments: Payment[] = [
  {
    id: 'TRX-001',
    date: '2024-03-15',
    amount: 5000,
    type: 'deposit',
    description: 'Wallet top-up',
    invoiceId: 'INV-2024-001',
  },
  {
    id: 'TRX-002',
    date: '2024-03-14',
    amount: -150,
    type: 'charge',
    description: 'BankID Verifications (10)',
    invoiceId: 'INV-2024-002',
  },
  // Add more payment history items
];

export const PaymentHistory = () => {
  const handleDownloadInvoice = (invoiceId: string) => {
    // Generate and download invoice logic
    console.log(`Downloading invoice ${invoiceId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Transaction ID</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="p-4">{payment.date}</td>
                <td className="p-4">{payment.id}</td>
                <td className="p-4">{payment.description}</td>
                <td className={`p-4 ${
                  payment.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {payment.type === 'deposit' ? '+' : '-'}
                  {formatCurrency(Math.abs(payment.amount))}
                </td>
                <td className="p-4">
                  {payment.invoiceId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(payment.invoiceId!)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};