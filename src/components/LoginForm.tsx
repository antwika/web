import { useIntl } from "react-intl";
import { generateAuthUrl } from "../misc/oidc";
import Button from "./ui/Button";
import styles from './LoginForm.module.css'
import { useRouter } from "next/router";
import { baseUrl, idpUrl, clientId } from "../misc/config";

const LoginForm = () => {
  const router = useRouter();
  const intl = useIntl();

  const onSubmit = async () => {
    try {
      router.push(await generateAuthUrl(fetch, baseUrl(), idpUrl(), intl.locale, clientId()));
    } catch (err) {
      console.error('Failed to navigate to auth url. Error:', err);
    }
  }

  return (
    <>
      <div data-cy='login-form' className={styles.loginGridContainer}>
        <Button preset="large" type="submit" onClick={onSubmit}>{intl.formatMessage({ id: 'log_in' })}</Button>
      </div>
    </>
  );
}

export default LoginForm;
