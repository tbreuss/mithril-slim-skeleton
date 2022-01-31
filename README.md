# SPA Skeleton with Mithril.js and Slim Framework

This is a single-page application (SPA) skeleton based on [Mithril.js](https://mithril.js.org/) and [Slim Framework 4](https://www.slimframework.com/) trying to use good practices.
The application itself offers a frontend and backend, that allows you to view and manage some specific CRM data.

## Demo

<https://mithril-slim-skeleton.tebe.ch/>


## Features

[JS frontend](https://github.com/tbreuss/mithril-slim-skeleton/tree/main/frontend)

- [x] Single page application (SPA) using Mithril.js
- [x] Mitosis pattern for simple state management
- [x] Types without TypeScript using JSDoc
- [x] Frontend Tooling with vite.js
- [x] Minimal CSS with Pico.css
- [x] ESLint JavaScript Linter
- [ ] Testing

[PHP backend](https://github.com/tbreuss/mithril-slim-skeleton/tree/main/backend)

- [x] REST API using Slim Framework 4
- [x] Autoloading (PSR-4)
- [x] Code styles (PSR-12)
- [x] Dependency injection container (PSR-11)
- [x] HTTP message interfaces (PSR-7)
- [x] HTTP Server Request Handlers and Middleware (PSR-15)
- [x] HTTP factories (PSR-17)
- [x] HTTP router and dispatcher (Slim)
- [x] Logging (PSR-3)
- [x] PHPDoc standard (PSR-5, PSR-19)
- [x] PHPStan (Level: max)
- [x] Single action controllers
- [x] Domain Driven Design (DDD) partially
- [x] JWT for (synchronous) authentication
- [ ] Unit Tests
- [ ] Integration Tests

[Database](https://github.com/tbreuss/mithril-slim-skeleton/tree/main/database)

- [x] Database Migrations using Phinx
- [x] SQLite database (for the sake of simplicity)
- [x] Migration scripts
- [x] Seed scripts using Faker


## Requirements

- PHP >= 8.0
- Composer >= 2.0
- Node >= 17.0
- NPM >= 8.0


## Installation

~~~bash
git clone https://github.com/tbreuss/mithril-slim-skeleton
cd mithril-slim-skeleton
sh setup.sh
~~~


## Development

Start development environment

~~~bash
sh start.sh
~~~

Or start backend and frontend manually, see README files in own repos.


## Scripts

Frontend

| Command | Description |
| --- | --- |
eslint:check | eslint . --ext .js
eslint:fix | eslint . --ext .js --fix
ts:check | tsc --project jsconfig.json
ts:check:watch | tsc --watch --project jsconfig.json

Backend

| Command | Description |
| --- | --- |
cs:check | Runs the cs:check script as defined in composer.json.
cs:fix | Runs the cs:fix script as defined in composer.json.
lint:check | Runs the lint:check script as defined in composer.json.
sniffer:check | Runs the sniffer:check script as defined in composer.json.
sniffer:fix | Runs the sniffer:fix script as defined in composer.json.
stan:check | Runs the stan:check script as defined in composer.json.


## Links

Toolset used

- https://mithril.js.org
- https://vitejs.dev
- https://picocss.com
- https://www.slimframework.com
- https://eslint.org
- https://jsdoc.app
- https://www.sqlite.org
- https://phinx.org
- https://fakerphp.github.io

Helpful websites, articles, and blog posts

- https://restfulapi.net/http-methods/
- https://dev.to/t7yang/type-safety-in-javascript-with-jsdoc-and-vscode-1a28
- https://depth-first.com/articles/2021/10/20/types-without-typescript/
- https://odan.github.io/slim4-skeleton/
- https://github.com/slimphp/Slim-Skeleton


## Contributing

Please [create an issue](https://github.com/tbreuss/mithril-slim-skeleton/issues) before sending a pull reqest.


## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
