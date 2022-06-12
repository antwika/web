import {
  sha256,
  base64urlencode,
  generateDPoPKeyPair,
  generateDPoPProof,
  generateCodeVerifier,
  generateCodeChallengeFromVerifier,
  generateRedirectUri,
  requestOidcConfiguration,
  authFetch,
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
    const result = await requestOidcConfiguration(mockFetch, 'http://idp.example.com');
    expect(result).to.deep.equal({ foo: 'bar' });
  });
});
