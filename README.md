# koa-session-store2

*Requires Node 7.6 or greater for async/await support*

## Getting Started

### Installation

    $ npm install koa-session-store2

### Running Tests
    Notice: please check test/config.js content
    $ npm install
    $ npm test

## Examples
```js
const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();

// memcached, redis, mysql example
// Notice: Requires mysql 5.6 or grater for default value now()
const {MemcachedStore, RedisStore, MysqlStore} = require('koa-session-store2');

app.keys = ['some secret hurr'];
 
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the   original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    // store: new MemcachedStore(), /* defualt memcached config: localhost:11211 example: https://www.npmjs.com/package/memcached */
    // store: new RedisStore(),
    store: new MysqlStore('t_', 
        {
          host     : '',
          user     : '',
          password : '',
          database : ''
        }
    ),
};
 
app.use(session(CONFIG, app));

app.use(ctx => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;
  
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});
 
app.listen(3000);
console.log('listening on port 3000');
```

## License
    MIT
