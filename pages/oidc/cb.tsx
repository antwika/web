import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { CLIENT_ID, CLIENT_SECRET, TOKEN_URL } from '../../misc/config';
import { generateCodeVerifier, generateRedirectUri } from '../../misc/oidc';
import { setUser } from '../../redux/features/auth/authSlice';
import { RootState } from '../../redux/store';

const CbPage: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!intl) return;
    if (!router) return;
    if (!user) return;
    router.push('/home');
  }, [intl, router, user]);

  useEffect(() => {
    if (!dispatch) return;
    if (!router) return;

    const { code } = router.query;
    if (!code) {
      // TODO: Dispatch an error message?
      return;
    }

    const item = localStorage.getItem('codeVerifier');
    if (!item) {
      // TODO: Dispatch an error message?
      return;
    }

    const codeVerifier = JSON.parse(item);

    const body = `grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&code_verifier=${codeVerifier}&redirect_uri=${generateRedirectUri(intl.locale)}`;

    fetch(TOKEN_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body,
    }).then(response => {
      return response.json();
    }).then((json) => {
      const { access_token: accessToken } = json;
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      dispatch(setUser({ id: 'User', accessToken }));
    }).catch(err => {
      console.log('error:', err);
    })
  }, [router, intl, dispatch]);

  return (
    <>
    </>
  );
}

export default CbPage;
