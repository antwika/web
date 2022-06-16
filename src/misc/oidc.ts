import {
  baseUrl,
  responseType,
  scope,
} from './config';
import {
  exportJWK,
  generateKeyPair,
  importJWK,
  JWK,
  jwtVerify,
  KeyLike,
  SignJWT,
} from 'jose';
import { v4 as uuid } from 'uuid';

export type DPoPKeyPair = {
  privateKey: KeyLike,
  publicKey: JWK,
}

export const generateDPoPKeyPair = async (): Promise<DPoPKeyPair> => {
  const { privateKey, publicKey } = await generateKeyPair('ES256', { crv: 'P-256' });
  const dpopKeyPair = {
    privateKey,
    publicKey: await exportJWK(publicKey),
  };
  dpopKeyPair.publicKey.alg = 'ES256';
  return dpopKeyPair;
}

export const generateDPoPProof = async (dpopKeyPair: DPoPKeyPair, method: string, url: string) => {
  return new SignJWT({
    htm: method,
    htu: url,
  }).setProtectedHeader({
    typ: 'dpop+jwt',
    alg: 'ES256',
    jwk: dpopKeyPair.publicKey,
  }).setIssuedAt().setJti(uuid()).sign(dpopKeyPair.privateKey);
}

export const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

export const base64urlencode = (a: ArrayBuffer) => {
  const str = new Uint8Array(a).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return Buffer.from(str, 'binary').toString('base64')
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=$/g, "");
};

export const generateCodeChallengeFromVerifier = async (codeVerifier: string) => {
  const hashed = await sha256(codeVerifier);
  return base64urlencode(hashed);
};

export const generateCodeVerifier = () => {
  const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join("");
}

export const generateRedirectUri = (baseUrl: string, locale?: string) => {
  let uri = baseUrl;
  if (locale !== undefined && locale.length > 0) uri += `/${locale}`;
  return `${uri}/oidc/cb`;
}

export const generateAuthUrl = async (fetch: any, baseUrl: string, idpUrl: string, locale: string, clientId?: string) => {
  const codeVerifier = generateCodeVerifier();
  localStorage.setItem('codeVerifier', JSON.stringify(codeVerifier));
  const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);

  const { authorization_endpoint: authorizationEndpoint } = await requestOidcConfiguration(fetch, idpUrl);

  if (!clientId) {
    throw new Error('Can not generate auth url because client id is not defined');
  }

  const url = new URL(authorizationEndpoint, idpUrl);
  const searchParams = new URLSearchParams({
    audience: 'web',
    client_id: clientId,
    response_type: responseType(),
    scope: scope(),
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    redirect_uri: generateRedirectUri(baseUrl, locale),
  });
  return `${url.toString()}?${searchParams.toString()}`;
}

export const authFetch = async (fetch: any, dpopKeyPair: DPoPKeyPair, url: string, method: string, body?: string) => {
  const dpopProof = await generateDPoPProof(dpopKeyPair, method, url);
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'DPoP': dpopProof,
    },
    body: body,
  });
}

export const requestOidcConfiguration = async (fetch: any, idpUrl: string) => {
  const dpopKeyPair = await generateDPoPKeyPair();
  const response = await authFetch(fetch, dpopKeyPair, `${idpUrl}/.well-known/openid-configuration`, 'GET');
  return response.json();
}

export const requestToken = async (fetch: any, idpUrl: string, code: string, codeVerifier: string, locale: string, clientId?: string, clientSecret?: string) => {
  try {
    const { token_endpoint: tokenEndpoint } = await requestOidcConfiguration(fetch, idpUrl);

    if (!clientId) {
      console.error('Can not request token because clientId is not defined');
      throw new Error('Can not request token because clientId is not defined');
    }

    if (!clientSecret) {
      console.error('Can not request token because clientSecret is not defined');
      throw new Error('Can not request token because clientSecret is not defined');
    }

    const dpopKeyPair = await generateDPoPKeyPair();
    const searchParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      code_verifier: codeVerifier,
      redirect_uri: generateRedirectUri(baseUrl(), locale),
    });

    const response = await authFetch(fetch, dpopKeyPair, tokenEndpoint, 'POST', searchParams.toString());
    return response.json();
  } catch (err) {
    console.log('Failed to fetch token, error:', err);
    return false;
  }
}

export const verifyToken = async (fetch: any, idpUrl: string, accessToken: string) => {
  try {
    const dpopKeyPair = await generateDPoPKeyPair();

    const { jwks_uri: jwksUri } = await requestOidcConfiguration(fetch, idpUrl);

    const response = await authFetch(fetch, dpopKeyPair, jwksUri, 'GET');
    const json = await response.json();
    const { keys } = json;

    const promises = keys.map(async (key: any) => {
      try {
        const jwk = await importJWK(key);
        await jwtVerify(accessToken, jwk, {
          issuer: `${idpUrl}/oidc`,
          audience: 'web'
        });
        return true;
      } catch (err) {
        return false;
      }
    });
    return Promise.any(promises);
  } catch (err) {
    console.log('Failed to verify token, error:', err);
    return false;
  }
}
