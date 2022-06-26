import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Badge.module.css';

type Props = {
  type: 'success' | 'warning' | 'error' | 'info',
  label: string,
};

const Badge: React.FC<Props> = ({ type, label }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div
        className={styles.inner}
        style={{
          backgroundColor: theme.semantic[type][400].bg,
          borderColor: theme.semantic[type][500].bg,
          color: theme.semantic[type][400].fg,
        }}
      >
        { label }
      </div>
    </div>
  );
};

export default Badge;
