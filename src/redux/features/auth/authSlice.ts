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

const parseUser = (accessToken: string): User => {
  const payload = accessToken.split('.')[1];
  const decoded = Buffer.from(payload, 'base64').toString('utf8');
  const { sub, email, firstName, lastName } = JSON.parse(decoded);
  return {
    id: sub,
    email: email,
    firstName: firstName,
    lastName: lastName,
  };
}

export const handleAccessToken = createAsyncThunk<AuthState, string>(
  'auth/handleAccessToken',
  async (accessToken) => {
    await new Promise((resolve) => { setTimeout(() => resolve(true), ARBITRARY_RESPONSE_DELAY_MS); });
    const response = await fetch(`/api/verify`, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: accessToken,
      }),
    });
    const { valid: isTokenValid } = await response.json();
    if (!isTokenValid) {
      localStorage.removeItem('accessToken');
      return { status: 'loggedOut', accessToken: false, user: null };
    }

    const user = parseUser(accessToken);

    return { status: 'loggedIn', accessToken, user };
  },
);

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
    builder.addCase(handleAccessToken.pending, (state) => {
      state.status = 'loggingIn';
    });

    builder.addCase(handleAccessToken.fulfilled, (state, { payload }) => {
      state.status = payload.status;
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
    
    builder.addCase(handleAccessToken.rejected, (state, { error }) => {
      console.warn('handleAccessToken rejected! Error:', error);
      state.status = 'loggedOut';
      state.accessToken = false;
      state.user = null;
    });

    builder.addCase(doLogout.pending, (state) => {
      state.status = 'loggingOut';
    });

    builder.addCase(doLogout.fulfilled, (state) => {
      state.status = 'loggedOut';
      state.accessToken = false;
      state.user = null;
    });
    
    builder.addCase(doLogout.rejected, (state, { error }) => {
      console.warn('doLogout rejected! Error:', error);
      state.status = 'loggedOut';
      state.accessToken = false;
      state.user = null;
    });
  }
})

export const { setAuth, unsetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer
