import type { NextPage } from 'next'
import { useIntl } from 'react-intl';
import Logotype from '../components/Logotype';
import UserDetails from '../components/UserDetails';

const Home: NextPage = () => {
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

export default Home;
