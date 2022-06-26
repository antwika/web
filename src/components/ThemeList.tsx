import { themes, themeColorLevels, themeColorGroupNames, themeNames, ThemeProvider, SemanticColorGroupName } from '../context/ThemeContext';
import styles from './ThemeList.module.css';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Note from './ui/Note';
import Paper from './ui/Paper';
import TextInput from './ui/TextInput';

const ThemePalette = () => {
  const themePalettes = themeNames.map(themeName => {
    const palette = themeColorGroupNames.map(themeColorGroupName => {
      const swatches = themeColorLevels.map((level) => {
        const swatchKey = `${themeName}-${themeColorGroupName}-${level}`;
        return <div
          key={swatchKey}
          className={styles.swatch}
          style={{
            display: 'flex',
            backgroundColor: themes[themeName][themeColorGroupName][level].bg,
            color: themes[themeName][themeColorGroupName][level].fg,
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          c
        </div>;
      });

      const paletteKey = `${themeName}-${themeColorGroupName}`;
      return (
        <div key={paletteKey} className={styles.paletteRow}>
          <div style={{ fontSize: 8, fontWeight: 'bold' }}>{themeColorGroupName}</div>
          <div className={styles.swatches}>
            {swatches}
          </div>
        </div>
      );
    });
    
    const semanticGroupNames: SemanticColorGroupName[] = ['success', 'warning', 'error', 'info', 'plain'];
    const semanticPalette = semanticGroupNames.map(semanticColorGroupName => {
      const semanticSwatches = themeColorLevels.map((level) => {
        const swatchKey = `${themeName}-${'semantic'}-${semanticColorGroupName}-${level}`;
        return <div
          key={swatchKey}
          className={styles.swatch}
          style={{
            display: 'flex',
            backgroundColor: themes[themeName]['semantic'][semanticColorGroupName][level].bg,
            color: themes[themeName]['semantic'][semanticColorGroupName][level].fg,
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          c
        </div>;
      });

      const paletteKey = `${themeName}-${'semantic'}-${semanticColorGroupName}`;
      return (
        <div key={paletteKey} className={styles.paletteRow}>
          <div style={{ fontSize: 8, fontWeight: 'bold' }}>{semanticColorGroupName}</div>
          <div className={styles.swatches}>
            {semanticSwatches}
          </div>
        </div>
      );
    });

    return (
      <div key={`${themeName}`} className={styles.theme}>
        <ThemeProvider themeName={themeName}>
          <Paper>
            <div style={{ color: themes[themeName].neutral[50].fg}}>Theme: <strong>{themeName}</strong></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ padding: 16 }}>
                {palette}
                {semanticPalette}
              </div>
              <div style={{ padding: 16 }}>
                <Button preset='small' onClick={() => {}}>Button</Button>
                <Button preset='medium' onClick={() => {}}>Button</Button>
                <Button preset='large' onClick={() => {}}>Button</Button>
                <TextInput placeholder='Placeholder...' label='Sample label' warning={'Input validation failure!'}/>
                <Note type={'success'} />
                <Note type={'warning'} />
                <Note type={'error'} />
                <Note type={'info'} />
                <Note type={'plain'} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Badge type={'success'} label={'success'} />
                  <Badge type={'warning'} label={'warning'} />
                  <Badge type={'error'} label={'error'} />
                  <Badge type={'info'} label={'info'} />
                </div>
              </div>
              <div>
                <Paper>
                  Sample body text.
                </Paper>
              </div>
            </div>
          </Paper>
        </ThemeProvider>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      {themePalettes}
    </div>
  );
}

export default ThemePalette;
