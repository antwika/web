import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id: string,
  accessToken: string,
};

export interface AuthState {
  user: User | null,
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
})

export const { setUser, unsetUser } = authSlice.actions;

export const authReducer = authSlice.reducer
