import trpc, { appRouter, createContext } from '../../../src/pages/api/trpc/[trpc]';

const requestTokenMock = jest.fn();
const verifyTokenMock = jest.fn();
jest.mock('../../../src/misc/oidc', () => ({
  requestToken: (...args: any) => requestTokenMock(...args),
  verifyToken: (...args: any) => verifyTokenMock(...args),
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

describe('[trpc]', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { NODE_ENV: 'test' };
  });

  afterEach(() => {
    process.env = env
  });

  it('exports default', () => {
    expect(trpc).toBeDefined();
  });

  it('exports a context function', () => {
    expect(createContext()).toBe(null);
  });

  it('can handle requestToken requests', async () => {
    requestTokenMock.mockResolvedValue({ access_token: 'an.example.token'});
    process.env.NEXT_PUBLIC_CLIENT_ID = 'test-client-id';
    process.env.REACT_APP_CLIENT_SECRET = 'test-client-secret';
    expect(appRouter).toBeDefined();
    const res = await appRouter.createCaller({}).query('requestToken', { locale: 'en-US', code: 'code', codeVerifier: 'codeVerifier' })
    expect(res).toStrictEqual({ token: 'an.example.token' });
  });

  it('can handle verifyToken requests', async () => {
    verifyTokenMock.mockResolvedValue(true);
    expect(appRouter).toBeDefined();
    const res = await appRouter.createCaller({}).query('verifyToken', { accessToken: 'an.example.token'})
    expect(res).toStrictEqual({ valid: true });
  });
});
