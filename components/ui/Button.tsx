import useTypedText from '../../hooks/useTypedText';
import TypedText from '../TypedText';
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
        <TypedText text={'> ' + label} rate={40} startDelay={12} />
      </button>
    </>
  )
}

export default Button;
