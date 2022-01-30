import m from 'mithril'
import '@/helpers/pagination.css'

/**
 * @param {string} identifier
 * @param {number} page
 */
export const storePage = (identifier, page) => {
  window.sessionStorage.setItem(identifier, page.toString())
}

/**
 * @param {string} identifier
 * @returns {number}
 */
export const restorePage = (identifier) => {
  const page = window.sessionStorage.getItem(identifier)
  return page ? parseInt(page) : 1;
}

/**
 * @param {string} cssClass
 * @param {string} identifier
 * @param {number} page
 * @param {string} label
 * @param {import('@/types').PageClickHandler} onPageClick
 * @returns {import('mithril').Vnode}
 */
const createLink = (cssClass, identifier, page, label, onPageClick) => {
  return m('a', {
    href: '#',
    class: cssClass,
    onclick: (e) => {
      e.preventDefault()
      storePage(identifier, page)
      onPageClick(page)
    }
  }, label)
}

/**
 * @param {string} identifier
 * @param {import('@/types').Paging|null} paging
 * @param {import('@/types').PageClickHandler} onPageClick
 * @returns {import('mithril').Vnode|void}
 */
export const pagination = (identifier, paging, onPageClick) => {
  if (!paging) {
    return
  }

  const links = []

  let cssClass = paging.currentPage === 1 ? 'disabled' : ''
  links.push(
    createLink('first ' + cssClass, identifier, 1, '❮❮', onPageClick)
  )

  cssClass = paging.currentPage === 1 ? 'disabled' : ''
  links.push(
    createLink('prev ' + cssClass, identifier, Math.max(paging.currentPage - 1, 1), '❮', onPageClick)
  )

  links.push(m('span.text', 'Page ' + paging.currentPage + ' of ' + paging.pageCount))

  cssClass = paging.pageCount === paging.currentPage ? 'disabled' : ''
  links.push(
    createLink('next ' + cssClass, identifier, Math.min(paging.currentPage + 1, paging.pageCount), '❯', onPageClick)
  )

  cssClass = paging.pageCount === paging.currentPage ? 'disabled' : ''
  links.push(
    createLink('last ' + cssClass, identifier, paging.pageCount, '❯❯', onPageClick)
  )

  return m('.pagination', links)
}
