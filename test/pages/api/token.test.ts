import Token from '../../../src/pages/api/token';

const requestTokenMock = jest.fn();

jest.mock('../../../src/misc/oidc', () => ({
  requestToken: () => requestTokenMock(),
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

describe('Token', () => {
  it('calls the requestToken function and responds with a token', async () => {
    const req = { body: '{ "locale": "en-US", "code": "code", "codeVerifier": "codeVerifier" }' };
    const res = { json: jest.fn(), status: jest.fn(), end: jest.fn() };
    requestTokenMock.mockResolvedValue('token');
    res.status.mockReturnValue(res);
    await Token(req, res);
    expect(requestTokenMock).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('token');
  });

  it('throws an error if the received token is falsy', async () => {
    const req = { body: '{ "locale": "en-US", "code": "code", "codeVerifier": "codeVerifier" }' };
    const res = { json: jest.fn(), status: jest.fn(), end: jest.fn() };
    requestTokenMock.mockResolvedValue(false);
    res.status.mockReturnValue(res);
    await Token(req, res);
    expect(requestTokenMock).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalledWith('Internal server error');
  });

  it('responds with status 500 and an error message if there was a fatal failure', async () => {
    const req = { body: '{ "locale": "en-US", "code": "code", "codeVerifier": "codeVerifier" }' };
    const res = { json: jest.fn(), status: jest.fn(), end: jest.fn() };
    requestTokenMock.mockImplementationOnce(() => { throw new Error('Fatal error'); });
    res.status.mockReturnValue(res);
    await Token(req, res);
    expect(requestTokenMock).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalledWith('Internal server error');
  });
});
