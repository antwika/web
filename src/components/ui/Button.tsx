import { useContext } from 'react';
import { SemanticColorGroupName, ThemeContext } from '../../context/ThemeContext';
import styles from './Button.module.css';

type Preset = 'large' | 'medium' | 'small';

type Props = {
  preset?: Preset,
  children: React.ReactNode,
  onClick?: () => void,
}

const Button = ({
    preset = 'medium',
    children,
    onClick = () => {}
}: Props) => {
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

export default Button;
