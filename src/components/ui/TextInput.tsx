import styles from './TextInput.module.css';

type Props = {
  text?: string;
  label?: string;
  placeholder: string;
  type: string;
}

const TextInput: React.FC<Props> = ({ type, label, placeholder }) => {
  return (
    <>
      { label && <div className={styles.label}>{label}</div> }
      <input className={styles.input} type={type} placeholder={placeholder} />
    </>
  )
}

export default TextInput;
