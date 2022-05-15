import { AUTH_ENDPOINT, BASE_URL, CLIENT_ID, IDP_URL, RESPONSE_TYPE, SCOPE } from "./config";

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
  const url = new URL(AUTH_ENDPOINT, IDP_URL);
  const searchParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: RESPONSE_TYPE,
    scope: SCOPE,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    redirect_uri: generateRedirectUri(locale),
  });
  return `${url.toString()}?${searchParams.toString()}`;
}
