import { useContext } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import { RootState } from "../redux/store";
import styles from './UserDetails.module.css';

const UserDetails = () => {
  const { theme } = useContext(ThemeContext);
  const auth = useSelector((state: RootState) => state.auth);
  const intl = useIntl();
  
  return (
    <div data-testid='user-details' className={styles.container} style={{ backgroundColor: theme.primary[10], color: theme.primary[100] }}>
      <div style={{ padding: 16, paddingTop: 0 }}>
        <h1>
          {intl.formatMessage({ id: 'welcome' })}
        </h1>
        <div>
          {intl.formatMessage({ id: 'nickname' })}: <strong>{ auth.user?.id }</strong>
        </div>
        <div>
          {intl.formatMessage({ id: 'first_name' })}: <strong>{ auth.user?.firstName }</strong>
        </div>
        <div>
          {intl.formatMessage({ id: 'last_name' })}: <strong>{ auth.user?.lastName }</strong>
        </div>
        <div>
          {intl.formatMessage({ id: 'email' })}: <strong>{ auth.user?.email }</strong>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
