import { MESSAGES, LOCALES } from '../../src/misc/locales';

describe("Locales", () => {
  it("has the expected languages", () => {
    expect(LOCALES).toContain('en-US');
    expect(LOCALES).toContain('sv-SE');
    expect(LOCALES).toContain('ko-KR');
  });

  it("has an equal number of locales to message lists", () => {
    expect(LOCALES.length).toEqual(Object.keys(MESSAGES).length);
  });

  it("has message lists all of equal length", () => {
    let lastMessageCount = 0;
    for (const locale of Object.keys(MESSAGES)) {
      const messageCount = Object.keys(MESSAGES[locale]).length;
      if (lastMessageCount) {
        expect(messageCount).toEqual(lastMessageCount);
      }
      lastMessageCount = messageCount;
    }
  });
});
