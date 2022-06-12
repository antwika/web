import { sha256, base64urlencode, generateDPoPKeyPair, generateDPoPProof } from '../../../src/misc/oidc';

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
});
