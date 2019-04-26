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
        debug('get', key, maxAge, data);
        return new Promise((resolve, reject) => {
            this.client.get(key, function (err, data) {
                if (err == undefined) {
                    if (data != undefined) {
                        debug('client.get data:', data);
                        resolve(JSON.parse(data));
                    } else {
                        debug('client.get data empty');
                        resolve();
                    }
                } else {
                    debug('client.get error:', err);
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
        debug('set', key, sess, maxAge, data);
        return new Promise((resolve, reject) => {
            this.client.set(key, JSON.stringify(sess), maxAge, (err, result) => {
                if (err == undefined) {
                    debug('client.set:', result);
                    // try get val
                    // this.client.get(key, (err, val) => {
                    //     debug('try client.get err:', err);
                    //     debug('try client.get val:', val);
                    // })
                    resolve(result);
                } else {
                    debug('client.set error:', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * destroy session for key
     */
    destroy(key) {
        debug('destroy', key);
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, ret) => {
                if (err == undefined) {
                    debug('destroy success');
                    resolve(ret);
                } else {
                    debug('destroy failure');
                    reject(err);
                }
            });
        });
    }
}