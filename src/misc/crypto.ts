import crypto from 'crypto';

const anyCrypto = crypto as any;

export const getCrypto = () => window !== undefined && window.crypto !== undefined ? window.crypto : anyCrypto;
