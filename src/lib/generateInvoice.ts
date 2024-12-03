import { formatCurrency } from './utils';

interface InvoiceData {
  invoiceId: string;
  date: string;
  amount: number;
  description: string;
  company: {
    name: string;
    ico: string;
    address: string;
  };
}

export const generateInvoice = (data: InvoiceData): string => {
  const vatRate = 0.21; // 21% VAT
  const vatAmount = data.amount * vatRate;
  const totalAmount = data.amount + vatAmount;

  // Generate invoice HTML template
  const invoiceHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .invoice-header { margin-bottom: 40px; }
          .invoice-details { margin-bottom: 30px; }
          .invoice-table { width: 100%; border-collapse: collapse; }
          .invoice-table th, .invoice-table td { padding: 10px; border: 1px solid #ddd; }
          .amount-row { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <h1>Invoice ${data.invoiceId}</h1>
          <p>Date: ${data.date}</p>
        </div>
        
        <div class="invoice-details">
          <div>
            <h3>Billed to:</h3>
            <p>${data.company.name}</p>
            <p>IČO: ${data.company.ico}</p>
            <p>${data.company.address}</p>
          </div>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.description}</td>
              <td>${formatCurrency(data.amount)}</td>
            </tr>
            <tr>
              <td>VAT (21%)</td>
              <td>${formatCurrency(vatAmount)}</td>
            </tr>
            <tr class="amount-row">
              <td>Total Amount</td>
              <td>${formatCurrency(totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  return invoiceHtml;
};