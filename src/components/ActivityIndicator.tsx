import styles from './ActivityIndicator.module.css';

const ActivityIndicator = () => {
  return (
    <div data-testid='activity-indicator' className={styles.activityIndicator}></div>
  );
}

export default ActivityIndicator;
