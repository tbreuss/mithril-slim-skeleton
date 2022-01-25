import m from 'mithril'
import { AdminUser } from '@/models/admin/AdminUser'
import { breadcrumb } from '@/helpers/breadcrumb'

export const AdminUserList = {
  oninit: AdminUser.loadList,
  view: ({ attrs: { actions }}) => [
    breadcrumb('h1', [
      { label: 'Admin', href: '/admin' },
      { label: 'Users' }
    ]),
    AdminUser.list.length > 0 ? [
      m(m.route.Link, { href: '/admin/users/create' }, 'Create User'),
      m('figure',
        m('table.admin-user-list',
          m('tr',
            m('th', 'ID'),
            m('th', 'Username'),
            m('th', 'Email'),
            m('th', 'Full name'),
            m('th', ''),
            m('th', '')
          ),
          AdminUser.list.map((user) => {
            return m('tr',
              m('td', user.id),
              m('td', user.username),
              m('td', user.email),
              m('td', user.lastName + ' ' + user.firstName),
              m('td', m(m.route.Link, { href: '/admin/users/edit/' + user.id }, 'Edit')),
              m('td', m('a', {
                href: '#', onclick: (e) => {
                  e.preventDefault()
                  if (confirm('Delete user?') === true) {
                    e.redraw = false // loadList triggers a redraw
                    AdminUser.delete(user.id).then(() => {
                      actions.addFlashMessage(`User with ID ${user.id} was deleted`)
                      AdminUser.loadList()
                    })
                  }
                }
              }, 'Delete'))
            )
          })
        )
      )
    ] : ''
  ]
}
