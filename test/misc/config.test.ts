import * as config from '../../src/misc/config';

describe('config', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules()
    // process.env = { ...env }
    process.env = { NODE_ENV: 'test' };
  });

  afterEach(() => {
    process.env = env
  });

  it('has property baseUrl() by default', () => {
    expect(config.baseUrl()).toBe('http://localhost:3000');
  });

  it('has property idpUrl() by default', () => {
    expect(config.idpUrl()).toBe('http://localhost:4000');
  });

  it('has property responseType() by default', () => {
    expect(config.responseType()).toBe('code');
  });

  it('has property scope() by default', () => {
    expect(config.scope()).toBe('openid');
  });

  it('does not have property clientId() by default', () => {
    expect(config.clientId()).toBeUndefined();
  });

  it('does not have property clientSecret() by default', () => {
    expect(config.clientSecret()).toBeUndefined();
  });
});
