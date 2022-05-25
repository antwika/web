import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
};

export interface AuthState {
  accessToken: undefined | false | string,
  user: User | null,
}

const initialState: AuthState = {
  accessToken: undefined,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
  },
})

export const { setAuth } = authSlice.actions;

export const authReducer = authSlice.reducer
