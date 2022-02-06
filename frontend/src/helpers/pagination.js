import m from 'mithril'
import { Icon } from '@/components/Icon'
import '@/helpers/pagination.css'

/**
 * @param {string} cssClass
 * @param {number} page
 * @param {string|import('mithril').Vnode} label
 * @param {import('@/types').PageClickHandler} updatePage
 * @returns {import('mithril').Vnode}
 */
const createLink = (cssClass, page, label, updatePage) => {
  return m('a', {
    href: '#',
    class: cssClass,
    onclick: (e) => {
      e.preventDefault()
      updatePage(page)
    }
  }, label)
}

/**
 * @param {import('@/types').Paging|null} paging
 * @param {import('@/types').PageClickHandler} updatePage
 * @returns {import('mithril').Vnode|void}
 */
export const pagination = (paging, updatePage) => {
  if (!paging || (paging.totalItemCount === 0)) {
    return
  }

  const links = []

  let cssClass = paging.currentPage === 1 ? 'disabled' : ''
  links.push(
    createLink('first ' + cssClass, 1, m(Icon, {name: 'chevrons-left'}), updatePage)
  )

  cssClass = paging.currentPage === 1 ? 'disabled' : ''
  links.push(
    createLink('prev ' + cssClass, Math.max(paging.currentPage - 1, 1), m(Icon, {name: 'chevron-left'}), updatePage)
  )

  links.push(m('span.text', 'Page ' + paging.currentPage + ' of ' + paging.pageCount))

  cssClass = paging.pageCount === paging.currentPage ? 'disabled' : ''
  links.push(
    createLink('next ' + cssClass, Math.min(paging.currentPage + 1, paging.pageCount), m(Icon, {name: 'chevron-right'}), updatePage)
  )

  cssClass = paging.pageCount === paging.currentPage ? 'disabled' : ''
  links.push(
    createLink('last ' + cssClass, paging.pageCount, m(Icon, {name: 'chevrons-right'}), updatePage)
  )

  return m('.pagination', links)
}
