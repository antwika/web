import { trpc } from '../../src/utils/trpc';

describe('[trpc]', () => {
  it('exports a trpc containing various hooks', () => {
    expect(trpc).toBeDefined();
    expect(trpc.useContext).toBeDefined();
    expect(trpc.useDehydratedState).toBeDefined();
    expect(trpc.useInfiniteQuery).toBeDefined();
    expect(trpc.useMutation).toBeDefined();
    expect(trpc.useQuery).toBeDefined();
    expect(trpc.useSubscription).toBeDefined();
  });
});
