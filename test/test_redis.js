'use strict'

const assert = require('assert');

const Store = require('../index').RedisStore;
const config = require('./config').redisStore;

// test config
const key = 'redis_test_key';
const sess = { name: 1 };
const maxAge = 86400 * 1000;
const data = {};

describe('Redis', function () {
    // Test set
    describe('set', function () {
        it('should return true', async function () {
            let store = new Store(...config);
            assert.equal(await store.set(key, sess, maxAge, data), true);
        });
    });
    // Test get
    describe('get', function () {
        it('should return session data', async function () {
            let store = new Store(...config);
            let session = await store.get(key, maxAge, data);
            assert.equal(session.name, 1);
        });
    });
    // Test destroy
    describe('destroy', function () {
        it('should return true', async function () {
            let store = new Store(...config);
            let ret = await store.destroy(key);
            assert.equal(ret, true);
        });
    });
});