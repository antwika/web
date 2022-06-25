import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Button.module.css';

type Preset = 'large' | 'medium' | 'small';

type Props = {
  preset?: Preset,
  children: any,
  type: 'button' | 'submit' | 'reset' | undefined,
  onClick: () => void,
}

const Button: React.FC<Props> = ({ preset, type, children, onClick }) => {
  const { theme } = useContext(ThemeContext);
  
  const presetButtonStyle = styles[`preset__button__${preset}`]
  return (
    <>
      <button
        data-testid='ui-button'
        className={styles.button + ' ' + presetButtonStyle}
        style={{
          backgroundColor: theme.primary[100],
          color: theme.neutral[0],
        }}
        type={type}
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
