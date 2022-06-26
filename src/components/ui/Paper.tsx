import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Paper.module.css';

type Props = {
  children: React.ReactNode,
};

const Paper: React.FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: theme.neutral[50].bg,
        borderColor: theme.neutral[400].bg,
        color: theme.neutral[50].fg,
      }}
    >
      {children}
    </div>
  );
};

export default Paper;
