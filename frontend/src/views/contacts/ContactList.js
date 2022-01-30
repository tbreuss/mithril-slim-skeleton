import m from 'mithril'
import { Contact } from '@/models/Contact'
import { restorePage, pagination } from '@/helpers/pagination'

/**
 * @param {number} id
 */
const goTo = (id) => {
  m.route.set('/contacts/' + id)
}

/**
 * @param {number} page
 */
const loadList = (page) => {
  Contact.loadList(page);
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
  onclick: () => goTo(contact.id)
},
  m('td', contact.fullName),
  m('td', contact.organization),
  m('td', contact.city),
  m('td', contact.phone),
  m('td', m('span.fakelink', 'See details'))
)

export const ContactList = {
  oninit: () => {
    const page = restorePage('contactList')
    loadList(page)
  },
  view: () => [
    m('h1', 'Contacts'),
    table(Contact.list),
    pagination('cList', Contact.paging, loadList)
  ]
}
