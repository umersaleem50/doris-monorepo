import { apiError } from './api-error';

describe('apiError', () => {
  it('should work', () => {
    expect(apiError()).toEqual('api-error');
  });
});
