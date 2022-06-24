import trpc, { appRouter } from '../../../src/pages/api/trpc/[trpc]';

jest.mock('../../../src/misc/oidc', () => ({
}));

describe('[trpc]', () => {
  it('exports default', () => {
    expect(trpc).toBeDefined();
  });

  it('exports an appRouter', () => {
    expect(appRouter).toBeDefined();
  });
});
