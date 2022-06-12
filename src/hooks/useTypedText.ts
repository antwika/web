import { useEffect, useState } from "react";
import useTick from "./useTick";

const useTypedText = (text: string, rate: number, startDelay: number) => {
  const tick = useTick(rate, startDelay);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (tick >= 0 && tick <= text.length) {
      setCurrentText(text.slice(0, tick))
    }
  }, [text, tick]); 

  return currentText;
}

export default useTypedText;
