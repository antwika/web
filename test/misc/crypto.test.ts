import { getCrypto } from '../../src/misc/crypto';

describe('crypto', () => {
  it('returns window.crypto', () => {
    const crypto = getCrypto();
    expect(crypto).toBeDefined();
  });

  it('returns crypto', () => {
    window.crypto = false as any;
    const crypto = getCrypto();
    expect(crypto).toBeDefined();
  });
});
