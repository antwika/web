import { themeReducer, setTheme, themeSlice } from '../../../../src/redux/features/theme/themeSlice';
import { store } from '../../../../src/redux/store';

describe('themeSlice', () => {
  it('has an themeReducer', () => {
    expect(themeReducer).toBeDefined();
  });

  it('has an action called settheme', () => {
    expect(setTheme).toBeDefined();
  });

  it('has a slice called themeSlice', () => {
    expect(themeSlice).toBeDefined();
  });

  it('can change between theme names', async () => {
    store.dispatch(setTheme({ name: 'dark' }));
    expect(store.getState().theme.name).toBe('dark');
    store.dispatch(setTheme({ name: 'light' }));
    expect(store.getState().theme.name).toBe('light');
    store.dispatch(setTheme({ name: 'dark' }));
    expect(store.getState().theme.name).toBe('dark');
  });
});
