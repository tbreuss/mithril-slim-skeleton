import m from 'mithril'

let value = ''

export const InputFilter = {
  oninit: (v) => {
    value = v.attrs.value
  },
  view: (v) => m('input', {
    value: value,
    placeholder: v.attrs.placeholder || '',
    oninput: (e) => {
      e.redraw = false
      value = e.target.value
      v.attrs.updateFilter(e.target.value)
    }
  })
}
