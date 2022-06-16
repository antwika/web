import { idpUrl } from "../../misc/config";
import { verifyToken } from "../../misc/oidc";

const Verify = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.body);
    const { accessToken } = body;

    const isValid = await verifyToken(fetch, idpUrl(), accessToken);

    res.json({
      valid: isValid,
    });
  } catch (err) {
    console.log('Failed to verify token, error:', err);
    res.status(500).end('Internal server error');
  }
}

export default Verify;
