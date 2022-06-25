import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export type ThemeName = 'light' | 'dark';

export type ThemeColorHex = string;

export type ThemeColor = {
  0: ThemeColorHex,
  5: ThemeColorHex,
  10: ThemeColorHex,
  20: ThemeColorHex,
  30: ThemeColorHex,
  40: ThemeColorHex,
  50: ThemeColorHex,
  60: ThemeColorHex,
  70: ThemeColorHex,
  80: ThemeColorHex,
  90: ThemeColorHex,
  100: ThemeColorHex,
};

export type ThemeColorGroupName = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'semantic';

export type ThemeScheme = {
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
    'primary': {
      0: '#F2F9FF',
      5: '#E5F3FE',
      10: '#D8EDFE',
      20: '#BFE0FB',
      30: '#A8D3F8',
      40: '#94C7F3',
      50: '#83BAEC',
      60: '#75ADE3',
      70: '#69A0D8',
      80: '#5E92CA',
      90: '#5484BB',
      100: '#4B76AB',
    },
    'secondary': {
      0: '#F2F9FF',
      5: '#E5F2FE',
      10: '#D8EBFE',
      20: '#BFDAFB',
      30: '#A8C3F8',
      40: '#94A7F3',
      50: '#8385EC',
      60: '#8F75E3',
      70: '#A469D8',
      80: '#BD5ECA',
      90: '#BB54A3',
      100: '#AB4B76',
    },
    'tertiary': {
      0: '#F7FFF2',
      5: '#EFFEE5',
      10: '#E7FED8',
      20: '#D7FBBF',
      30: '#C8F8A8',
      40: '#BAF394',
      50: '#ADEC83',
      60: '#A1E375',
      70: '#95D869',
      80: '#89CA5E',
      90: '#7DBB54',
      100: '#72AB4B',
    },
    'neutral': {
      0: '#EAFFFE',
      5: '#BECFCE',
      10: '#94A1A0',
      20: '#6E7877',
      30: '#4F5555',
      40: '#363A3A',
      50: '#232626',
      60: '#151616',
      70: '#0B0B0B',
      80: '#040404',
      90: '#020202',
      100: '#000000',
    },
    'semantic': {
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
    }
  },
  'dark': {
    'primary': {
      0: '#4B76AB',
      5: '#5484BB',
      10: '#5E92CA',
      20: '#69A0D8',
      30: '#75ADE3',
      40: '#83BAEC',
      50: '#94C7F3',
      60: '#A8D3F8',
      70: '#BFE0FB',
      80: '#D8EDFE',
      90: '#E5F3FE',
      100: '#F2F9FF',
    },
    'secondary': {
      0: '#AB4B76',
      5: '#BB54A3',
      10: '#BD5ECA',
      20: '#A469D8',
      30: '#8F75E3',
      40: '#8385EC',
      50: '#94A7F3',
      60: '#A8C3F8',
      70: '#BFDAFB',
      80: '#D8EBFE',
      90: '#E5F2FE',
      100: '#F2F9FF',
    },
    'tertiary': {
      0: '#72AB4B',
      5: '#7DBB54',
      10: '#89CA5E',
      20: '#95D869',
      30: '#A1E375',
      40: '#ADEC83',
      50: '#BAF394',
      60: '#C8F8A8',
      70: '#D7FBBF',
      80: '#E7FED8',
      90: '#EFFEE5',
      100: '#F7FFF2',
    },
    'neutral': {
      0: '#000000',
      5: '#020202',
      10: '#040404',
      20: '#0B0B0B',
      30: '#151616',
      40: '#232626',
      50: '#363A3A',
      60: '#4F5555',
      70: '#6E7877',
      80: '#94A1A0',
      90: '#BECFCE',
      100: '#EAFFFE',
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
