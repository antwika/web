import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const ARBITRARY_RESPONSE_DELAY_MS = 1000;

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
};

export interface AuthState {
  status: 'unknown' | 'loggedOut' | 'loggingIn' | 'loggedIn' | 'loggingOut',
  accessToken: undefined | false | string,
  user: User | null,
}

const initialState: AuthState = {
  status: 'unknown',
  accessToken: undefined,
  user: null,
};

export const doLogout = createAsyncThunk<AuthState, void>(
  'auth/doLogout',
  async (_) => {
    await new Promise((resolve) => { setTimeout(() => resolve(true), ARBITRARY_RESPONSE_DELAY_MS); });
    localStorage.removeItem('accessToken');
    return { status: 'loggedOut', accessToken: false, user: null };
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.status = action.payload.status;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    unsetAuth: (state) => {
      state.status = 'loggedOut';
      state.accessToken = undefined;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogout.pending, (state) => {
      state.status = 'loggingOut';
    });

    builder.addCase(doLogout.fulfilled, (state) => {
      state.status = 'loggedOut';
      state.accessToken = false;
      state.user = null;
    });
  }
})

export const { setAuth, unsetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer
