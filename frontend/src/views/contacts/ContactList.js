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
const rows = (contacts) => (
  m('figure',
    m('table.contact-list.contact-list--all',
      m('thead',
        m('tr',
          m('th.name', 'Name'),
          m('th.city', 'Organization'),
          m('th.city', 'City'),
          m('th.phone', 'Phone'),
          m('th.link', ''),
        ),
      ),
      m('tbody',
        contacts.map(contact => m('tr', {
          onclick: () => goTo(contact.id)
        },
          m('td', contact.fullName),
          m('td', contact.organization),
          m('td', contact.city),
          m('td', contact.phone),
          m('td', m('span.fakelink', 'See details'))
        ))
      )
    )
  )
)

export const ContactList = {
  oninit: () => {
    const page = restorePage('contactList')
    loadList(page)
  },
  view: () => [
    m('h1', 'Contacts'),
    Contact.list ? rows(Contact.list) : '',
    Contact.paging ? pagination('cList', Contact.paging, loadList) : '',
  ]
}
