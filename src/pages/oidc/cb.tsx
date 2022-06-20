import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { handleAccessToken } from '../../redux/features/auth/authSlice';

const Cb: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const item = localStorage.getItem('codeVerifier')
        if (!item) throw new Error('Expected codeVerifier in localStorage, but none was found');
        const codeVerifier = JSON.parse(item);

        const { code } = router.query;
        if (!code) return;
        if (Array.isArray(code)) throw new Error('Unexpected array type in "code" query parameter');

        const response = await fetch(`/api/token`, {
          method: 'POST',
          body: JSON.stringify({
            locale: intl.locale,
            code: code,
            codeVerifier: codeVerifier,
          }),
        });
        const json = await response.json();
        const { access_token: accessToken } = json;
        if (!accessToken) throw new Error('Expected "accessToken" to be defined, but it is not');

        localStorage.removeItem('codeVerifier');
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        dispatch<any>(handleAccessToken(accessToken));
        router.replace('/home');
      } catch (err) {
        console.error('Failed to handle callback. Error:', err);
      }
    })();
  }, [router.query]);

  return (
    <>
    </>
  );
}

export default Cb;
