import 'mocha';
import { ServiceBusConfig } from './../..';
import { assert } from 'chai';

const validConfig = {
    namespace : "test",
    keyName : "rootKey",
    topic : "test-topic",
    key : "ABCDEF0123456789"
};

const invalidConfig = {
    namespace : "test",
    keyName : "rootKey",
    topic : "test-topic"
};

describe('ServiceBusConfigTests', () => {
    it('should parse validConfig into ServiceBusConfig', () => {
        const x = ServiceBusConfig.Parse(validConfig);
        assert.equal(x.Topic(), validConfig.topic);
        assert.isTrue(x.IsValid());
    });

    it('should parse invalidConfig and IsValid should return false', () => {
        const x = ServiceBusConfig.Parse(invalidConfig);
        assert.isFalse(x.IsValid());
    });
});
