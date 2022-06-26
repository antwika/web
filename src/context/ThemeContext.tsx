import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import lightTheme from '../../content/themes/light.json';
import darkTheme from '../../content/themes/dark.json';
import stackOverflowTheme from '../../content/themes/stack-overflow.json';

export type ThemeColorLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export const themeColorLevels: ThemeColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export type ThemeName = 'light' | 'dark' | 'stack-overflow';
export const themeNames: ThemeName[] = ['light', 'dark', 'stack-overflow'];

export type ThemeColorHex = string;

export type ThemeColor = {
  50: { bg: ThemeColorHex, fg: ThemeColorHex },
  100: { bg: ThemeColorHex, fg: ThemeColorHex },
  200: { bg: ThemeColorHex, fg: ThemeColorHex },
  300: { bg: ThemeColorHex, fg: ThemeColorHex },
  400: { bg: ThemeColorHex, fg: ThemeColorHex },
  500: { bg: ThemeColorHex, fg: ThemeColorHex },
  600: { bg: ThemeColorHex, fg: ThemeColorHex },
  700: { bg: ThemeColorHex, fg: ThemeColorHex },
  800: { bg: ThemeColorHex, fg: ThemeColorHex },
  900: { bg: ThemeColorHex, fg: ThemeColorHex },
};

export type ThemeColorGroupName ='primary' | 'secondary' | 'tertiary' | 'neutral';
export const themeColorGroupNames: ThemeColorGroupName[] = ['primary', 'secondary', 'tertiary', 'neutral']

export type SemanticColorGroupName = 'success' | 'warning' | 'error' | 'info' | 'plain';
export type ThemeScheme = {
  'name': string,
  'primary': ThemeColor,
  'secondary': ThemeColor,
  'tertiary': ThemeColor,
  'neutral': ThemeColor,
  'semantic': {
    'success': ThemeColor,
    'warning': ThemeColor,
    'error': ThemeColor,
    'info': ThemeColor,
    'plain': ThemeColor,
  },
};

export const themes: Record<ThemeName, ThemeScheme> = {
  'light': lightTheme,
  'dark': darkTheme,
  'stack-overflow': stackOverflowTheme,
};

export const ThemeContext = createContext<{ theme: ThemeScheme }>({ theme: themes['light'] });

type Props = {
  themeName?: ThemeName,
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ themeName, children }) => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <div data-testid='theme-provider'>
      <ThemeContext.Provider value={{ theme: themes[themeName || theme.name] }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
