import { AUTH_ENDPOINT, BASE_URL, CLIENT_ID, IDP_URL, RESPONSE_TYPE, SCOPE } from "./config";
import { exportJWK, generateKeyPair, JWK, KeyLike, SignJWT } from "jose";
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

export const generateAuthUrl = (locale: string, codeChallenge: string) => {
  if (!CLIENT_ID) {
    console.error('Can not generate auth url because CLIENT_ID is not defined');
    return;
  }

  const url = new URL(AUTH_ENDPOINT, IDP_URL);
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
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'DPoP': dpopProof,
    },
    body: body,
  });
}
