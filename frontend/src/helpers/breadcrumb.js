import m from 'mithril'

/**
 * @param {string} tag
 * @param {import('@/types').BreadcrumItem[]} items
 * @returns {import('mithril').Vnode}
 */
export const breadcrumb = (tag, items) => {
  let i = 0
  const breadcrumb = []
  for (const item of items) {
    if (i > 0) {
      breadcrumb.push(m('span.delim', '/'))
    }
    if (item.href && item.label) {
      breadcrumb.push(m(m.route.Link, { href: item.href }, item.label))
    } else if (item.label) {
      breadcrumb.push(item.label)
    }
    i++
  }
  return m(tag, breadcrumb)
}
