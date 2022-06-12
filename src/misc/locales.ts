import enUS from '../../content/compiled-locales/en-US.json';
import svSE from '../../content/compiled-locales/sv-SE.json';
import koKR from '../../content/compiled-locales/ko-KR.json';

export const MESSAGES: Record<string, any> = {
  'en-US': enUS,
  'sv-SE': svSE,
  'ko-KR': koKR,
};

export const LOCALES = Object.keys(MESSAGES);
