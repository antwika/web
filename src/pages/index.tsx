import type { NextPage } from 'next'
import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import LoginForm from '../components/LoginForm'
import Logotype from '../components/Logotype'
import ThemeList from '../components/ThemeList'
import UserDetails from '../components/UserDetails'
import { ThemeContext } from '../context/ThemeContext'
import { RootState } from '../redux/store'

const Index: NextPage = () => {
  const { theme } = useContext(ThemeContext);
  const auth = useSelector((state: RootState) => state.auth);
  const intl = useIntl();

  return (
    <>
      <Logotype size={128} />
      <h1 style={{ color: theme.neutral[50].fg }}>
        {intl.formatMessage({ id: 'welcome_to' }, { name: 'Antwika' })}
      </h1>
      {auth.user && <UserDetails />}
      {!auth.user && (
        <>
          <LoginForm onError={(err) => console.log('Login failure:', err) }/>
          <div style={{
            padding: '16px',
            lineHeight: 1.5,
            color: theme.neutral[50].fg,
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
          <ThemeList />
        </>
      )}
    </>
  )
}

export default Index;
