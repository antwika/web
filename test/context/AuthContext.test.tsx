import { AuthProvider } from '../../src/context/AuthContext';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setAuth } from '../../src/redux/features/auth/authSlice';

const mockRouter = { pathname: '/home', query: {}, asPath: "/home/", push: jest.fn(), replace: jest.fn() };

jest.mock("next/router", () => ({
  useRouter() {
    return mockRouter;
  },
}));

describe("AuthContext", () => {
  it("renders its children", () => {
    store.dispatch(setAuth({
      status: 'loggedIn', 
      accessToken: undefined,
      user: {
        id: 'test-id',
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@example.com'
      },
    }));
    render(
      <Provider store={store}>
        <AuthProvider>
          <div data-testid='child'>Foo</div>
        </AuthProvider>
      </Provider>
    );
    const authContext = screen.getByTestId("child");
    expect(authContext).toBeInTheDocument();
  });

  it("redirects to root if auth status is logged out", () => {
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
    expect(mockRouter.replace).toHaveBeenCalledWith('/');
  });
});
