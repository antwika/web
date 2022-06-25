import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { parseUser } from '../../misc/auth';
import { setAuth } from '../../redux/features/auth/authSlice';
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
    if (!item) return;
    const verifier = JSON.parse(item);
    setCodeVerifier(verifier);
    localStorage.removeItem('codeVerifier');
  }, []);
  
  useEffect(() => {
    if (!router) return;
    const { code: codeParam } = router.query;
    if (!codeParam) return;
    if (Array.isArray(codeParam)) throw new Error('Unexpected array type in "code" query parameter');
    setCode(codeParam);
  }, [router?.query]);
  
  useEffect(() => {
    setLocale(intl.locale);
  }, [intl.locale]);

  const { data } = trpc.useQuery(['requestToken', { locale, code, codeVerifier }], {
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
