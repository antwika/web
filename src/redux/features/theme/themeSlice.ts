import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeName } from '../../../context/ThemeContext';

export interface ThemeState {
  name: ThemeName,
}

const initialState: ThemeState = {
  name: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      state.name = action.payload.name;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer
