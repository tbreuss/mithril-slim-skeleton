import m from 'mithril'
import { InputFilter } from '@/components/InputFilter'
import { Organization } from '@/models/Organization'
import { Icon } from '@/components/Icon'
import { pagination } from '@/helpers/pagination'
import { session } from '@/helpers/session'

// local state for this view
const state = {
  page: session.getInteger('organizations.page', 1),
  filter: session.getString('organizations.filter', '')
}

/**
 * @param {number} page
 */
const updatePage = (page) => {
  session.setInteger('organizations.page', page)
  state.page = page
  loadList(state.page, state.filter)
}

/**
 * @param {string} filter
 */
const updateFilter = (filter) => {
  session.setString('organizations.filter', filter)
  state.filter = filter
  updatePage(1) // go to first page if filter changed
}

/**
 * @param {number} id
 */
const goToRoute = (id) => {
  m.route.set('/organizations/' + id)
}

/**
 * @param {number} page
 * @param {string} filter
 */
const loadList = (page, filter) => {
  Organization.loadList(page, filter)
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
  onclick: () => goToRoute(org.id)
},
  m('td', org.name),
  m('td', org.city),
  m('td', org.phone),
  m('td', m(Icon, { name: 'chevron-right' }))
)

export const OrganizationList = {
  oninit: () => {
    loadList(state.page, state.filter)
  },
  view: () => [
    m('h1', 'Organizations'),
    m(InputFilter, {
      value: state.filter,
      placeholder: Organization.paging
        ? `Search ${Organization.paging.totalItemCount} organizations`
        : '',
      updateFilter: updateFilter,
    }),
    table(Organization.list),
    pagination(Organization.paging, updatePage)
  ]
}
