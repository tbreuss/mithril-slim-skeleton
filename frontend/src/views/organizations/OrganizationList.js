import m from 'mithril'
import { Organization } from '@/models/Organization'
import { restorePage, pagination } from '@/helpers/pagination'

/**
 * @param {number} id
 */
const goTo = (id) => {
  m.route.set('/organizations/' + id)
}

/**
 * @param {number} page
 */
 const loadList = (page) => {
  Organization.loadList(page);
}

/**
 * @param {import('@/types').OrganizationList} org
 */
const row = (org) => m('tr', {
  onclick: () => goTo(org.id)
},
  m('td', org.name),
  m('td', org.city),
  m('td', org.phone),
  m('td', m('span.fakelink', 'See details'))
)

/**
 * @param {import('@/types').OrganizationList[]} items
 */
const table = (items) => (
  m('figure',
    m('table.organization-list',
      m('thead',
        m('tr',
          m('th.name', 'Name'),
          m('th.city', 'City'),
          m('th.phone', 'Phone'),
          m('th.link', ''),
        )
      ),
      m('tbody', items.map(org => row(org)))
    )
  )
)

export const OrganizationList = {
  oninit: () => {
    const page = restorePage('organizationList')
    loadList(page)
  },
  view: () => [
    m('h1', 'Organizations'),
    Organization.list
      ? table(Organization.list)
      : '',
    Organization.paging
      ? pagination('oList', Organization.paging, loadList)
      : ''
  ]
}
