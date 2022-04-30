import { useEffect, useState } from "react";

const useTick = (rate: number, startDelay: number) => {
  const [internalTick, setInternalTick] = useState(-startDelay);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timer;
    timer = setInterval(() => {
      setInternalTick(internalTick + 1);
      if (internalTick >= 0) {
        setTick(internalTick);
      }
    }, 1000/rate);
    return () => clearInterval(timer);
  }, [internalTick, rate]);

  return tick;
}

export default useTick;
