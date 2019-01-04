import { HelloWorld } from '../../';
import { assert } from 'chai';

import "mocha";

describe('HelloWorldTests', () => {
    it('should return HelloWorld', async () => {
        const actor = new HelloWorld();
        assert.equal("Hello World", actor.Result());
    });
});