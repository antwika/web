import LoginForm from '../../src/components/LoginForm';
import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setAuth } from '../../src/redux/features/auth/authSlice';

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

describe("LoginForm", () => {
  it("can be rendered", async () => {
    store.dispatch(setAuth({
      status: 'loggedOut', 
      accessToken: undefined,
      user: null,
    }));
    const onError = jest.fn();
    render(<Provider store={store}><LoginForm onError={onError} /></Provider>);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  it("redirects to auth url upon submit", async () => {
    store.dispatch(setAuth({
      status: 'loggedOut', 
      accessToken: undefined,
      user: null,
    }));
    mockIntl.formatMessage.mockReturnValue('Log in');
    const onError = jest.fn();
    render(<Provider store={store}><LoginForm onError={onError} /></Provider>);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
    expect(mockIntl.formatMessage).toHaveBeenCalledWith({ id: 'log_in' });

    const loginButton = await within(loginForm).findByText('Log in');
    loginButton.click();

    expect(generateAuthUrlMock).toHaveBeenCalled();
  });

  it("calls the onError callback if submit failed", async () => {
    store.dispatch(setAuth({
      status: 'loggedOut', 
      accessToken: undefined,
      user: null,
    }));
    mockIntl.formatMessage.mockReturnValue('Log in');
    const onError = jest.fn();
    render(<Provider store={store}><LoginForm onError={onError} /></Provider>);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
    expect(mockIntl.formatMessage).toHaveBeenCalledWith({ id: 'log_in' });

    generateAuthUrlMock.mockImplementationOnce(() => { throw new Error('Fatal error'); });
    const loginButton = await within(loginForm).findByText('Log in');
    loginButton.click();

    expect(onError).toHaveBeenCalled();
  });
});
