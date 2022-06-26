import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './TextInput.module.css';

type Props = {
  text?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  warning?: string,
}

const TextInput: React.FC<Props> = ({ type, label, placeholder, disabled, warning }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      { label && <div data-cy='ui-text-input-label' className={styles.label} style={{ color: theme.neutral[50].fg }}>{label}</div> }
      <input
        data-testid='ui-text-input'
        className={styles.input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          backgroundColor: theme.secondary[300].bg,
          color: theme.secondary[300].fg,
          borderColor: theme.secondary[500].bg,
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      />
      { warning && <div data-cy='ui-text-input-warning' className={styles.label} style={{ color: theme.semantic.error[300].bg }}>{warning}</div> }
    </>
  )
}

TextInput.defaultProps = {
  text: '',
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
}

export default TextInput;
