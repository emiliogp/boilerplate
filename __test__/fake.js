import should from 'should';

const { describe, it } = global;

describe('Check Sum', () => {
  it('1+1 == 2', () => {
    const res = 1 + 1;
    should(res).equal(2);
  });
});
