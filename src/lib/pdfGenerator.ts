import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from './utils';

interface InvoiceData {
  invoiceNumber: string;
  companyName: string;
  companyId: string;
  dic: string;
  amount: number;
  createdAt: Date;
  variableSymbol: string;
}

export const generateInvoicePDF = async (invoice: InvoiceData): Promise<string> => {
  const doc = new jsPDF();
  
  // Add company logo
  // doc.addImage('path_to_logo', 'PNG', 15, 15, 50, 50);
  
  // Add invoice title
  doc.setFontSize(20);
  doc.text('INVOICE', 105, 30, { align: 'center' });
  
  // Add invoice details
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 15, 50);
  doc.text(`Date: ${invoice.createdAt.toLocaleDateString()}`, 15, 60);
  
  // Add company details
  doc.text('Billed To:', 15, 80);
  doc.text(invoice.companyName, 15, 90);
  doc.text(`IČO: ${invoice.companyId}`, 15, 100);
  doc.text(`DIČ: ${invoice.dic}`, 15, 110);
  
  // Add payment details
  doc.text('Payment Details:', 15, 130);
  doc.text(`Bank Account: 123456789/0100`, 15, 140);
  doc.text(`Variable Symbol: ${invoice.variableSymbol}`, 15, 150);
  doc.text(`Amount: ${formatCurrency(invoice.amount)}`, 15, 160);
  
  // Add table with item details
  (doc as any).autoTable({
    startY: 180,
    head: [['Description', 'Amount']],
    body: [
      ['Wallet Credit', formatCurrency(invoice.amount)],
      ['VAT (0%)', formatCurrency(0)],
      ['Total', formatCurrency(invoice.amount)]
    ],
  });
  
  // Add footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.text('Thank you for your business!', 105, pageHeight - 20, { align: 'center' });
  
  // For development, we'll return a data URL
  // In production, you would save this to a storage service and return the URL
  return doc.output('dataurlstring');
};
