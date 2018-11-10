import { describe, it } from 'mocha';
import { expect } from 'chai';

import hello from '../src/main';

describe('MAIN', () => {
  it('should be equal "Hello World!"', () => {
    expect(hello()).to.equal('Hello World!');
  });
});
