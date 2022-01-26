import m from 'mithril'
import { AdminUser } from '@/models/admin/AdminUser'
import { errors } from '@/helpers/errors'
import { breadcrumb } from '@/helpers/breadcrumb'

export const AdminUserForm = {
  oninit: (vnode) => {
    errors.clearAll()
    AdminUser.load(vnode.attrs.key)
  },
  view: ({ attrs: { actions } }) => AdminUser.current ? [
    breadcrumb('h1', [
      { label: 'Admin', href: '/admin' },
      { label: 'Users', href: '/admin/users' },
      { label: AdminUser.current.lastName + ' ' + AdminUser.current.firstName }
    ]),
    m('form', {
      onsubmit: (e) => {
        e.preventDefault()
        AdminUser.save()
          .then(() => {
            actions.addFlashMessage('User was updated')
            m.route.set('/admin/users')
          })
          .catch((error) => {
            errors.errors = error.response
          })
      }
    }, [
      m('div', { class: errors.has('username') ? 'error' : '' },
        m('label.label', 'Username'),
        m('input.input[type=text][placeholder=Username]', {
          oninput: (e) => {
            AdminUser.current.username = e.target.value
            errors.clear('username')
          },
          value: AdminUser.current.username,
          readonly: true
        }),
        m('div.error-message', errors.get('username'))
      ),
      m('div', { class: errors.has('email') ? 'error' : '' },
        m('label.label', 'Email'),
        m('input.input[type=text][placeholder=Email]', {
          oninput: (e) => {
            AdminUser.current.email = e.target.value
            errors.clear('email')
          },
          value: AdminUser.current.email
        }),
        m('div.error-message', errors.get('email'))
      ),
      m('div', { class: errors.has('firstName') ? 'error' : '' },
        m('label.label', 'First name'),
        m('input.input[type=text][placeholder=First name]', {
          oninput: (e) => {
            AdminUser.current.firstName = e.target.value
            errors.clear('firstName')
          },
          value: AdminUser.current.firstName
        }),
        m('div.error-message', errors.get('firstName'))
      ),
      m('div', { class: errors.has('lastName') ? 'error' : '' },
        m('label.label', 'Last name'),
        m('input.input[placeholder=Last name]', {
          oninput: (e) => {
            AdminUser.current.lastName = e.target.value
            errors.clear('lastName')
          },
          value: AdminUser.current.lastName
        }),
        m('div.error-message', errors.get('lastName'))
      ),
      m('button[type=submit]', 'Save'),
    ])
  ] : [
    m('h1',
      m(m.route.Link, { href: '/admin' }, 'Admin'),
      m('span.delim', '/'),
      m(m.route.Link, { href: '/admin/users' }, 'Users')
    )
  ]
}
