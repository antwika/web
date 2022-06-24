import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../../../src/context/AuthContext';
import Cb from '../../../src/pages/oidc/cb';
import { store } from '../../../src/redux/store';

const mockRouter = { pathname: '/home', query: {}, asPath: "/home/", push: jest.fn() };

jest.mock("next/router", () => ({
  useRouter() {
    return mockRouter;
  },
}));

const mockIntl = { formatMessage: jest.fn() };

jest.mock("react-intl", () => ({
  useIntl() {
    return mockIntl;
  },
}));

const generateAuthUrlMock = jest.fn();

jest.mock('../../../src/misc/oidc', () => ({
  generateAuthUrl: () => generateAuthUrlMock(),
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

describe('cb', () => {
  it('does something', () => {
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    render(
      <Provider store={store}>
        <AuthProvider>
          <Cb />
        </AuthProvider>
      </Provider>
    );
  });
});