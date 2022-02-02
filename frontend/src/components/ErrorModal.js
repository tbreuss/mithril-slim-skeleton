import m from 'mithril'

/**
@typedef {{
  // Title render function.
  // Using a function allows us to keep content
  // updated after the modal is opened.
  title(): any
  // Body render function
  body?(): any
  redraw?: boolean
  onclick?(id: string, event: any): void,
  onclose?(): void
}} Options
*/

const animationDuration = 0;

/** @type {Options} */
let options = {
  title: () => 'Modal'
}

let isOpen = false

/**
 * @param {Options} opts
 */
export function openErrorModal(opts) {
  // Deep copy the supplied opts
  isOpen = true
  options = { ...opts }
  // Redraw by default unless caller suppressed
  if (options.redraw == null || options.redraw === true) {
    m.redraw()
  }
}

/** Calls redraw by default unless called with `false` */
export function closeErrorModal(redraw = true) {
  isOpen = false
  // Redraw by default unless caller suppressed
  if (redraw) {
    m.redraw()
  }
}

export function errorModalIsOpen() {
  return isOpen
}

let modelRef = undefined;

/** Modal component */
export const ErrorModal = {
  oncreate() {
    const html = document.documentElement
    html.classList.add('error-modal-is-opening')
    setTimeout(() => {
      html.classList.remove('error-modal-is-opening')
      html.classList.add('error-modal-is-open')
    }, animationDuration)
  },
  onbeforeremove() {
    const html = document.documentElement
    html.classList.remove('error-modal-is-open', 'error-modal-is-opening')
    html.classList.add('error-modal-is-closing')
    return new Promise(r => {
      setTimeout(r, animationDuration)
    })
  },
  onremove() {
    document.documentElement.classList.remove('error-modal-is-closing')
  },
  view() {
    return m('dialog.error', {
      open: true,
      oncreate: ({ dom }) => {
        modelRef = dom;
      },
      onclick: (e) => {
        e.redraw = false
        if (e.target === modelRef) {
          closeErrorModal()
        }
      }
    },
      m('article',
        m('a.close', {
          href: '#', ariaLabel: 'Close', onclick: (e) => {
            isOpen = !isOpen
            e.preventDefault()
            options.onclose && options.onclose()
          }
        }, ''),
        options.title(),
        options.body != null && options.body(),
      )
    )
  }
}
