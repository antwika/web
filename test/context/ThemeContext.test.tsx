import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { Provider } from "react-redux";
import { ThemeContext, ThemeProvider } from "../../src/context/ThemeContext";
import { setTheme } from "../../src/redux/features/theme/themeSlice";
import { store } from "../../src/redux/store";

const ThemeConsumer = () => {
  const { theme } = useContext(ThemeContext);
  return <div data-testid='theme-consumer'>{theme.name}</div>;
};

describe('ThemeContext', () => {
  it('can defaults to "light" theme', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      </Provider>
    );
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
    const themeConsumer = screen.getByTestId('theme-consumer');
    expect(themeConsumer).toBeInTheDocument();
    expect(themeConsumer).toHaveTextContent('light');
  });

  it('can be controlled by setting theme name in store', () => {
    store.dispatch(setTheme({
      name: 'dark',
    }));
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      </Provider>
    );
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
    const themeConsumer = screen.getByTestId('theme-consumer');
    expect(themeConsumer).toBeInTheDocument();
    expect(themeConsumer).toHaveTextContent('dark');
  });

  it('can be rendered with a fixed theme name', () => {
    render(
      <Provider store={store}>
        <ThemeProvider themeName="stack-overflow">
        <ThemeConsumer />
        </ThemeProvider>
      </Provider>
    );
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
    const themeConsumer = screen.getByTestId('theme-consumer');
    expect(themeConsumer).toBeInTheDocument();
    expect(themeConsumer).toHaveTextContent('stack-overflow');
  });
});