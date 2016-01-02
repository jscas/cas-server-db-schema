# cas-server-db-schema

This repository is for creating and maintaining a PostgreSQL database to back
the [cas-server-pg-ticket-registry][tr] and [cas-server-pg-service-registry][sr]
plugins.

[tr]: https://github.com/jscas/cas-server-pg-ticket-registry
[sr]: https://github.com/jscas/cas-server-pg-service-registry

## Install

```bash
$ psql -U postgres
>> create role casserver login;
>> create database casserver owner casserver;
>> \q
```

```bash
$ export PATH="./node_modules/.bin/:${PATH}"
$ npm install --no-optional
$ knex init # generate knexfile.js
$ # adjust knexfile.js for your environment
$ knex --env production migrate:latest # or whatever environment you choose
$ # see `knex -h` for more information
```

## License

[MIT License](http://jsumners.mit-license.org/)
