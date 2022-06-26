import Head from "next/head";
import styles from './Layout.module.css'
import LocalePicker from "./LocalePicker";
import { LOCALES } from '../misc/locales';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ActivityIndicatorOverlay from "./ActivityIndicatorOverlay";
import { useContext } from "react";
import { ThemeContext, ThemeName, themeNames } from "../context/ThemeContext";
import Button from "./ui/Button";
import { setTheme } from "../redux/features/theme/themeSlice";
import Logotype from "./Logotype";

type Props = {
  children: any;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const isLoading = auth.status === 'loggingIn' || auth.status === 'loggingOut';

  const changeTheme = (themeName: ThemeName) => {
    dispatch(setTheme({ name: themeName }));
  }

  const themeButtons = themeNames.map(themeName => {
    return (<div key={`themeButton-${themeName}`}><Button preset='small' onClick={() => changeTheme(themeName)}>{themeName}</Button></div>);
  });

  return (
    <div data-testid='layout' className={styles.container} style={{ backgroundColor: theme.neutral[200].bg }}>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header data-testid='layout-header' className={styles.header} style={{ backgroundColor: theme.neutral[50].bg, borderColor: theme.neutral[500].bg, borderStyle: 'solid', borderWidth: 0, borderBottomWidth: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <LocalePicker locales={LOCALES} />
          <div style={{ flexGrow: 1}}></div>
          {themeButtons}
        </div>
      </header>
      <main data-testid='layout-main' className={styles.main} style={{ backgroundColor: theme.neutral[200].bg }}>
        {!isLoading && (
          <div data-testid='layout-main-content'>
            {children}
          </div>
        )}
        {isLoading && <ActivityIndicatorOverlay />}
      </main>
    </div>
  );
};

export default Layout;
