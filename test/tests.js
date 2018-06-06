import vm from '../src/app.js';

/* eslint-disable */
const assert = chai.assert;

describe('findPrimaryAndType(naturalExpressionYearOfBirth, gender)', function() {
  it(`findPrimaryAndType(2015, 'F') should return {primaryNumber: 3, typeOfExpression: 'Thunder'}`, function() {
    assert.deepEqual(vm.findPrimaryAndType(2015, 'F'), {
      primaryNumber: 3,
      typeOfExpression: 'Thunder',
    });
  });
});

describe('findSecondaryNumber(primaryNumber, gender, monthOfBirth)', function() {
  it(`findSecondaryNumber(1, 'M', 1) should return 8`, function() {
    assert.equal(vm.findSecondaryNumber(1, 'M', 1), 8);
  });
});
