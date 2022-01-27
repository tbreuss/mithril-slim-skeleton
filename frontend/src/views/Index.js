import m from 'mithril'

export const Index = {
  view: () => [
    m('section',
      m.trust(`
        <h1>Mithril.js & Slim Framework Skeleton</h1>
        <p>
          This is a single-page application (SPA) skeleton built with <a target="_blank" href="https://mithril.js.org">Mithril.js</a> and <a target="_blank" href="https://www.slimframework.com">Slim Framework 4</a> trying to use good practices.
          The application itself offers a frontend and backend, that allows you to view and manage some specific CRM data.
        </p>
        <p>JS features are:</p>
        <ul>
          <li>Single page application (SPA) using Mithril.js</li>
          <li>Mitosis pattern for simple state management</li>
          <li>Types without TypeScript using JSDoc</li>
          <li>Frontend Tooling with vite.js</li>
          <li>Minimal CSS with Pico.css</li>
          <li>ESLint JavaScript Linter</li>
          <li>and more</li>
        </ul>
        <p>PHP features are:</p>
        <ul>
          <li>REST API using Slim Framework 4</li>
          <li>Autoloading (PSR-4)</li>
          <li>Code styles (PSR-12)</li>
          <li>Dependency injection container (PSR-11)</li>
          <li>HTTP message interfaces (PSR-7)</li>
          <li>HTTP Server Request Handlers and Middleware (PSR-15)</li>
          <li>HTTP factories (PSR-17)</li>
          <li>HTTP router and dispatcher (Slim)</li>
          <li>Logging (PSR-3)</li>
          <li>PHPDoc standard (PSR-5, PSR-19)</li>
          <li>PHPStan (Level: max)</li>
          <li>Single action controllers</li>
          <li>Domain Driven Design (DDD) partially</li>
          <li>JWT for (synchronous) authentication</li>
          <li>and more</li>
        </ul>
        <p>You can find more infos at <a target="_blank" href="https://github.com/tbreuss/mithril-slim-skeleton">https://github.com/tbreuss/mithril-slim-skeleton</a>.
      `),
    ),
  ]
}
