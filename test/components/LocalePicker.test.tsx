import LocalePicker from '../../src/components/LocalePicker';
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setAuth } from '../../src/redux/features/auth/authSlice';
import { LOCALES } from '../../src/misc/locales';

const mockRouter = { pathname: '/home', query: {}, asPath: "/home/", push: jest.fn() };

jest.mock("next/router", () => ({
  useRouter() {
      return mockRouter;
  },
}));

describe("LocalePicker", () => {
  it("redirects the user when various locale buttons are clicked", () => {
    render(<Provider store={store}><LocalePicker locales={LOCALES} /></Provider>);

    const localePicker = screen.getByTestId("locale-picker");
    expect(localePicker).toBeInTheDocument();

    within(localePicker).getByText('sv-SE').click();
    expect(mockRouter.push).toHaveBeenCalledWith({ pathname: "/home", query: {} }, '/home/', { locale: "sv-SE" });
    
    within(localePicker).getByText('en-US').click();
    expect(mockRouter.push).toHaveBeenCalledWith({ pathname: "/home", query: {} }, '/home/', { locale: "en-US" });
    
    within(localePicker).getByText('ko-KR').click();
    expect(mockRouter.push).toHaveBeenCalledWith({ pathname: "/home", query: {} }, '/home/', { locale: "ko-KR" });
  });
});
