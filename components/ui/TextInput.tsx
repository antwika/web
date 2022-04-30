import useTypedText from '../../hooks/useTypedText';
import TypedText from '../TypedText';
import styles from './TextInput.module.css';

type Props = {
  text?: string;
  label?: string;
  placeholder: string;
  type: string;
}

const TextInput: React.FC<Props> = ({ type, text, label, placeholder }) => {
  const typedPlaceholder = useTypedText(placeholder, 20, 0);

  return (
    <>
      { label && <div className={styles.label}><TypedText text={label} rate={40} startDelay={0} /></div> }
      <input className={styles.input} type={type} placeholder={typedPlaceholder} />
    </>
  )
}

export default TextInput;
