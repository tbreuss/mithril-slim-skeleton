import m from 'mithril'
import { AdminUser } from '@/models/admin/AdminUser'
import { errors } from '@/helpers/errors'
import { breadcrumb } from '@/helpers/breadcrumb'

let newUser = {}

export const AdminUserCreate = {
  oninit: () => {
    errors.clearAll()
    newUser = {
      username: '',
      email: '',
      firstName: '',
      lastName: ''
    }
  },
  view: ({ attrs: { actions } }) => [
    breadcrumb('h1', [
      { label: 'Admin', href: '/admin' },
      { label: 'Users', href: '/admin/users' },
      { label: 'Create User' }
    ]),
    m('form', {
      onsubmit: (e) => {
        e.preventDefault()
        AdminUser.create(newUser)
          .then(() => {
            actions.addFlashMessage(`User was created`)
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
            newUser.username = e.target.value
            errors.clear('username')
          },
          value: newUser.username
        }),
        m('div.error-message', errors.get('username'))
      ),
      m('div', { class: errors.has('email') ? 'error' : '' },
        m('label.label', 'Email'),
        m('input.input[type=text][placeholder=Email]', {
          oninput: (e) => {
            newUser.email = e.target.value
            errors.clear('email')
          },
          value: newUser.email
        }),
        m('div.error-message', errors.get('email'))
      ),
      m('div', { class: errors.has('firstName') ? 'error' : '' },
        m('label.label', 'First name'),
        m('input.input[type=text][placeholder=First name]', {
          oninput: (e) => {
            newUser.firstName = e.target.value
            errors.clear('firstName')
          },
          value: newUser.firstName
        }),
        m('div.error-message', errors.get('firstName'))
      ),
      m('div', { class: errors.has('lastName') ? 'error' : '' },
        m('label.label', 'Last name'),
        m('input.input[placeholder=Last name]', {
          oninput: (e) => {
            newUser.lastName = e.target.value
            errors.clear('lastName')
          },
          value: newUser.lastName
        }),
        m('div.error-message', errors.get('lastName'))
      ),
      m('button[type=submit]', 'Save'),
    ]
    )
  ],
}
