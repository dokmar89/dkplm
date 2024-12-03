import type { RegistrationRequest } from './registration';

export interface AdminState {
  isAdmin: boolean;
  permissions: string[];
}

export interface RegistrationRequestWithId extends RegistrationRequest {
  id: string;
}

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface StatusUpdateData {
  status: RequestStatus;
  note?: string;
}