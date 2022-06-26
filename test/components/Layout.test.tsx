import Layout from '../../src/components/Layout';
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setAuth } from '../../src/redux/features/auth/authSlice';

describe("Layout", () => {
  it("renders layout with header and main", () => {
    render(<Provider store={store}><Layout>Foo</Layout></Provider>);
    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();

    const layoutHeader = within(layout).getByTestId('layout-header');
    expect(layoutHeader).toBeInTheDocument();

    const layoutMain = within(layout).getByTestId('layout-main');
    expect(layoutMain).toBeInTheDocument();

    const lightThemeButton = within(layoutHeader).getByText('light');
    expect(lightThemeButton).toBeInTheDocument();
    lightThemeButton.click();
    expect(store.getState().theme.name).toBe('light');
    
    const darkThemeButton = within(layoutHeader).getByText('dark');
    expect(darkThemeButton).toBeInTheDocument();
    darkThemeButton.click();
    expect(store.getState().theme.name).toBe('dark');
    
    const stackOverflowThemeButton = within(layoutHeader).getByText('stack-overflow');
    expect(stackOverflowThemeButton).toBeInTheDocument();
    stackOverflowThemeButton.click();
    expect(store.getState().theme.name).toBe('stack-overflow');
  });

  it("renders an the main content while logged out", () => {
    store.dispatch(setAuth({
      status: 'loggedOut', 
      accessToken: undefined,
      user: null,
    }));
    render(<Provider store={store}><Layout>Foo</Layout></Provider>);
    const layout = screen.getByTestId("layout");
    const layoutMain = within(layout).getByTestId('layout-main');
    
    const layoutMainContent = within(layoutMain).getByTestId('layout-main-content');
    expect(layoutMainContent).toBeInTheDocument();
  });

  it("renders an activity indicator overlay while logging in", () => {
    store.dispatch(setAuth({
      status: 'loggingIn', 
      accessToken: undefined,
      user: null,
    }));
    render(<Provider store={store}><Layout>Foo</Layout></Provider>);
    const layout = screen.getByTestId("layout");
    const layoutMain = within(layout).getByTestId('layout-main');
    
    const layoutMainActivityIndicatorOverlay = within(layoutMain).getByTestId('activity-indicator-overlay');
    expect(layoutMainActivityIndicatorOverlay).toBeInTheDocument();
  });

  it("renders an the main content while logged in", () => {
    store.dispatch(setAuth({
      status: 'loggedIn', 
      accessToken: undefined,
      user: null,
    }));
    render(<Provider store={store}><Layout>Foo</Layout></Provider>);
    const layout = screen.getByTestId("layout");
    const layoutMain = within(layout).getByTestId('layout-main');
    
    const layoutMainContent = within(layoutMain).getByTestId('layout-main-content');
    expect(layoutMainContent).toBeInTheDocument();
  });

  it("renders an activity indicator overlay while logging out", () => {
    store.dispatch(setAuth({
      status: 'loggingOut', 
      accessToken: undefined,
      user: null,
    }));
    render(<Provider store={store}><Layout>Foo</Layout></Provider>);
    const layout = screen.getByTestId("layout");
    const layoutMain = within(layout).getByTestId('layout-main');
    
    const layoutMainActivityIndicatorOverlay = within(layoutMain).getByTestId('activity-indicator-overlay');
    expect(layoutMainActivityIndicatorOverlay).toBeInTheDocument();
  });
});
