import type { NextPage } from 'next'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import LoginForm from '../components/LoginForm'
import Logotype from '../components/Logotype'
import UserDetails from '../components/UserDetails'
import { RootState } from '../redux/store'

const Index: NextPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const intl = useIntl();

  return (
    <>
      <div>
        <Logotype />
      </div>
      <h1>
        {intl.formatMessage({ id: 'welcome_to' }, { name: 'Antwika' })}
      </h1>
      {auth.user && <UserDetails />}
      {!auth.user && <LoginForm />}
    </>
  )
}

export default Index;
