module.exports = {
    MemcachedStore: require('./lib/memcached'),
    RedisStore: require('./lib/redis'),
    MysqlStore: require('./lib/mysql')
}