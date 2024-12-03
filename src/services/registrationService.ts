import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { RegistrationFormData, RegistrationRequest } from '../types/registration';

export const submitRegistrationRequest = async (formData: RegistrationFormData) => {
  try {
    const registrationData: Omit<RegistrationRequest, 'submittedAt'> = {
      ...formData,
      status: 'pending'
    };

    const docRef = await addDoc(collection(db, 'registrationRequests'), {
      ...registrationData,
      submittedAt: serverTimestamp()
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw new Error('Failed to submit registration request');
  }
};