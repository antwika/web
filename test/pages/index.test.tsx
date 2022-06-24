import "@testing-library/jest-dom";
import { within, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../../src/context/AuthContext';
import Index from '../../src/pages/index';
import { setAuth } from '../../src/redux/features/auth/authSlice';
import { store } from '../../src/redux/store';

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
jest.mock('../../src/misc/oidc', () => ({
  generateAuthUrl: () => generateAuthUrlMock(),
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

const useQueryMock = jest.fn();
jest.mock('../../src/utils/trpc', () => ({
  trpc: {
    useQuery: () => useQueryMock(),
  },
}));

describe('index', () => {
  it('does something', () => {
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    render(
      <Provider store={store}>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </Provider>
    );

    generateAuthUrlMock.mockImplementationOnce(async () => { throw new Error('Fatal error'); });
    const loginForm = screen.getByTestId("login-form");
    const submitButton = within(loginForm).getByTestId('ui-button');
    submitButton.click();
  });

  it('shows the user details if user is authenticated', () => {
    store.dispatch(setAuth({
      status: 'loggedIn', 
      accessToken: 'an.example.token',
      user: {
        id: 'FooBar',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
      },
    }));
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    render(
      <Provider store={store}>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </Provider>
    );

    const userDetails = screen.getByTestId("user-details");
    expect(userDetails).toBeInTheDocument();
  });
});