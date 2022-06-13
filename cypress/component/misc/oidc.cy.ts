import { CLIENT_ID, CLIENT_SECRET, IDP_URL } from '../../../src/misc/config';
import {
  sha256,
  base64urlencode,
  generateDPoPKeyPair,
  generateDPoPProof,
  generateCodeVerifier,
  generateCodeChallengeFromVerifier,
  generateRedirectUri,
  generateAuthUrl,
  requestOidcConfiguration,
  authFetch,
  requestToken,
} from '../../../src/misc/oidc';

describe('Oidc', () => {
  it('can generate a DPoP proof', async () => {
    const keyPair = await generateDPoPKeyPair();
    expect(keyPair.privateKey).to.exist;
    expect(keyPair.publicKey).to.exist;
    expect(keyPair.publicKey.alg).to.equal('ES256');

    const proof = await generateDPoPProof(keyPair, 'POST', 'https://example.com/test');
    expect(proof).to.exist;
    expect(proof.split('.')).to.have.length(3);
  });

  it('can generate base64 url encoded sha256 hash', async () => {
    const base64UrlEncodedHash = base64urlencode(await sha256('foo'));
    expect(base64UrlEncodedHash).to.equal('LCa0a2j_xo_5m0U8HTBBNBNCLXBkg7-g-YpeiGJm564');
  });

  it('can generate unique code verifiers', () => {
    const codeVerifier = generateCodeVerifier();
    expect(typeof codeVerifier).to.equal('string');
    expect(codeVerifier).to.have.length(56);
    
    const codeVerifier2 = generateCodeVerifier();
    expect(codeVerifier2).to.not.be.equal(codeVerifier);
  });

  it('can deterministically generate a code challenge from code verifier', async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
    expect(typeof codeChallenge).to.equal('string');
    expect(codeChallenge).to.have.length(43);
    
    const codeChallenge2 = await generateCodeChallengeFromVerifier(codeVerifier);
    expect(codeChallenge2).to.be.equal(codeChallenge);
  });

  it('can generate a redirect uri', () => {
    expect(generateRedirectUri('http://hello.world', undefined)).to.equal('http://hello.world/oidc/cb');
    expect(generateRedirectUri('http://hello.world', '')).to.equal('http://hello.world/oidc/cb');
    expect(generateRedirectUri('https://hello.world', undefined)).to.equal('https://hello.world/oidc/cb');
    expect(generateRedirectUri('https://hello.world', '')).to.equal('https://hello.world/oidc/cb');
    expect(generateRedirectUri('https://foo.bar', 'en-US')).to.equal('https://foo.bar/en-US/oidc/cb');
    expect(generateRedirectUri('https://example.com', 'sv-SE')).to.equal('https://example.com/sv-SE/oidc/cb');
  });

  it('can generate an auth url', async () => {
    const mockFetch = () => ({
      json: async () => ({
        authorization_endpoint: '/auth',
      })
    });
    const authUrl = await generateAuthUrl(mockFetch, 'https://this.example.com', 'https://idp.example.com', 'sv-SE', 'test-client-id');
    expect(authUrl.startsWith('https://idp.example.com/auth?audience=web&client_id=test-client-id&response_type=code&scope=openid&code_challenge=')).to.be.true;
    expect(authUrl.endsWith('&code_challenge_method=S256&redirect_uri=https%3A%2F%2Fthis.example.com%2Fsv-SE%2Foidc%2Fcb')).to.be.true;
  });

  it('throws if client id is missing when trying to generate an auth url', async () => {
    const mockFetch = () => ({
      json: async () => ({
        authorization_endpoint: '/auth',
      })
    });
    try {
      await generateAuthUrl(mockFetch, 'https://this.example.com', 'https://idp.example.com', 'sv-SE', undefined)
      expect.fail("Should have thrown an error");
    } catch (err: any) {
      expect(err.message).to.equal('Can not generate auth url because client id is not defined');
    }
  });

  it('can perform an authenticated fetch', async () => {
    const mockFetch = () => ({
      json: async () => ({ foo: 'bar' }),
    });
    const response = await authFetch(mockFetch, await generateDPoPKeyPair(), 'http://example.com/test', 'POST');
    expect(await response.json()).to.deep.equal({ foo: 'bar' });
  });

  it('can request oidc configuration from identity provider', async () => {
    const mockFetch = () => ({
      json: async () => ({ foo: 'bar' }),
    });
    const result = await requestOidcConfiguration(mockFetch, IDP_URL);
    expect(result).to.deep.equal({ foo: 'bar' });
  });

  it('fails to request token if client id is undefined', async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
    // TODO: Utilize something like jest mockImplementationOnce or a function generator(?)
    // to generate different responses from the sequentially called mock function.
    const mockFetch = () => ({
      json: async () => ({
        token_endpoint: '/token', // TODO: This should happen the first time the mockFetch function is called.
        access_token: 'example.access.token' // TODO: This should happen the second time the mockFetch function is called.
      })
    });
    const result = await requestToken(mockFetch, 'https://idp.example.com', codeChallenge, codeVerifier, 'sv-SE', undefined, 'test-client-secret');
    expect(result).to.equal(false);
  });

  it('fails to request token if client secret is undefined', async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
    // TODO: Utilize something like jest mockImplementationOnce or a function generator(?)
    // to generate different responses from the sequentially called mock function.
    const mockFetch = () => ({
      json: async () => ({
        token_endpoint: '/token', // TODO: This should happen the first time the mockFetch function is called.
        access_token: 'example.access.token' // TODO: This should happen the second time the mockFetch function is called.
      })
    });
    const result = await requestToken(mockFetch, 'https://idp.example.com', codeChallenge, codeVerifier, 'sv-SE', 'test-client-id', undefined);
    expect(result).to.equal(false);
  });

  it('can request a token', async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
    // TODO: Utilize something like jest mockImplementationOnce or a function generator(?)
    // to generate different responses from the sequentially called mock function.
    const mockFetch = () => ({
      json: async () => ({
        token_endpoint: '/token', // TODO: This should happen the first time the mockFetch function is called.
        access_token: 'example.access.token' // TODO: This should happen the second time the mockFetch function is called.
      })
    });
    const { access_token } = await requestToken(mockFetch, 'https://idp.example.com', codeChallenge, codeVerifier, 'sv-SE', 'test-client-id', 'test-client-secret');
    expect(access_token).to.deep.equal('example.access.token');
  });
});
