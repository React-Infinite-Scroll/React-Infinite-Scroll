import { assert } from 'chai';

describe('Awesome test.', () => {
  it('should test true', () => {
    const expectedVal = true;
    // eslint-disable-next-line yoda
    assert(true === expectedVal, 'test failed');
  });
});
