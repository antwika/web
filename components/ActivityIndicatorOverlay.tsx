import ActivityIndicator from './ActivityIndicator';
import styles from './ActivityIndicatorOverlay.module.css';

const ActivityIndicatorOverlay = () => {
  return (
  <div className={styles.container}>
    <ActivityIndicator />
  </div>
  );
}

export default ActivityIndicatorOverlay;
