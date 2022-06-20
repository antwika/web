import { User } from "../redux/features/auth/authSlice";

export const parseUser = (accessToken: string): User => {
  const payload = accessToken.split('.')[1];
  const decoded = Buffer.from(payload, 'base64').toString('utf8');
  const { sub, email, firstName, lastName } = JSON.parse(decoded);
  return {
    id: sub,
    email: email,
    firstName: firstName,
    lastName: lastName,
  };
}
