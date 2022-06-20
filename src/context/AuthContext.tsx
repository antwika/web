import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAccessToken } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";

const AuthContext = React.createContext({})

type Props = {
  children: any;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    const item = localStorage.getItem('accessToken');
    if (!item) return;
    const accessToken = JSON.parse(item);
    dispatch<any>(handleAccessToken(accessToken));
  }, []);

  useEffect(() => {
    if (!router) return;
    if (!auth) return;

    if (auth.status === 'loggedOut') {
      if (router.asPath !== '/') {
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
