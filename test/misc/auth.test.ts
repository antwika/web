import { parseUser } from '../../src/misc/auth';

describe('auth', () => {
  it('does something', () => {
    const token = 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6IkpzTkF5VWJwN2hJMTRNMGZSb2lJTkdnb0FZUTZqc256cHVtcHFIdEJtc2MifQ.eyJmaXJzdE5hbWUiOiJGb28iLCJsYXN0TmFtZSI6IkJhciIsImVtYWlsIjoiZm9vQGJhci5jb20iLCJqdGkiOiJ2LWIzZ204VXVrVjRKMDNBWXVSSm4iLCJzdWIiOiJGb29CYXIiLCJpYXQiOjE2NTU3NjExODksImV4cCI6MTY1NTc2ODM4OSwic2NvcGUiOiJvcGVuaWQiLCJjbGllbnRfaWQiOiJ3ZWIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvb2lkYyIsImF1ZCI6IndlYiIsImNuZiI6eyJqa3QiOiI5bE5jdDNRTUF3UmFad3NndDJzTEJaalZyczVEd04tZExCbGZmYnBhaFZNIn19.UHnx0DshSjKe9pNVerJ1SR7EsU1Pq0GxgPZZBhh0gQHYdl4mSlAF95Ldsx1B2m5U7eALEBKtUrVRTkpZ_X5VGg'
    const result = parseUser(token);
    expect(result.id).toBe('FooBar');
    expect(result.firstName).toBe('Foo');
    expect(result.lastName).toBe('Bar');
    expect(result.email).toBe('foo@bar.com');
  });
});
