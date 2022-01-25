import m from 'mithril'
import { Auth } from '@/models/Auth'

export const AuthLogout = {
  oninit: () => {
    if (Auth.hasToken()) {
      Auth.logout()
      m.route.set('/logout')
    }
  },
  view: () => [
    m('h1', 'Logout'),
    m('p', 'You are logged out now.')
  ]
}
