import {
  MESSAGES,
  LOCALES,
} from './locales';

describe('Locales', () => {
  it('has all expected locales', async () => {
    const expectedLocales = ['en-US', 'sv-SE', 'ko-KR'];
    expect(LOCALES).to.have.length(expectedLocales.length);
    for (let i = 0; i < MESSAGES.length; i += 1) {
      expect(expectedLocales.includes(LOCALES[i])).to.be.true;
    }
  });

  it('has locales which are all of equal length', async () => {
    let expectedLength;
    for (let i = 0; i < MESSAGES.length; i += 1) {
      if (expectedLength === undefined) expectedLength = MESSAGES[i].length;
      expect(MESSAGES[i]).to.have.length(expectedLength);
    }
  });
});
