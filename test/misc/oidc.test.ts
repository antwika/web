import { authFetch, base64urlencode, generateAuthUrl, generateCodeChallengeFromVerifier, generateCodeVerifier, generateDPoPKeyPair, generateDPoPProof, generateRedirectUri, requestOidcConfiguration, requestToken, sha256, verifyToken } from '../../src/misc/oidc';

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

const jwtVerifyMock = jest.fn();

jest.mock("jose", () => ({
  exportJWK: async () => exportJWK(),
  generateKeyPair: async () => generateKeyPair(),
  importJWK: jest.fn(),
  JWK: jest.fn(),
  jwtVerify: async () => jwtVerifyMock(),
  KeyLike: jest.fn(),
  SignJWT: jest.fn().mockImplementation(() => { return SignJWT })
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

const getCryptoMock = jest.fn();
jest.mock('../../src/misc/crypto', () => ({
  getCrypto: () => getCryptoMock(),
}))

const getRandomValuesMock = jest.fn();
const digestMock = jest.fn();
getCryptoMock.mockImplementation(() => ({
  getRandomValues: (arr: any[]) => getRandomValuesMock(arr),
  subtle: {
    digest: (algorithm: AlgorithmIdentifier, data: BufferSource) => digestMock(algorithm, data),
  }
}));
getRandomValuesMock.mockImplementation((arr: any[]) => {
  const fakeRandomValue = "12345678123456781234567812345678123456781234567812345678"
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = fakeRandomValue[i];
  }
});
digestMock.mockImplementation(() => new Uint16Array([1,2,3]));

describe('oidc', () => {
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

  it('can perform an authenticated fetch', async () => {
    const keyPair = await generateDPoPKeyPair();
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue('mock-result');
    const result = await authFetch(fetchMock, keyPair, 'http://example.com', 'GET');
    expect(fetchMock).toHaveBeenCalledWith('http://example.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'DPoP': 'proof',
      },
      body: undefined,
    });
    expect(result).toBe('mock-result');
  });

  it('can request the configuration from an oidc provider', async () => {
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue({ json: () => ({ mock: 'result' }) });
    const result = await requestOidcConfiguration(fetchMock, 'http://idp.example.com');
    expect(result).toStrictEqual({ mock: 'result' });
  });

  it('can create a code challenge from a verifier', async () => {
    const verifier = generateCodeVerifier();
    expect(verifier).toBe('01020304050607080102030405060708010203040506070801020304');
    const challenge = await generateCodeChallengeFromVerifier('foo');
    expect(challenge).toBe('AQID');
  });

  it('can make an authenticated fetch', async () => {
    const keyPair = await generateDPoPKeyPair();
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue('result');
    const result = await authFetch(fetchMock, keyPair, 'http://example.com', 'GET');
    expect(result).toStrictEqual('result');
  });

  it('can generate a redirect uri', async () => {
    const redirectUri = generateRedirectUri('http://example.com', 'en-US');
    expect(redirectUri).toBe('http://example.com/en-US/oidc/cb');
  });

  it('can generate an auth url', async () => {
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue({ json: async () => 'result'});
    const redirectUri = await generateAuthUrl(fetchMock, 'http://example.com', 'http://idp.example.com', 'en-US', 'test-client-id');
    expect(redirectUri).toBe('http://idp.example.com/undefined?audience=web&client_id=test-client-id&response_type=code&scope=openid&code_challenge=AQID&code_challenge_method=S256&redirect_uri=http%3A%2F%2Fexample.com%2Fen-US%2Foidc%2Fcb');
  });

  it('throws an error when trying to generate auth url if clientId is undefined', async () => {
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue({ json: async () => 'result'});
    await expect(generateAuthUrl(fetchMock, 'http://example.com', 'http://idp.example.com', 'en-US', undefined)).rejects.toThrowError('Can not generate auth url because client id is not defined');
  });

  it('can request a token', async () => {
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue({ json: async () => 'an.example.token'});
    const result = await requestToken(fetchMock, 'http://idp.example.com', 'code', 'verifier', 'en-US', 'test-client-id', 'test-client-secret');
    expect(result).toBe('an.example.token');
  });

  it('returns false when trying to request a token if clientId is undefined', async () => {
    const fetchMock = jest.fn();
    const token = await requestToken(fetchMock, 'http://idp.example.com', 'code', 'verifier', 'en-US', undefined, 'test-client-secret');
    expect(token).toBeFalsy();
  });

  it('returns false when trying to request a token if clientSecret is undefined', async () => {
    const fetchMock = jest.fn();
    const token = await requestToken(fetchMock, 'http://idp.example.com', 'code', 'verifier', 'en-US', 'test-client-id', undefined);
    expect(token).toBeFalsy();
  });

  it('can verify a token', async () => {
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue({ json: async () => ({
      keys: ['key'],
    })});
    const result = await verifyToken(fetchMock, 'http://idp.example.com', 'an.example.token');
    expect(result).toBeTruthy();
  });

  it('returns false when token verification failed', async () => {
    const fetchMock = jest.fn();
    fetchMock.mockResolvedValue({ json: async () => ({
      keys: ['key'],
    })});
    jwtVerifyMock.mockImplementationOnce(async () => { throw new Error('Fatal error'); });
    const result = await verifyToken(fetchMock, 'http://idp.example.com', 'an.example.token');
    expect(result).toBeFalsy();
  });

  it('returns false when trying to verify a token if clientId is undefined', async () => {
    const fetchMock = jest.fn();
    const token = await verifyToken(fetchMock, 'http://idp.example.com', 'an.example.token');
    expect(token).toBeFalsy();
  });

  it('returns false when trying to verify a token if clientId is undefined', async () => {
    const fetchMock = jest.fn();
    const token = await verifyToken(fetchMock, 'http://idp.example.com', 'an.example.token');
    expect(token).toBeFalsy();
  });
});
