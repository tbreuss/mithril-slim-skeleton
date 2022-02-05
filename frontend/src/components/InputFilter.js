import m from 'mithril'

// local state
let value = ''

export const InputFilter = {
  oninit: (v) => {
    value = v.attrs.value
  },
  view: (v) => m('div.filter',
    m('input', {
      value: value,
      placeholder: v.attrs.placeholder || '',
      oninput: (e) => {
        e.redraw = false
        value = e.target.value
        v.attrs.updateFilter(e.target.value)
      }
    }),
    value ? m('a.reset', {
      title: 'Reset filter',
      href: '#', onclick: (e) => {
        e.preventDefault()
        value = ''
        v.attrs.updateFilter(value)
      }
    }) : ''
  )
}
