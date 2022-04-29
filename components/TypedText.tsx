import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  rate: number;
  startDelay: number;
}

const TypedText: React.FC<Props> = ({ text, rate, startDelay }) => {
  const [tick, setTick] = useState(-startDelay);
  const [isStartDelayPassed, setStartDelayPassed] = useState(true);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (!isStartDelayPassed) return;
    let timer: NodeJS.Timer;
    timer = setInterval(() => {
      if (tick < text.length) {
        setTick(tick + 1);
      } else {
        clearInterval(timer);
      }
    }, 1000/rate);
    return () => clearInterval(timer);
  }, [text, rate, isStartDelayPassed, tick]);

  useEffect(() => {
    if (tick >= 0) {
      setCurrentText(text.slice(0, tick))
    }
  }, [text, tick]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ visibility: 'hidden' }}>{text}</div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{currentText}</div>
    </div>
  );
}

export default TypedText;
