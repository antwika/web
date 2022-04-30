import useTypedText from "../hooks/useTypedText";
import styles from './TypedText.module.css';

type Props = {
  text: string;
  rate: number;
  startDelay: number;
}

const TypedText: React.FC<Props> = ({ text, rate, startDelay }) => {
  const typedText = useTypedText(text, rate, startDelay);

  return (
    <div className={styles.container}>
      <div className={styles.hiddenContent}>{text}</div>
      <div className={styles.visibleContent}>{typedText}</div>
    </div>
  );
}

export default TypedText;
