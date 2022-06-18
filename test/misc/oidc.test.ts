import { generateDPoPKeyPair, generateDPoPProof } from '../../src/misc/oidc';

const v4 = jest.fn();

jest.mock("uuid", () => ({
  v4: () => v4(),
}));

const exportJWK = jest.fn();
exportJWK.mockResolvedValue({});

const generateKeyPair = jest.fn();
generateKeyPair.mockResolvedValue({ privateKey: {}, publicKey: {}, });

const SignJWT = {
  setProtectedHeader: jest.fn(),
  setIssuedAt: jest.fn(),
  setJti: jest.fn(),
  sign: jest.fn(),
}
SignJWT.setProtectedHeader.mockReturnValue(SignJWT);
SignJWT.setIssuedAt.mockReturnValue(SignJWT);
SignJWT.setJti.mockReturnValue(SignJWT);
SignJWT.sign.mockResolvedValue('proof');

jest.mock("jose", () => ({
  exportJWK: async () => exportJWK(),
  generateKeyPair: async () => generateKeyPair(),
  importJWK: jest.fn(),
  JWK: jest.fn(),
  jwtVerify: jest.fn(),
  KeyLike: jest.fn(),
  SignJWT: jest.fn().mockImplementation(() => { return SignJWT })
}));

describe('config', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { NODE_ENV: 'test' };
  });

  afterEach(() => {
    process.env = env
  });

  it('can generate a DPoP key pair with public key algorithm "ES256"', async () => {
    const keyPair = await generateDPoPKeyPair();
    expect(keyPair.privateKey).toBeDefined();
    expect(keyPair.publicKey).toBeDefined();
    expect(keyPair.publicKey.alg).toBe('ES256');
  });

  it('can generate a DPoP proof', async () => {
    const keyPair = await generateDPoPKeyPair();
    v4.mockReturnValue('uuid');
    const proof = await generateDPoPProof(keyPair, 'GET', 'http://example.com');
    expect(SignJWT.setProtectedHeader).toHaveBeenCalledWith({ alg: 'ES256', jwk: {alg: 'ES256'}, typ: 'dpop+jwt' });
    expect(SignJWT.setIssuedAt).toHaveBeenCalledWith();
    expect(SignJWT.setJti).toHaveBeenCalledWith('uuid');
    expect(SignJWT.sign).toHaveBeenCalledWith({});
    expect(proof).toBe('proof');
  });
});
