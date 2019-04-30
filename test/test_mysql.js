'use strict'

const assert = require('assert');

const Store = require('../index').MysqlStore;
const config = require('./config').mysqlStore;

// test config
const key = 'mysql_test_key';
const sess = { name: 1 };
const maxAge = 86400 * 1000;
const data = {};

describe('Mysql', function () {
    // Test set
    describe('set', function () {
        it('should return true', async function () {
            let store = new Store(config.tableName, config.options);
            assert.equal(await store.set(key, sess, maxAge, data), true);
        });
    });
    // Test get
    describe('get', function () {
        it('should return session data', async function () {
            let store = new Store(config.tableName, config.options);
            let session = await store.get(key, maxAge, data);
            assert.equal(session.name, 1);
        });
    });
    // Test destroy
    describe('destroy', function () {
        it('should return true', async function () {
            let store = new Store(config.tableName, config.options);
            let ret = await store.destroy(key);
            assert.equal(ret, true);
        });
    });
});