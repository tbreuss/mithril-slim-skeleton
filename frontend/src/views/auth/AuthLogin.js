import m from 'mithril'
import { Auth } from '@/models/Auth'
import { errors } from '@/helpers/errors'

/**
 * @type {import('@/types').Credentials}
 */
let login = {
  username: '',
  password: ''
}

export const AuthLogin = {
  oninit: () => {
    errors.clearAll()
    login = {
      username: 'demo',
      password: 'demo',
    }
  },
  view: () => [
    m('h1', 'Login'),
    !Auth.hasToken() ? m('form', {
      onsubmit: (e) => {
        e.preventDefault()
        Auth.login(login)
          .then(() => {
            m.route.set('/admin')
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
            login.username = e.target.value
            errors.clear('username')
          },
          value: login.username
        }),
        m('div.error-message', errors.get('username'))
      ),
      m('div', { class: errors.has('password') ? 'error' : '' },
        m('label.label', 'Password'),
        m('input.input[type=password][placeholder=Password]', {
          oninput: (e) => {
            login.password = e.target.value
            errors.clear('password')
          },
          value: login.password
        }),
        m('div.error-message', errors.get('password'))
      ),
      m('button[type=submit]', 'Login'),
    ]
    ) : m('p', 'You are already logged in.')
  ]
}
