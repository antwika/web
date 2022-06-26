import { useIntl } from "react-intl";
import { generateAuthUrl } from "../misc/oidc";
import Button from "./ui/Button";
import { useRouter } from "next/router";
import { baseUrl, idpUrl, clientId } from "../misc/config";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/features/auth/authSlice";
import Paper from "./ui/Paper";

type Props = {
  onError: (err: unknown) => void,
};

const LoginForm: React.FC<Props> = ({ onError }) => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(setAuth({ status: 'loggingIn', accessToken: undefined, user: null }));
      await router.push(await generateAuthUrl(fetch, baseUrl(), idpUrl(), intl.locale, clientId()));
    } catch (err) {
      console.error('Failed to navigate to auth url. Error:', err);
      onError(err);
    }
  }

  return (
    <>
      <div data-testid='login-form'>
        <Paper>
          <Button preset="large" onClick={() => onSubmit()}>{intl.formatMessage({ id: 'log_in' })}</Button>
        </Paper>
      </div>
    </>
  );
}

export default LoginForm;
