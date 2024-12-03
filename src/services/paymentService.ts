import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  serverTimestamp, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  enableNetwork,
  disableNetwork,
  setDoc
} from 'firebase/firestore';
import { generateInvoicePDF } from '../lib/pdfGenerator';

interface PaymentDetails {
  amount: number;
  companyId: string;
  companyName: string;
  dic: string;
  variableSymbol: string;
  contactName?: string;
}

export const paymentService = {
  async checkConnection() {
    try {
      await enableNetwork(db);
      return true;
    } catch (error) {
      console.error('Failed to enable network:', error);
      return false;
    }
  },

  async getRegistrationData(userId: string) {
    try {
      const registrationRef = collection(db, 'registrationRequests');
      const q = query(registrationRef, where('contactPerson.userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      console.error('Error getting registration data:', error);
      return null;
    }
  },

  async ensureCompanyExists(userId: string) {
    try {
      // First check if company exists with userId as document ID
      const companyRef = doc(db, 'companies', userId);
      const companySnap = await getDoc(companyRef);

      if (companySnap.exists()) {
        return {
          id: companySnap.id,
          ...companySnap.data()
        };
      }

      // If not found by ID, try to find by userId field
      const companiesRef = collection(db, 'companies');
      const q = query(companiesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const companyDoc = querySnapshot.docs[0];
        return {
          id: companyDoc.id,
          ...companyDoc.data()
        };
      }

      // Get registration data to create company
      const registrationData = await this.getRegistrationData(userId);
      
      // If no company exists, create one with registration data if available
      const newCompany = {
        userId,
        companyName: registrationData?.companyName || 'Default Company',
        dic: registrationData?.dic || '',
        contactName: registrationData?.contactPerson ? 
          `${registrationData.contactPerson.firstName} ${registrationData.contactPerson.lastName}` : 
          '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Create company document with userId as the document ID
      await setDoc(companyRef, newCompany);

      return {
        id: userId,
        ...newCompany
      };
    } catch (error) {
      console.error('Error ensuring company exists:', error);
      throw error;
    }
  },

  async generatePaymentDetails(amount: number, userId: string): Promise<PaymentDetails> {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      // Check connection and try to enable network
      const isOnline = await this.checkConnection();
      if (!isOnline) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }

      // Ensure company exists and get company data
      const company = await this.ensureCompanyExists(userId);

      // Generate a unique variable symbol
      const variableSymbol = Date.now().toString().slice(-9);

      return {
        amount,
        companyId: company.id,
        companyName: company.companyName || 'Unknown Company',
        dic: company.dic || '',
        contactName: company.contactName || '',
        variableSymbol,
      };
    } catch (error) {
      console.error('Error generating payment details:', error);
      throw error;
    }
  },

  async createPaymentRecord(paymentDetails: PaymentDetails) {
    try {
      // Check connection before creating payment record
      const isOnline = await this.checkConnection();
      if (!isOnline) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }

      // Create payment record
      const payment = {
        ...paymentDetails,
        status: 'pending',
        createdAt: serverTimestamp(),
        type: 'credit',
      };

      const paymentsRef = collection(db, 'payments');
      const paymentDoc = await addDoc(paymentsRef, payment);

      // Generate invoice
      const invoice = {
        paymentId: paymentDoc.id,
        ...payment,
        invoiceNumber: `INV-${new Date().getFullYear()}-${paymentDoc.id.slice(-6)}`,
        createdAt: new Date(),
      };

      // Store invoice record
      const invoicesRef = collection(db, 'invoices');
      await addDoc(invoicesRef, invoice);

      // Generate PDF invoice
      const pdfUrl = await generateInvoicePDF(invoice);

      // Update payment record with invoice info
      await updateDoc(doc(db, 'payments', paymentDoc.id), {
        invoiceUrl: pdfUrl,
        invoiceNumber: invoice.invoiceNumber,
      });

      return {
        ...payment,
        id: paymentDoc.id,
        invoiceUrl: pdfUrl,
        invoiceNumber: invoice.invoiceNumber,
      };
    } catch (error) {
      console.error('Error creating payment record:', error);
      throw error;
    }
  },

  getBankDetails() {
    return {
      accountNumber: '123456789/0100',
      bankName: 'Komerční banka',
      iban: 'CZ6501000000000123456789',
      swift: 'KOMBCZPP',
    };
  },

  generateQRPayment(paymentDetails: PaymentDetails) {
    const bankDetails = this.getBankDetails();
    return `SPD*1.0*ACC:${bankDetails.iban}*AM:${paymentDetails.amount}*CC:CZK*X-VS:${paymentDetails.variableSymbol}`;
  }
};
