'use strict'

const Memcached = require('memcached');
const debug = require('debug')('koa-session-store');

module.exports = class MemcachedStore {
    constructor(config, options = {}) {
        config = config || 'localhost:11211';
        this.client = new Memcached(config, options);
    }

    /**
     * get session object by key
     */
    get(key, maxAge, data) {
        debug('get', `key=${key}`, `maxAge=${maxAge}`, `data=${JSON.stringify(data)}`);
        return new Promise((resolve, reject) => {
            this.client.get(key, function (err, data) {
                debug('get', `err=${err}`, `data=${data}`)
                if (err == undefined) {
                    if (data != undefined) {
                        resolve(JSON.parse(data));
                    } else {
                        resolve({});
                    }
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * set session object for key, with a maxAge (in ms)
     */
    set(key, sess, maxAge, data) {
        maxAge = maxAge / 1000;
        debug('set', `key=${key}`, `sess=${JSON.stringify(sess)}`, `maxAge=${maxAge}`, `data=${JSON.stringify(data)}`);
        return new Promise((resolve, reject) => {
            this.client.set(key, JSON.stringify(sess), maxAge, (err, result) => {
                debug('set', `err=${err}`, `result=${result}`);
                if (err == undefined) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * destroy session for key
     */
    destroy(key) {
        debug('del', `key=${key}`);
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, ret) => {
                debug('del', `err=${err}`, `ret=${ret}`);
                if (!err) {
                    resolve(ret);
                } else {
                    reject(err);
                }
            });
        });
    }
}