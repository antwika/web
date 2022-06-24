import { authReducer, setAuth, unsetAuth, authSlice, doLogout } from '../../../../src/redux/features/auth/authSlice';
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
