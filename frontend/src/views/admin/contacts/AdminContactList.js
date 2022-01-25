import m from 'mithril'
import { breadcrumb } from '@/helpers/breadcrumb'

export const AdminContactList = {
  view: () => [
    breadcrumb('h1', [
      { label: 'Admin', href: '/admin' },
      { label: 'Contacts' },
    ]),
    m('p', 'To be done')
  ]
}
