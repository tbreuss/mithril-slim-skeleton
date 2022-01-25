# SPA Skeleton with Mithril.js and Slim Framework

This is a single-page application (SPA) skeleton based on [Mithril.js](https://mithril.js.org/) and [Slim Framework 4](https://www.slimframework.com/) trying to use good practices.


## Demo

<https://mithril-slim-skeleton.tebe.ch/>


## Installation

~~~bash
git clone {project}
cd {project}
npm install --prefix frontend
composer install --working-dir backend
~~~


## Features

JS frontend

- Single page application (SPA) using Mithril.js
- Mitosis pattern for simple state management
- Types without TypeScript using JSDoc
- Frontend Tooling with vite.js
- Minimal CSS with Pico.css
- ESLint JavaScript Linter

PHP backend

- REST API using Slim Framework 4
- Autoloading (PSR-4)
- Code styles (PSR-12)
- Dependency injection container (PSR-11)
- HTTP message interfaces (PSR-7)
- HTTP Server Request Handlers and Middleware (PSR-15)
- HTTP factories (PSR-17)
- HTTP router and dispatcher (Slim)
- Logging (PSR-3)
- PHPDoc standard (PSR-5, PSR-19)
- PHPStan (Level: max)
- Single action controllers
- Domain Driven Design (DDD) partially
- JWT for (synchronous) authentication 


## Development

Start development environment

~~~bash
sh start.sh
~~~

Or start one after the other.

Frontend

~~~bash
npm run dev --prefix frontend
~~~

Backend

~~~bash
ENVIRONMENT=development php -d variables_order=EGPCS -S localhost:7000 -t backend/public
~~~



## Scripts

Frontend

| Command | Description |
| --- | --- |
eslint:check | eslint . --ext .js
eslint:fix | eslint . --ext .js
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


## Helpful Links

Toolset

- https://mithril.js.org/
- https://vitejs.dev/
- https://picocss.com/
- https://www.slimframework.com/
- https://eslint.org/
- https://jsdoc.app/

Articles and blog posts

- https://restfulapi.net/http-methods/
- https://dev.to/t7yang/type-safety-in-javascript-with-jsdoc-and-vscode-1a28
- https://depth-first.com/articles/2021/10/20/types-without-typescript/
- https://odan.github.io/slim4-skeleton/
- https://github.com/slimphp/Slim-Skeleton
