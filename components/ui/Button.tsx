import styles from './Button.module.css';

type Props = {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ type, label, onClick }) => {
  return (
    <>
      <button className={styles.button} type={type} onClick={() => onClick()}>
        {'> ' + label}
      </button>
    </>
  )
}

export default Button;
