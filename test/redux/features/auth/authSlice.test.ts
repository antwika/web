import { authReducer, setAuth, unsetAuth, authSlice, handleAccessToken, doLogout } from '../../../../src/redux/features/auth/authSlice';
// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { store } from '../../../../src/redux/store';

const parseUserMock = jest.fn();
jest.mock('../../../../src/misc/auth', () => ({
  parseUser: (accessToken: string) => parseUserMock(accessToken),
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

describe('authSlice', () => {
  it('has an authReducer', () => {
    expect(authReducer).toBeDefined();
  });

  it('has an action called setAuth', () => {
    expect(setAuth).toBeDefined();
  });

  it('has an action called unsetAuth', () => {
    expect(unsetAuth).toBeDefined();
  });

  it('has a slice called authSlice', () => {
    expect(authSlice).toBeDefined();
  });

  it('has a thunk called handleAccessToken', () => {
    expect(handleAccessToken).toBeDefined();
  });

  it('has a thunk called doLogout', () => {
    expect(doLogout).toBeDefined();
  });

  it('can set and unset auth state', async () => {
    store.dispatch(setAuth({
      status: 'loggedIn', 
      accessToken: 'an.example.token',
      user: {
        id: 'FooBar',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
      },
    }));
    expect(store.getState().auth.status).toBe('loggedIn');
    expect(store.getState().auth.accessToken).toBe('an.example.token');
    expect(store.getState().auth.user).toStrictEqual({
      id: 'FooBar',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
    });
    store.dispatch(unsetAuth());
    expect(store.getState().auth.status).toBe('loggedOut');
    expect(store.getState().auth.accessToken).toBe(undefined);
    expect(store.getState().auth.user).toBe(null);
  });

  it('can handle an access token', async () => {
    store.dispatch(setAuth({
      status: 'loggedOut', 
      accessToken: 'an.example.token',
      user: {
        id: 'FooBar',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
      },
    }));

    jsonMock.mockResolvedValue(({ valid: true }));
    parseUserMock.mockReturnValue({
      id: 'FooBar',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
    });
    await store.dispatch(handleAccessToken('an.example.token'));
    expect(store.getState().auth.accessToken).toBeTruthy();
  });

  it('returns false if the handleAccessToken throws an error', async () => {
    jsonMock.mockImplementationOnce(() => { throw new Error('Fatal error'); });
    await store.dispatch(handleAccessToken('an.example.token'));
    expect(store.getState().auth.accessToken).toBeFalsy();
  });

  it('set auth to be logged out if accessToken is invalid', async () => {
    store.dispatch(setAuth({
      status: 'loggedIn', 
      accessToken: 'an.example.token',
      user: {
        id: 'FooBar',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
      },
    }));

    jsonMock.mockResolvedValue(({ valid: false }));
    await store.dispatch(handleAccessToken('an.example.token'));
    expect(store.getState().auth.status).toBe('loggedOut');
    expect(store.getState().auth.accessToken).toBeFalsy();
    expect(store.getState().auth.user).toBeFalsy();
  });

  it('removes the accessToken when thunk "doLogout" is called', async () => {
    store.dispatch(setAuth({
      status: 'loggedIn', 
      accessToken: 'an.example.token',
      user: {
        id: 'FooBar',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
      },
    }));

    await store.dispatch(doLogout());
    expect(store.getState().auth.accessToken).toBeFalsy();
  });
});
