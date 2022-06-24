import { useRouter } from "next/router";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseUser } from "../misc/auth";
import { doLogout, setAuth } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";
import { trpc } from "../utils/trpc";

const AuthContext = React.createContext({})

type Props = {
  children: any;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const [accessToken, setAccessToken] = useState<string>('');
  
  const { data } = trpc.useQuery(['verifyToken', { accessToken }], {
    enabled: accessToken !== '',
  });

  useEffect(() => {
    const item = localStorage.getItem('accessToken');
    if (!item) return;
    const token = JSON.parse(item) as string;
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (accessToken === '') return;

    console.log('accessToken:', accessToken);
    if (data) {
      if (data.valid) {
        const user = parseUser(accessToken);
        dispatch(setAuth({ status: 'loggedIn', accessToken, user }));
      } else {
        dispatch<any>(doLogout());
      }
    }
  }, [accessToken, data]);

  useEffect(() => {
    if (auth?.status === 'loggedOut') {
      if (router?.asPath !== '/') {
        console.log('Is logged out, redirecting to index');
        router.replace(`/`);
      }
    }
  }, [auth.status]);

  return (
    <AuthContext.Provider data-testid='auth-context' value={false}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
