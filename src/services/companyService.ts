import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Company, Eshop } from '../types/company';

export const getCompanyById = async (companyId: string): Promise<Company | null> => {
  try {
    const docRef = doc(db, 'companies', companyId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as Company;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw new Error('Failed to fetch company details');
  }
};

export const getCompanyEshops = async (companyId: string): Promise<Eshop[]> => {
  try {
    const q = query(
      collection(db, 'eshops'),
      where('companyId', '==', companyId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      eshopId: doc.id,
      ...doc.data()
    })) as Eshop[];
  } catch (error) {
    console.error('Error fetching eshops:', error);
    throw new Error('Failed to fetch company eshops');
  }
};