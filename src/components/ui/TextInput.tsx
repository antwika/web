import styles from './TextInput.module.css';

type Props = {
  text?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

const TextInput: React.FC<Props> = ({ type, label, placeholder, disabled }) => {
  return (
    <>
      { label && <div data-cy='ui-text-input-label' className={styles.label}>{label}</div> }
      <input
        data-testid='ui-text-input'
        className={styles.input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
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
