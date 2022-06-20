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
      {!auth.user && (
        <>
          <LoginForm onError={(err) => console.log('Login failure:', err) }/>
          <div style={{
            padding: '16px',
            lineHeight: 1.5,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <a href="https://github.com/antwika/">
                <i>
                  https://github.com/antwika/
                </i>
              </a>
            </div>
            <div>
              <a href="https://sonarcloud.io/organizations/antwika/">
                <i>
                  https://sonarcloud.io/organizations/antwika/
                </i>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Index;
