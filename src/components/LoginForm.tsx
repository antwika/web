import { useIntl } from "react-intl";
import { generateAuthUrl } from "../misc/oidc";
import Button from "./ui/Button";
import styles from './LoginForm.module.css'
import { useRouter } from "next/router";
import { baseUrl, idpUrl, clientId } from "../misc/config";

type Props = {
  onError: (err: unknown) => void,
};

const LoginForm: React.FC<Props> = ({ onError }) => {
  const router = useRouter();
  const intl = useIntl();

  const onSubmit = async () => {
    try {
      await router.push(await generateAuthUrl(fetch, baseUrl(), idpUrl(), intl.locale, clientId()));
    } catch (err) {
      console.error('Failed to navigate to auth url. Error:', err);
      onError(err);
    }
  }

  return (
    <>
      <div data-testid='login-form' className={styles.loginGridContainer}>
        <Button preset="large" type="submit" onClick={() => onSubmit()}>{intl.formatMessage({ id: 'log_in' })}</Button>
      </div>
    </>
  );
}

export default LoginForm;
