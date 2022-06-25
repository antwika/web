import type { NextPage } from 'next'
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import Logotype from '../components/Logotype';
import Button from '../components/ui/Button';
import UserDetails from '../components/UserDetails';
import { ThemeContext } from '../context/ThemeContext';
import { doLogout } from '../redux/features/auth/authSlice';

const Home: NextPage = () => {
  const { theme } = useContext(ThemeContext);
  const intl = useIntl();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch<any>(doLogout());
  }

  return (
    <>
      <h1 style={{ color: theme.primary[100]}}>
        {intl.formatMessage({ id: 'welcome_to' }, { name: 'Antwika Home' })}
      </h1>
      <UserDetails />
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
        <Button preset="medium" type="submit" onClick={() => logOut()}>{intl.formatMessage({ id: 'log_out' })}</Button>
      </div>
    </>
  )
}

export default Home;
