import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ActivityIndicator from './ActivityIndicator';
import styles from './ActivityIndicatorOverlay.module.css';

const ActivityIndicatorOverlay = () => {
  const { theme } = useContext(ThemeContext);
  return (
  <div data-testid='activity-indicator-overlay' className={styles.container} style={{ backgroundColor: theme.neutral[300] }}>
    <ActivityIndicator />
  </div>
  );
}

export default ActivityIndicatorOverlay;
