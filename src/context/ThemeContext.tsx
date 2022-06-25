import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export type ThemeName = 'light' | 'dark';

export type ThemeColorHex = string;

export type ThemeColor = {
  50: ThemeColorHex,
  100: ThemeColorHex,
  200: ThemeColorHex,
  300: ThemeColorHex,
  400: ThemeColorHex,
  500: ThemeColorHex,
  600: ThemeColorHex,
  700: ThemeColorHex,
  800: ThemeColorHex,
  900: ThemeColorHex,
};

export type ThemeColorGroupName = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'semantic';

export type ThemeScheme = {
  'text': ThemeColor,
  'primary': ThemeColor,
  'secondary': ThemeColor,
  'tertiary': ThemeColor,
  'neutral': ThemeColor,
  'semantic': {
    success: ThemeColorHex,
    warning: ThemeColorHex,
    error: ThemeColorHex,
    info: ThemeColorHex,
  },
};

export const themes: Record<ThemeName, ThemeScheme> = {
  'light': {
    'text': {
      50: '#212121',
      100: '#424242',
      200: '#616161',
      300: '#757575',
      400: '#9E9E9E',
      500: '#BDBDBD',
      600: '#E0E0E0',
      700: '#EEEEEE',
      800: '#F5F5F5',
      900: '#FAFAFA',
    },
    'primary': {
      50: '#ECEFF1',
      100: '#CFD8DC',
      200: '#B0BEC5',
      300: '#90A4AE',
      400: '#78909C', // light text
      500: '#607D8B', // light text
      600: '#546E7A', // light text
      700: '#455A64', // light text
      800: '#37474F', // light text
      900: '#263238', // light text
    },
    'secondary': {
      50: '#e9e4e0', // placeholder
      100: '#c6bbb4', // placeholder
      200: '#9f8e84', // placeholder
      300: '#796456', // placeholder
      400: '#5f4736', // placeholder
      500: '#452b18', // placeholder
      600: '#3c2413', // placeholder
      700: '#2f1a09', // placeholder
      800: '#240e00', // placeholder
      900: '#12273C',
    },
    'tertiary': {
      50: '#EFFEE5', // placeholder
      100: '#E7FED8', // placeholder
      200: '#D7FBBF', // placeholder
      300: '#C8F8A8', // placeholder
      400: '#BAF394', // placeholder
      500: '#ADEC83', // placeholder
      600: '#A1E375', // placeholder
      700: '#95D869', // placeholder
      800: '#89CA5E', // placeholder
      900: '#7DBB54', // placeholder
    },
    'neutral': {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575', // light text
      700: '#616161', // light text
      800: '#424242', // light text
      900: '#212121', // light text
    },
    'semantic': {
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
    }
  },
  'dark': {
    'text': {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    'primary': {
      50: '#ECEFF1',
      100: '#CFD8DC',
      200: '#B0BEC5',
      300: '#90A4AE',
      400: '#78909C', // light text
      500: '#607D8B', // light text
      600: '#546E7A', // light text
      700: '#455A64', // light text
      800: '#37474F', // light text
      900: '#263238', // light text
    },
    'secondary': {
      50: '#e9e4e0',
      100: '#c6bbb4',
      200: '#9f8e84',
      300: '#796456',
      400: '#5f4736',
      500: '#452b18',
      600: '#3c2413',
      700: '#2f1a09',
      800: '#240e00',
      900: '#1a0000',
    },
    'tertiary': {
      50: '#EFFEE5',
      100: '#E7FED8',
      200: '#D7FBBF',
      300: '#C8F8A8',
      400: '#BAF394',
      500: '#ADEC83',
      600: '#A1E375',
      700: '#95D869',
      800: '#89CA5E',
      900: '#7DBB54',
    },
    'neutral': {
      50: '#727272',
      100: '#6a6a6a',
      200: '#5c5c5c',
      300: '#484848',
      400: '#3a3a3a',
      500: '#2c2c2c',
      600: '#222222', // light text
      700: '#1e1e1e', // light text
      800: '#161616', // light text
      900: '#212121', // light text
    },
    'semantic': {
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
    }
  },
};

export const ThemeContext = createContext<{ theme: ThemeScheme }>({ theme: themes['light'] });

type Props = {
  themeName: ThemeName,
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ themeName, children }) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <div data-testid='theme-provider'>
      <ThemeContext.Provider value={{ theme: themes[theme.name] }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
