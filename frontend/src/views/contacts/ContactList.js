import m from 'mithril'
import { Contact } from '@/models/Contact'
import { Icon } from '@/components/Icon'
import { InputFilter } from '@/components/InputFilter'
import { pagination } from '@/helpers/pagination'
import { session } from '@/helpers/session'

// Local state for this view
const state = {
  page: session.getInteger('contacts.page', 1),
  filter: session.getString('contacts.filter', '')
}

/**
 * @param {number} page
 */
 const updatePage = (page) => {
  session.setInteger('contacts.page', page)
  state.page = page
  loadList(state.page, state.filter)
}

/**
 * @param {string} filter
 */
const updateFilter = (filter) => {
  session.setString('contacts.filter', filter)
  state.filter = filter
  updatePage(1) // go to first page if filter changed
}

/**
 * @param {number} id
 */
const goToRoute = (id) => {
  m.route.set('/contacts/' + id)
}

/**
 * @param {number} page
 * @param {string} filter
 */
 const loadList = (page, filter) => {
  Contact.loadList(page, filter);
}

/**
 * @param {import('@/types').ContactList[]} contacts
 */
const table = (contacts) => (
  m('figure',
    m('table.contact-list.contact-list--all',
      tableHead(),
      tableBody(contacts)
    )
  )
)

const tableHead = () => m('thead',
  m('tr',
    m('th.name', 'Name'),
    m('th.city', 'Organization'),
    m('th.city', 'City'),
    m('th.phone', 'Phone'),
    m('th.link', ''),
  )
)

/**
 * @param {import('@/types').ContactList[]} contacts
 */
const tableBody = (contacts) => contacts.length > 0
  ? m('tbody', contacts.map(contact => tableRow(contact)))
  : m('tbody.empty',
    m('tr',
      m('td', { colspan: 4 }, 'No contacts found.')
    )
  )

/**
 * @param {import('@/types').ContactList} contact
 */
const tableRow = (contact) => m('tr', {
  onclick: () => goToRoute(contact.id)
},
  m('td', contact.fullName),
  m('td', contact.organization),
  m('td', contact.city),
  m('td', contact.phone),
  m('td', m(Icon, {name: 'chevron-right'}))
)

export const ContactList = {
  oninit: () => {
    loadList(state.page, state.filter)
  },
  view: () => [
    m('h1', 'Contacts'),
    m(InputFilter, {
      value: state.filter,
      placeholder: Contact.paging
        ? `Search ${Contact.paging.totalItemCount} contacts`
        : '',
      updateFilter: updateFilter,
    }),
    table(Contact.list),
    pagination(Contact.paging, updatePage)
  ]
}
