import type { NextPage } from 'next'
import { useIntl } from 'react-intl';
import Logotype from '../components/Logotype';
import UserDetails from '../components/UserDetails';
import styles from './home.module.css';

const HomePage: NextPage = () => {
  const intl = useIntl();

  return (
    <>
      <div>
        <Logotype />
      </div>
      <h1>
        {intl.formatMessage({ id: 'welcome_to' }, { name: 'Antwika Home' })}
      </h1>
      <UserDetails />
    </>
  )
}

export default HomePage;
