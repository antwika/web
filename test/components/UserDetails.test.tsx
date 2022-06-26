import UserDetails from '../../src/components/UserDetails';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setAuth } from '../../src/redux/features/auth/authSlice';

const mockIntl = { formatMessage: jest.fn() };

jest.mock("react-intl", () => ({
  useIntl() {
      return mockIntl;
  },
}));

describe("UserDetails", () => {
  it("can be rendered", async () => {
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
    render(<Provider store={store}><UserDetails /></Provider>);
    const userDetails = screen.getByTestId("user-details");
    expect(userDetails).toBeInTheDocument();

    expect(mockIntl.formatMessage).toHaveBeenCalledWith({ id: "nickname" });
    expect(mockIntl.formatMessage).toHaveBeenCalledWith({ id: "first_name" });
    expect(mockIntl.formatMessage).toHaveBeenCalledWith({ id: "last_name" });
    expect(mockIntl.formatMessage).toHaveBeenCalledWith({ id: "email" });
  });
});
