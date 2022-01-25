import m from 'mithril'

export const Error404 = {
  view: () => [
    m('h1', '404 Not Found'),
    m('p', 'The requested page or ressource could not be found.')
  ]
}
