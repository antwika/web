import crypto from 'crypto';

export const getCrypto = () => window !== undefined && window.crypto !== undefined ? window.crypto : crypto;
