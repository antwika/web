export const baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const idpUrl = () => process.env.NEXT_PUBLIC_IDP_URL || 'http://localhost:4000';
export const clientId = () => process.env.NEXT_PUBLIC_CLIENT_ID || undefined;
export const clientSecret = () => process.env.REACT_APP_CLIENT_SECRET || undefined;
export const responseType = () => 'code'; // TODO: Fetch from react app params
export const scope = () => 'openid'; // TODO: Fetch from react app params
