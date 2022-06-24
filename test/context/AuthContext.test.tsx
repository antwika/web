import { AuthProvider } from '../../src/context/AuthContext';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setAuth } from '../../src/redux/features/auth/authSlice';

const pushMock = jest.fn();
const replaceMock = jest.fn();
const useRouterMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => useRouterMock(),
}));

const useQueryMock = jest.fn();
jest.mock('../../src/utils/trpc', () => ({
  trpc: {
    useQuery: () => useQueryMock(),
  },
}));

const getItemMock = jest.fn();

const parseUserMock = jest.fn();
jest.mock('../../src/misc/auth', () => ({
  parseUser: () => parseUserMock(),
}));

describe("AuthContext", () => {
  let originalGetItem: any;

  beforeAll(() => {
    originalGetItem = global.Storage.prototype.getItem;
    global.Storage.prototype.getItem = () => getItemMock();
  });

  afterAll(() => {
    global.Storage.prototype.getItem = originalGetItem;
  });

  beforeEach(() => {
    jest.resetModules()
  });

  it("dispatches setAuth", () => {
    useQueryMock.mockReturnValue({ isIdle: false, data: { valid: true }, isLoading: false });
    getItemMock.mockReturnValue(JSON.stringify('an.example.token'));
    parseUserMock.mockReturnValue({
      id: 'FooBar',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
    });

    render(
      <Provider store={store}>
        <AuthProvider>
          <div data-testid='child'>Foo</div>
        </AuthProvider>
      </Provider>
    );
    const authContext = screen.getByTestId("child");
    expect(authContext).toBeInTheDocument();
    expect(store.getState().auth.status).toBe('loggedIn');
    expect(store.getState().auth.accessToken).toBe('an.example.token');
    expect(store.getState().auth.user).toStrictEqual({
      id: 'FooBar',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
    });
  });

  it("does not call router.replace if router is undefined", () => {
    useRouterMock.mockImplementation(() => undefined);
    render(
      <Provider store={store}>
        <AuthProvider>
          <div data-testid='child'>Foo</div>
        </AuthProvider>
      </Provider>
    );
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("redirects to root if auth status is logged out", () => {
    useRouterMock.mockImplementation(() => ({
      pathname: '/home',
      query: {},
      asPath: "/home/",
      push: (...args: any) => pushMock(...args),
      replace: (...args: any) => replaceMock(...args),
    }));
    store.dispatch(setAuth({
      status: 'loggedOut', 
      accessToken: undefined,
      user: null,
    }));
    render(
      <Provider store={store}>
        <AuthProvider>
          <div data-testid='child'>Foo</div>
        </AuthProvider>
      </Provider>
    );
    expect(replaceMock).toHaveBeenCalledWith('/');
  });
});
