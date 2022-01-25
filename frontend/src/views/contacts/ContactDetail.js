import m from 'mithril'
import { Contact } from '@/models/Contact'
import { breadcrumb } from '@/helpers/breadcrumb'

/**
 * @param {string} href
 * @param {string} label
 * @returns
 */
 const link = (href, label) => m(
  m.route.Link, { href: href }, label
)

/**
 * @param {string} label
 * @param {any} value
 */
const tr = (label, value) => m('tr',
  m('th', label),
  m('td', value ?? 'N.A.')
)

/**
 * @param {import('@/types').ContactDetail} contact
 */
const contact = (contact) => {
  return m('table.contact-detail',
    m('tbody',
      tr('ID', contact.id),
      tr('Name', contact.fullName),
      tr('Organization', link(
        '/organizations/' + contact.organization.id,
        contact.organization.name
      )),
      tr('Address', contact.address),
      tr('Postal Code', contact.postalCode),
      tr('City', contact.city),
      tr('Country', contact.country),
      tr('Phone', contact.phone),
      tr('Email', contact.email),
    )
  )
}

export const ContactDetail = {
  oninit: (vnode) => {
    Contact.load(vnode.attrs.key)
  },
  view: () => Contact.current ? [
    breadcrumb('h1', [
      { label: 'Contacts', href: '/contacts' },
      { label: Contact.current.fullName }
    ]),
    contact(Contact.current),
    m('p', link('/contacts', 'Back to contacts'))
  ] : m('h1', link('/contacts', 'Contacts'))
}
