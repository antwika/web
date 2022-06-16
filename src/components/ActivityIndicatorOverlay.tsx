import ActivityIndicator from './ActivityIndicator';
import styles from './ActivityIndicatorOverlay.module.css';

const ActivityIndicatorOverlay = () => {
  return (
  <div data-testid='activity-indicator-overlay' className={styles.container}>
    <ActivityIndicator />
  </div>
  );
}

export default ActivityIndicatorOverlay;
