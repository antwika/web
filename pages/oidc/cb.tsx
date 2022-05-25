import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/features/auth/authSlice';
import { RootState } from '../../redux/store';

const CbPage: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dispatch) return;

    const codeVerifierItem = localStorage.getItem('codeVerifier');
    if (!codeVerifierItem) return;
    const codeVerifier = JSON.parse(codeVerifierItem);

    const { code } = router.query;
    if (!code) return;
    if (Array.isArray(code)) {
      console.error('Did not expect the authorization code to be of type "string[]", expected type "string".');
      return;
    }
    const requestToken = async () => {
      const response = await fetch(`/api/token`, {
        method: 'POST',
        body: JSON.stringify({
          locale: intl.locale,
          code: code,
          codeVerifier: codeVerifier,
        }),
      });
      const body = await response.json();
      const { access_token: accessToken } = body;
      localStorage.removeItem('codeVerifier');
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      dispatch(setAuth({ accessToken, user: null }));
    };

    requestToken();
  }, [router]);

  useEffect(() => {
    if (!auth.user) return;
    router.replace('/'); // TODO: Or retention url
  }, [auth.user]);

  return (
    <>
    </>
  );
}

export default CbPage;
