import m from 'mithril'

export const Index = {
  view: () => [
    m('h1',
      'Welcome',
    ),
    m('section',
      m('h3', m(m.route.Link, { href: '/organizations' }, 'Organizations')),
      m('h3', m(m.route.Link, { href: '/contacts' }, 'Contacts'))
    )
  ]
}
