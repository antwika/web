import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { generateAuthUrl, generateCodeChallengeFromVerifier, generateCodeVerifier } from "../misc/oidc";
import Button from "./ui/Button";
import styles from './LoginForm.module.css'
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const intl = useIntl();
  const [codeVerifier, setCodeVerifier] = useState<string | null>(null);

  const onSubmit = async () => {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('codeVerifier', JSON.stringify(codeVerifier));
    setCodeVerifier(codeVerifier);
  }

  useEffect(() => {
    if (!codeVerifier) return;
    
    const redirectToAuthUrl = async () => {
      const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
      const authUrl = generateAuthUrl(intl.locale, codeChallenge);
      if (!authUrl) {
        console.log('Failed to generate an auth url');
        return;
      }
      router.push(authUrl);
    }

    redirectToAuthUrl();
  }, [router, intl, codeVerifier]);

  return (
    <>
      <div className={styles.loginGridContainer}>
        <Button type="submit" label={`${intl.formatMessage({ id: 'log_in' })}`} onClick={onSubmit} />
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
