import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { RegistrationFormData } from '../types/registration';

export const submitRegistrationRequest = async (formData: RegistrationFormData) => {
  try {
    const registrationData = {
      ...formData,
      status: 'pending',
      submittedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'registrationRequests'), registrationData);
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw new Error('Failed to submit registration request');
  }
};