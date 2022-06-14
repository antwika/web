import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";
import Button from "./ui/Button";
import styles from './UserDetails.module.css';

const UserDetails = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const intl = useIntl();
  const dispatch = useDispatch();
  
  const logOut = () => {
    dispatch<any>(doLogout());
  }

  return (
    <div data-cy='user-details' className={styles.container}>
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
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
          <div>
            <Button preset="medium" type="submit" onClick={() => logOut()}>{intl.formatMessage({ id: 'log_out' })}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
