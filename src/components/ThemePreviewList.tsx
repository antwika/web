import { ThemeName } from '../context/ThemeContext';
import styles from './ThemePreviewList.module.css';
import ThemePreview from './ThemePreview';

type Props = {
  themeNames: ThemeName[],
};

const ThemeList = ({ themeNames }: Props) => {
  const themeList = themeNames.map(themeName => (
    <div key={`themePreview-${themeName}`} className={styles.themePreviewItem}>
      <ThemePreview themeName={themeName} />
    </div>
  ));

  return (
    <div className={styles.container}>
      {themeList}
    </div>
  );
}

export default ThemeList;
