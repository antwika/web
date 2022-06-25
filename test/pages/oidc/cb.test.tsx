import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../../../src/context/AuthContext';
import { generateCodeVerifier } from '../../../src/misc/oidc';
import Cb from '../../../src/pages/oidc/cb';
import { store } from '../../../src/redux/store';

const pushMock = jest.fn();
const replaceMock = jest.fn();
const useRouterMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => useRouterMock(),
}));
useRouterMock.mockImplementation(() => ({
  pathname: '/home',
  query: {},
  asPath: "/home/",
  push: (...args: any) => pushMock(...args),
  replace: (...args: any) => replaceMock(...args),
}));

const useIntlMock = jest.fn();
jest.mock("react-intl", () => ({
  useIntl: (...args: any) => useIntlMock(...args),
}));
useIntlMock.mockImplementation(() => ({ locale: 'sv-se', formatMessage: jest.fn() }));

const generateAuthUrlMock = jest.fn();
const generateCodeVerifierMock = jest.fn();
jest.mock('../../../src/misc/oidc', () => ({
  generateAuthUrl: () => generateAuthUrlMock(),
  generateCodeVerifier: () => generateCodeVerifierMock(),
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

const useQueryMock = jest.fn();
jest.mock('../../../src/utils/trpc', () => ({
  trpc: {
    useQuery: (...args: any) => useQueryMock(...args),
  },
}));

const getItemMock = jest.fn();

const parseUserMock = jest.fn();
jest.mock('../../../src/misc/auth', () => ({
  parseUser: () => parseUserMock(),
}));
parseUserMock.mockImplementation(() => ({
  id: 'FooBar',
  email: 'foo@bar.com',
  firstName: 'Foo',
  lastName: 'Bar',
}));

describe('cb', () => {
  let originalGetItem: any;

  beforeAll(() => {
    originalGetItem = global.Storage.prototype.getItem;
    global.Storage.prototype.getItem = () => getItemMock();
  });

  afterAll(() => {
    global.Storage.prototype.getItem = originalGetItem;
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('does not query api if codeVerifier is null since enabled is false', () => {
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    getItemMock.mockReturnValueOnce(null);
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
    expect(useQueryMock).toHaveBeenCalledWith(["requestToken", {"code": "", "codeVerifier": "", "locale": ""}], {"enabled": false});
  });

  it('does something', () => {
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    getItemMock.mockReturnValue(JSON.stringify(['0', '1', '0', '2', '0', '3']));
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
  });

  it('redirects user to /home if there is a valid access token', () => {
    useQueryMock.mockReturnValue({ isIdle: false, data: { token: 'an.example.token' }, isLoading: false });
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
    expect(replaceMock).toHaveBeenCalledWith('/home');
  });

  it('sets code if the router.query contains that param', () => {
    useRouterMock.mockImplementation(() => ({
      pathname: '/home',
      query: { code: 'test-code' },
      asPath: "/home/",
      push: (...args: any) => pushMock(...args),
    }));
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    getItemMock.mockReturnValueOnce(null);
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
    expect(useQueryMock).toHaveBeenCalledWith(["requestToken", {"code": "", "codeVerifier": "", "locale": ""}], {"enabled": false});
  });

  it('throws an error if code if the router.query is of type array', () => {
    useRouterMock.mockImplementation(() => ({
      pathname: '/home',
      query: { code: ['test-code'] },
      asPath: "/home/",
      push: (...args: any) => pushMock(...args),
    }));
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    getItemMock.mockReturnValueOnce(null);
    expect(() => render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    )).toThrowError('Unexpected array type in "code" query parameter');
  });

  it('does not do much if data is undefined', () => {
    useRouterMock.mockImplementation(() => ({
      pathname: '/home',
      query: { code: 'test-code' },
      asPath: "/home/",
      push: (...args: any) => pushMock(...args),
    }));
    useQueryMock.mockReturnValue({ isIdle: false, data: undefined, isLoading: false });
    getItemMock.mockReturnValueOnce(null);
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
    expect(useQueryMock).toHaveBeenCalledWith(["requestToken", {"code": "", "codeVerifier": "", "locale": ""}], {"enabled": false});
  });

  it('does not do much if router is undefined', () => {
    useRouterMock.mockReturnValue(undefined);
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
    expect(useQueryMock).toHaveBeenCalledWith(["requestToken", {"code": "", "codeVerifier": "", "locale": ""}], {"enabled": false});
  });

  it('does not do much if intl is undefined', () => {
    useIntlMock.mockReturnValueOnce(undefined);
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
    expect(useQueryMock).toHaveBeenCalledWith(["requestToken", {"code": "", "codeVerifier": "", "locale": ""}], {"enabled": false});
  });
});
