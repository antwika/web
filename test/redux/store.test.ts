import { store } from '../../src/redux/store';

jest.mock('@reduxjs/toolkit', () => ({
  configureStore: () => jest.fn(),
}));

jest.mock('../../src/redux/features/auth/authSlice', () => ({
  authReducer: jest.fn(),
}));

describe('store', () => {
  it('can retrieve a store', () => {
    expect(store).toBeDefined();
  });
});
