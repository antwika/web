import Verify from '../../../src/pages/api/verify';

const verifyTokenMock = jest.fn();

jest.mock('../../../src/misc/oidc', () => ({
  verifyToken: () => verifyTokenMock(),
}));

const jsonMock = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({
  json: async () => jsonMock(),
})) as any;

describe('Verify', () => {
  it('calls the verifyToken function and responds with json', async () => {
    const req = { body: '{ "accessToken": "accessToken" }' };
    const res = { json: jest.fn(), status: jest.fn(), end: jest.fn() };
    verifyTokenMock.mockResolvedValue(true);
    res.status.mockReturnValue(res);
    await Verify(req, res);
    expect(verifyTokenMock).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ valid: true });
  });

  it('responds with status 500 and an error message if there was a fatal failure', async () => {
    const req = { body: '{ "accessToken": "accessToken" }' };
    const res = { json: jest.fn(), status: jest.fn(), end: jest.fn() };
    verifyTokenMock.mockImplementationOnce(() => { throw new Error('Fatal error'); });
    res.status.mockReturnValue(res);
    await Verify(req, res);
    expect(verifyTokenMock).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalledWith('Internal server error');
  });
});
