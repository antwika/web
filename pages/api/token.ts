import { requestToken } from "../../misc/oidc";

const TokenHandler = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.body);
    const { locale, code, codeVerifier } = body;

    const token = await requestToken(code, codeVerifier, locale);
    if (!token) {
      throw new Error('Failed to obtain token from IDP');
    }

    res.json(token);
  } catch (err) {
    console.log('Failed to fetch token, error:', err);
    res.status(500).end('Internal server error');
  }
}

export default TokenHandler;
