import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { parseUser } from '../../misc/auth';
import { handleAccessToken, setAuth } from '../../redux/features/auth/authSlice';
import { trpc } from '../../utils/trpc';

const Cb: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

  const [locale, setLocale] = useState('');
  const [code, setCode] = useState('');
  const [codeVerifier, setCodeVerifier] = useState('');

  useEffect(() => {
    const item = localStorage.getItem('codeVerifier')
    if (!item) return; // throw new Error('Expected codeVerifier in localStorage, but none was found');
    const codeVerifier = JSON.parse(item);
    setCodeVerifier(codeVerifier);
    localStorage.removeItem('codeVerifier');
  }, []);
  
  useEffect(() => {
    if (!router) return;
    const { code } = router.query;
    if (!code) return;
    if (Array.isArray(code)) throw new Error('Unexpected array type in "code" query parameter');
    setCode(code);
  }, [router.query]);
  
  useEffect(() => {
    if (!intl) return;
    if (!intl.locale) return;
    setLocale(intl.locale);
  }, [intl.locale]);

  const { isIdle, data, isLoading } = trpc.useQuery(['requestToken', { locale, code, codeVerifier }], {
    enabled: locale !== '' && code !== '' && codeVerifier !== '',
  });

  useEffect(() => {
    if (!data) return;
    const { token } = data;
    if (!token) return;
    
    const accessToken = token as string;
    console.log('accessToken', accessToken);

    localStorage.setItem('accessToken', JSON.stringify(accessToken));
    const user = parseUser(accessToken);
    dispatch(setAuth({ status: 'loggedIn', accessToken, user }));
    router.replace('/home');
  }, [data]);

  return (
    <>
    </>
  );
}

export default Cb;
