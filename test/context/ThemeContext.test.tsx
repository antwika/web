import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { Provider } from "react-redux";
import { ThemeContext, ThemeProvider } from "../../src/context/ThemeContext";
import { store } from "../../src/redux/store";

describe('ThemeContext', () => {
  it('can be rendered', () => {
    render(
      <Provider store={store}>
        <ThemeProvider themeName="light">
          App
        </ThemeProvider>
      </Provider>
    );
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
  });
});