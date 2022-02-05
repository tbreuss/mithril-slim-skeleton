/**
 * @typedef {object} Paging
 * @property {number} currentPage
 * @property {number} pageCount
 * @property {number} itemCountPerPage
 * @property {number} totalItemCount
 */

/**
 * @typedef {object} ContactList
 * @property {number} id
 * @property {string} fullName
 * @property {string} organization
 * @property {string} city
 * @property {string} phone
 */

/**
 * @typedef {object} ContactDetail
 * @property {number} id
 * @property {string} fullName
 * @property {string} address
 * @property {string} city
 * @property {string} postalCode
 * @property {string} country
 * @property {string} phone
 * @property {string} email
 * @property {object} organization
 * @property {number} organization.id
 * @property {string} organization.name
 */

/**
 * @typedef {object} Contact
 * @property {ContactList[]} list
 * @property {Paging|null} paging
 * @property {function(number, string): unknown} loadList
 * @property {ContactDetail|null} current
 * @property {function(number): unknown} load
 */

/**
 * @typedef {object} OrganizationList
 * @property {number} id
 * @property {string} city
 * @property {string} email
 * @property {string} name
 * @property {string} phone
 */

/**
 * @typedef {object} OrganizationDetail
 * @property {number} id
 * @property {string} city
 * @property {string} name
 * @property {string} address
 * @property {string?} postalCode
 * @property {string} country
 * @property {string} phone
 * @property {string} email
 */

/**
 * @typedef {object} OrganizationDetailContact
 * @property {number} id
 * @property {string} fullName
 * @property {string} city
 * @property {string} phone
 */

/**
 * @typedef {object} Organization
 * @property {OrganizationList[]} list
 * @property {Paging|null} paging
 * @property {function(number, string): unknown} loadList
 * @property {OrganizationDetail|null} current
 * @property {OrganizationDetailContact[]} contacts
 * @property {function(number): unknown} load
 */

/**
 * @typedef {function(number): void} PageClickHandler
 */

/**
 * @typedef {object} BreadcrumItem
 * @property {string} label
 * @property {string=} href
 */

/**
 * @typedef {object} Credentials
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

export {}
