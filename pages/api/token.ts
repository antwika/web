import { CLIENT_ID, CLIENT_SECRET, TOKEN_URL } from "../../misc/config";
import { authFetch, generateDPoPKeyPair, generateRedirectUri } from "../../misc/oidc";

export default async function handler(req: any, res: any) {
  const body = JSON.parse(req.body);
  const { locale, code, codeVerifier } = body;

  if (!CLIENT_ID) {
    console.error('Can not request token because CLIENT_ID is not defined');
    return;
  }

  if (!CLIENT_SECRET) {
    console.error('Can not request token because CLIENT_SECRET is not defined');
    return;
  }

  const dpopKeyPair = await generateDPoPKeyPair();
  const searchParams = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    code_verifier: codeVerifier,
    redirect_uri: generateRedirectUri(locale),
  });

  try {
    const response = await authFetch(dpopKeyPair, TOKEN_URL, 'POST', searchParams.toString());
    const json = await response.json();
    res.json(json);
  } catch (err) {
    console.log('Failed to fetch token, error:', err);
  }
}
