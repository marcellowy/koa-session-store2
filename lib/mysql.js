'use strict'

const mysql = require('mysql');
const debug = require('debug')('koa-session-store');

module.exports = class MysqlStore {
    constructor(tableName, options) {
        options = Object.assign({}, {
            connectionLimit: 1
        }, options);
        this.pool = mysql.createPool(options);
        this.tableName = tableName;
    }

    /**
     * get session object by key
     */
    get(key, maxAge, data) {
        debug('get', `key=${key}`, `maxAge=${maxAge}`, `data=${JSON.stringify(data)}`);
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT Fsess FROM ?? WHERE Fkey=? AND Fexpires_time>UNIX_TIMESTAMP(NOW()) LIMIT 1',
                [
                    this.tableName,
                    key
                ],
                (err, results, fields) => {
                    debug('get', `err=${err}`, `results=${JSON.stringify(results)}`, `fields=${JSON.stringify(fields)}`)
                    if (err) {
                        reject(err);
                    } else {
                        try {
                            if (results.length > 0)
                                resolve(JSON.parse(results[0].Fsess));
                            else
                                resolve();
                        } catch (e) {
                            reject(e);
                        }
                    }
                }
            );
        });
    }

    /**
     * set session object for key, with a maxAge (in ms)
     */
    set(key, sess, maxAge, data) {
        maxAge = maxAge / 1000;
        debug('set', `key=${key}`, `sess=${JSON.stringify(sess)}`, `maxAge=${maxAge}`, `data=${JSON.stringify(data)}`);
        return new Promise((resolve, reject) => {
            const expiresTime = mysql.raw(`UNIX_TIMESTAMP(NOW())+${maxAge}`);
            this.pool.query('INSERT INTO ?? (Fkey, FmaxAge, Fsess, Fexpires_time) VALUES \
            (?,?,?,?) ON DUPLICATE KEY UPDATE Fexpires_time=?, Fsess=?, FmaxAge=?',
                [
                    this.tableName,
                    key,
                    maxAge,
                    JSON.stringify(sess),
                    expiresTime,
                    expiresTime,
                    JSON.stringify(sess),
                    maxAge
                ],
                (err, results, fields) => {
                    debug('set', `err=${err}`, `results=${JSON.stringify(results)}`, `fields=${JSON.stringify(fields)}`)
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }

    /**
     * destroy session for key
     */
    destroy(key) {
        debug('del', `key=${key}`);
        return new Promise((resolve, reject) => {
            this.pool.query('DELETE FROM ?? WHERE Fkey=?',
                [
                    this.tableName,
                    key
                ],
                (err, results, fields) => {
                    debug('set', `err=${err}`, `results=${JSON.stringify(results)}`, `fields=${JSON.stringify(fields)}`)
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }
}