import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../../../src/context/AuthContext';
import { generateCodeVerifier } from '../../../src/misc/oidc';
import Cb from '../../../src/pages/oidc/cb';
import { store } from '../../../src/redux/store';

const useRouterMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => useRouterMock(),
}));
useRouterMock.mockImplementation(() => ({ pathname: '/home', query: {}, asPath: "/home/", push: jest.fn() }));

const mockIntl = { formatMessage: jest.fn() };

jest.mock("react-intl", () => ({
  useIntl() {
    return mockIntl;
  },
}));

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
    useQuery: () => useQueryMock(),
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
});
