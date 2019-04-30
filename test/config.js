//
// test config file
// 
'use strict'

module.exports = {
    memcahcedConfig: {
        config: 'localhost:11211',  // default 'localhost:11211'
        options: {}
    },
    mysqlStore: {
        tableName: 't_session',
        options: {
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'db_session'
        }
    },
    redisStore: [6379, '127.0.0.1']  // default [6379, '127.0.0.1']
};