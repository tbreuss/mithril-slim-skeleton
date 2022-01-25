import m from 'mithril'
import { Organization } from '@/models/Organization'
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
 * @param {number} id
 */
 const goTo = (id) => {
  m.route.set('/contacts/' + id)
}

/**
 * @param {string} label
 * @param {string|number|null} value
 */
const tr = (label, value) => m('tr',
  m('th', label),
  m('td', value ?? 'N.A.')
)

/**
 * @param {import('@/types').OrganizationDetail} organization
 */
const organizationTable = (organization) => (
  m('figure',
    m('table.organization-detail',
      m('tbody',
        tr('ID', organization.id),
        tr('Name', organization.name),
        tr('Address', organization.address),
        tr('Postal Code', organization.postalCode),
        tr('City', organization.city),
        tr('Country', organization.country),
        tr('Phone', organization.phone),
        tr('Email', organization.email),
      )
    )
  )
)

/**
 * @param {import('@/types').OrganizationDetailContact} contact
 */
const contactRow = (contact) => m('tr', {
  onclick: () => goTo(contact.id)
},
  m('td', contact.fullName),
  m('td', contact.city),
  m('td', contact.phone),
  m('td', m('span.fakelink', 'See details'))
)

/**
 * @param {import('@/types').OrganizationDetailContact[]} contacts
 */
const contactTable = (contacts) => {
  return contacts.length > 0
    ? m('figure',
      m('table.contact-list',
        m('thead',
          m('tr',
            m('th', 'Name'),
            m('th', 'City'),
            m('th', 'Phone'),
            m('th', ''),
          ),
        ),
        m('tbody',
          contacts.map(contact => contactRow(contact))
        )
      )
    )
    : m('p.contact-list', 'No contacts found.')
}

export const OrganizationDetail = {
  oninit: (vnode) => {
    Organization.load(vnode.attrs.key)
  },
  view: () => Organization.current
    ? [
      breadcrumb('h1', [
        { label: 'Organizations', href: '/organizations' },
        { label: Organization.current.name }
      ]),
      organizationTable(Organization.current),
      m('h2', 'Contacts'),
      contactTable(Organization.contacts),
      m('p', link('/organizations', 'Back to organizations'))
    ]
    : m('h1', link('/organizations', 'Organizations'))
}
