import { useEffect, useState } from "react";
import useTick from "../hooks/useTick";
import styles from './TypedText.module.css';

type Props = {
  text: string;
  rate: number;
  startDelay: number;
}

const TypedText: React.FC<Props> = ({ text, rate, startDelay }) => {
  const tick = useTick(rate, startDelay);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (tick >= 0 && tick <= text.length) {
      setCurrentText(text.slice(0, tick))
    }
  }, [text, tick]); 

  return (
    <div className={styles.container}>
      <div className={styles.hiddenContent}>{text}</div>
      <div className={styles.visibleContent}>{currentText}</div>
    </div>
  );
}

export default TypedText;
