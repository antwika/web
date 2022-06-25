import { store } from '../../src/redux/store';

jest.mock('@reduxjs/toolkit', () => ({
  configureStore: () => jest.fn(),
  createSlice: jest.fn().mockImplementationOnce(() => ({
    actions: {
      setTheme: jest.fn(),
      reducer: jest.fn(),
    }
  }))
}));

jest.mock('../../src/redux/features/auth/authSlice', () => ({
  authReducer: jest.fn(),
}));

describe('store', () => {
  it('can retrieve a store', () => {
    expect(store).toBeDefined();
  });
});
