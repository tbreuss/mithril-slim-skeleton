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
 * @param {import('@/types').OrganizationList[]} items
 */
 const table = (items) => (
  m('figure',
    m('table.organization-list',
      tableHead(),
      tableBody(items)
    )
  )
)

const tableHead = () => m('thead',
  m('tr',
    m('th.name', 'Name'),
    m('th.city', 'City'),
    m('th.phone', 'Phone'),
    m('th.link', ''),
  )
)

/**
 * @param {import('@/types').OrganizationList[]} items
 */
const tableBody = (items) => items.length > 0
  ? m('tbody', items.map(org => tableRow(org)))
  : m('tbody.empty',
    m('tr',
      m('td', { colspan: 4 }, 'No organizations found.')
    )
  )

/**
 * @param {import('@/types').OrganizationList} org
 */
const tableRow = (org) => m('tr', {
  onclick: () => goTo(org.id)
},
  m('td', org.name),
  m('td', org.city),
  m('td', org.phone),
  m('td', m('span.fakelink', 'See details'))
)

export const OrganizationList = {
  oninit: () => {
    const page = restorePage('organizationList')
    loadList(page)
  },
  view: () => [
    m('h1', 'Organizations'),
    table(Organization.list),
    pagination('oList', Organization.paging, loadList)
  ]
}
