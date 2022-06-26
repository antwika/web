import { useContext } from 'react';
import { SemanticColorGroupName, ThemeContext } from '../../context/ThemeContext';
import styles from './Button.module.css';

type Preset = 'large' | 'medium' | 'small';

type Props = {
  preset?: Preset,
  children: any,
  onClick: () => void,
}

const Button: React.FC<Props> = ({ preset, children, onClick }) => {
  const { theme } = useContext(ThemeContext);
  
  const presetButtonStyle = styles[`preset__button__${preset}`]
  return (
    <>
      <button
        data-testid='ui-button'
        className={styles.button + ' ' + presetButtonStyle}
        style={{
          backgroundColor: theme.secondary[300].bg,
          color: theme.secondary[300].fg,
          borderColor: theme.secondary[500].bg,
          borderStyle: 'solid',
          borderWidth: 2,
          fontWeight: 'bold',
        }}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  )
}

Button.defaultProps = {
  preset: 'medium',
}

export default Button;
