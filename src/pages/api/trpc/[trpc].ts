import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { clientId, clientSecret, idpUrl } from '../../../misc/config';
import { requestToken, verifyToken } from '../../../misc/oidc';

export const appRouter = trpc
  .router()
  .query('requestToken', {
    input: z
      .object({
        locale: z.string(),
        code: z.string(),
        codeVerifier: z.string(),
      }),
    async resolve({ input }) {
      const { access_token: accessToken } = await requestToken(fetch, idpUrl(), input.code, input.codeVerifier, input.locale, clientId(), clientSecret());
      return {
        token: accessToken,
      };
    },
  })
  .query('verifyToken', {
    input: z
      .object({
        accessToken: z.string(),
      }),
    async resolve({ input }) {
      const isValid = await verifyToken(fetch, idpUrl(), input.accessToken);
      return {
        valid: isValid,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

export const createContext = () => null;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
