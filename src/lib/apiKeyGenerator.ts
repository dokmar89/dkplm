import { randomBytes } from 'crypto';

export const generateApiKey = (): string => {
  // Generate a random 32-byte buffer and convert it to a hex string
  const buffer = randomBytes(32);
  return buffer.toString('hex');
};
