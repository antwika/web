export const BASE_URL = 'http://localhost:3000'; // TODO: Fetch from react app params
export const IDP_URL = process.env.NEXT_PUBLIC_IDP_URL || 'https://antwika-auth-api.herokuapp.com';
export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || false;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || false;
export const RESPONSE_TYPE = 'code'; // TODO: Fetch from react app params
export const SCOPE = 'openid'; // TODO: Fetch from react app params
