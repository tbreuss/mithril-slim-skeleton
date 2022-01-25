import m from 'mithril'

export const AdminIndex = {
  view: () => [
    m('h1',
      'Admin',
    ),
    m('section',
      m('h3', m(m.route.Link, { href: '/admin/organizations' }, 'Manage Organizations')),
      m('h3', m(m.route.Link, { href: '/admin/contacts' }, 'Manage Contacts')),
      m('h3', m(m.route.Link, { href: '/admin/users' }, 'Manage Users'))
    )
  ]
}
