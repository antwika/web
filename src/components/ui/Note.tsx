import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Note.module.css';

type Props = {
  type: 'success' | 'warning' | 'error' | 'info' | 'plain',
};

const Note: React.FC<Props> = ({ type }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div
        className={styles.inner}
        style={{
          backgroundColor: theme.semantic[type][50].bg,
          borderColor: theme.semantic[type][400].bg,
          color: theme.semantic[type][50].fg,
        }}
      >
        Note
      </div>
    </div>
  );
};

export default Note;
