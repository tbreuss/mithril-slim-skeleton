import m from 'mithril'
import { breadcrumb } from '@/helpers/breadcrumb'

export const AdminOrganizationList = {
  view: () => [
    breadcrumb('h1', [
      { label: 'Admin', href: '/admin' },
      { label: 'Organizations' },
    ]),
    m('p', 'To be done')
  ]
}
