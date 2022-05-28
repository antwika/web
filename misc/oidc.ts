import { BASE_URL, CLIENT_ID, CLIENT_SECRET, IDP_URL, RESPONSE_TYPE, SCOPE } from "./config";
import { exportJWK, generateKeyPair, importJWK, JWK, jwtVerify, KeyLike, SignJWT } from "jose";
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

const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64urlencode = (a: ArrayBuffer) => {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const generateCodeChallengeFromVerifier = async (codeVerifier: string) => {
  var hashed = await sha256(codeVerifier);
  var base64encoded = base64urlencode(hashed);
  return base64encoded;
};

export const generateCodeVerifier = () => {
  var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join("");
}

export const generateRedirectUri = (locale: string) => `${BASE_URL}/${locale}/oidc/cb`;

export const generateAuthUrl = async (locale: string) => {
  const codeVerifier = generateCodeVerifier();
  localStorage.setItem('codeVerifier', JSON.stringify(codeVerifier));
  const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);

  const { authorization_endpoint: authorizationEndpoint } = await requestOidcConfiguration();

  if (!CLIENT_ID) {
    throw new Error('Can not generate auth url because CLIENT_ID is not defined');
  }

  const url = new URL(authorizationEndpoint, IDP_URL);
  const searchParams = new URLSearchParams({
    audience: 'web',
    client_id: CLIENT_ID,
    response_type: RESPONSE_TYPE,
    scope: SCOPE,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    redirect_uri: generateRedirectUri(locale),
  });
  return `${url.toString()}?${searchParams.toString()}`;
}

export const authFetch = async (dpopKeyPair: DPoPKeyPair, url: string, method: string, body?: string) => {
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

export const requestOidcConfiguration = async () => {
  const dpopKeyPair = await generateDPoPKeyPair();
  const response = await authFetch(dpopKeyPair, `${IDP_URL}/.well-known/openid-configuration`, 'GET');
  return response.json();
}

export const requestToken = async (code: string, codeVerifier: string, locale: string) => {
  try {
    const { token_endpoint: tokenEndpoint } = await requestOidcConfiguration();

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

    const response = await authFetch(dpopKeyPair, tokenEndpoint, 'POST', searchParams.toString());
    const body = await response.json();
    return body;
  } catch (err) {
    console.log('Failed to fetch token, error:', err);
    return false;
  }
}

export const verifyToken = async (accessToken: string) => {
  try {
    const dpopKeyPair = await generateDPoPKeyPair();

    const { jwks_uri: jwksUri } = await requestOidcConfiguration();

    const response = await authFetch(dpopKeyPair, jwksUri, 'GET');
    const json = await response.json();
    const { keys } = json;

    const promises = keys.map(async (key: any) => {
      try {
        const jwk = await importJWK(key);
        await jwtVerify(accessToken, jwk, {
          issuer: 'http://localhost:3000/oidc',
          audience: 'web'
        });
        return true;
      } catch (err) {
        return false;
      }
    });
    const isValid = await Promise.any(promises);

    return isValid;
  } catch (err) {
    console.log('Failed to verify token, error:', err);
    return false;
  }
}
