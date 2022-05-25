import type { NextPage } from 'next'
import Logotype from '../components/Logotype';
import styles from './home.module.css';
import UserDetails from '../components/UserDetails';
import { useIntl } from 'react-intl';

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
