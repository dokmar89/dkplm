import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { EshopFormData, EshopRegistration } from '../types/eshop';
import { generateApiKey } from '../lib/apiKeyGenerator';

export const eshopService = {
  async registerEshop(formData: EshopFormData, userId: string): Promise<EshopRegistration> {
    try {
      const apiKey = generateApiKey();
      
      const eshopData: EshopRegistration = {
        ...formData,
        userId,
        apiKey,
        createdAt: new Date(),
        status: 'pending'
      };

      const eshopsRef = collection(db, 'eshops');
      const docRef = await addDoc(eshopsRef, {
        ...eshopData,
        createdAt: serverTimestamp()
      });

      return {
        ...eshopData,
        id: docRef.id
      };
    } catch (error) {
      console.error('Error registering eshop:', error);
      throw error;
    }
  },

  async getEshops(userId: string) {
    try {
      const eshopsRef = collection(db, 'eshops');
      const querySnapshot = await getDocs(query(eshopsRef, where('userId', '==', userId)));
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting eshops:', error);
      throw error;
    }
  }
};
