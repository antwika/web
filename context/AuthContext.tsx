import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";

const AuthContext = React.createContext({})

type Props = {
  children: any;
}

const parseUser = (accessToken: string) => {
  const payload = accessToken.split('.')[1];
  const decoded = Buffer.from(payload, 'base64').toString('utf8');
  const parsed = JSON.parse(decoded);
  return parsed;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    let accessToken = auth.accessToken;
    const accessTokenItem = localStorage.getItem('accessToken');
    if (!accessToken) {
      if (accessTokenItem) {
        accessToken = JSON.parse(accessTokenItem);
      }
    }

    let user = null;
    if (accessToken) {
      user = parseUser(accessToken);
    }

    if (!user) {
      if (accessTokenItem) {
        console.log('Clearing access token from storage');
        localStorage.removeItem('accessToken');
      }
      
      if (router.asPath !== '/') {
        console.log('Redirecting to index');
        router.replace(`/`);
      }
      return;
    }

    dispatch(setAuth({
      accessToken,
      user: {
        id: user.sub,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }));
  }, [auth.accessToken]);

  return (
    <AuthContext.Provider value={false}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
