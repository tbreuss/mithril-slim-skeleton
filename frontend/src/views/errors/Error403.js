import m from 'mithril'

export const Error403 = {
  view: () => [
    m('h1', '403 Forbidden'),
    m('p', 'You don\'t have permission to access on this server.'),
  ]
}
