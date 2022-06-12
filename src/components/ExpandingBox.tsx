import { useEffect, useState } from "react";
import styles from './ExpandingBox.module.css';

type Props = {
  children: any;
  startDelay: number;
}

const ExpandingBox: React.FC<Props> = ({ children, startDelay }) => {
  const [showContent, setShowContent] = useState(false);
  const [showFade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setFade(true);
      const t2 = setTimeout(() => setShowContent(true), 1200);
      return () => clearTimeout(t2);
    }, startDelay);
    return () => clearTimeout(t1);
  }, [startDelay]);

  return (
    <div className={styles.container}>
      <div className={styles.hiddenContent}>{children}</div>
      <div className={styles.visibleContent}>
        {showFade && <div className={styles.box}>
          {showContent && children}
        </div>}
      </div>
    </div>
  );
}

export default ExpandingBox;
