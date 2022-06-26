import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from './ActivityIndicator.module.css';

const ActivityIndicator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div data-testid='activity-indicator' className={styles.activityIndicator} style={{ backgroundColor: theme.neutral[300].bg }}></div>
  );
}

export default ActivityIndicator;
