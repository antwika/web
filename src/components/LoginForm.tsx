import { useIntl } from "react-intl";
import { generateAuthUrl } from "../misc/oidc";
import Button from "./ui/Button";
import styles from './LoginForm.module.css'
import { useRouter } from "next/router";
import { BASE_URL, CLIENT_ID, IDP_URL } from "../misc/config";

const LoginForm = () => {
  const router = useRouter();
  const intl = useIntl();

  const onSubmit = async () => {
    try {
      router.push(await generateAuthUrl(fetch, BASE_URL, IDP_URL, intl.locale, CLIENT_ID));
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
