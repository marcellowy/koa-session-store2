'use strict'

const redis = require('redis');
const debug = require('debug')('koa-session-store');

module.exports = class RedisStore {
    constructor(...args) {
        this.client = redis.createClient(...args);
    }

    /**
     * get session object by key
     */
    get(key, maxAge, data) {
        debug('get', `key=${key}`, `maxAge=${maxAge}`, `data=${JSON.stringify(data)}`);
        return new Promise((resolve, reject) => {
            this.client.get(key, function (err, data) {
                debug('get', `err=${err}`, `data=${data}`)
                if (!err) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e.stack);
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
            this.client.set(key, JSON.stringify(sess), 'EX', maxAge, function (err, msg) {
                debug('set', `err=${err}`, `msg=${msg}`);
                if (!err && msg === 'OK') {
                    resolve(true);
                } else {
                    reject(false);
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
            this.client.del(key, function (err, num) {
                debug('del', `err=${err}`, `num=${num}`);
                if (!err) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
}