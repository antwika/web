import { useIntl } from "react-intl";
import { generateAuthUrl } from "../misc/oidc";
import Button from "./ui/Button";
import styles from './LoginForm.module.css'
import { useRouter } from "next/router";
import { BASE_URL, IDP_URL } from "../misc/config";

const LoginForm = () => {
  const router = useRouter();
  const intl = useIntl();

  const onSubmit = async () => {
    try {
      router.push(await generateAuthUrl(fetch, BASE_URL, IDP_URL, intl.locale));
    } catch (err) {
      console.error('Failed to navigate to auth url. Error:', err);
    }
  }

  return (
    <>
      <div className={styles.loginGridContainer}>
        <Button preset="large" type="submit" onClick={onSubmit}>{intl.formatMessage({ id: 'log_in' })}</Button>
      </div>
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
  );
}

export default LoginForm;
