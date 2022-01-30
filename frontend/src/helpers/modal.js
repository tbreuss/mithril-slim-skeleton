import m from 'mithril'

/**
@typedef {{
	// Title render function.
	// Using a function allows us to keep content
	// updated after the modal is opened.
	title(): any
	color?: string
	// Body render function
	body?(): any
	buttons?: {id: string; text: string}[]
	redraw?: boolean
	onclick?(id: string): void,
	onclose?(): void
}} Options
*/

/** @type {Options} */
let options = {
  title: () => 'Modal'
}
let isOpen = false

/**
 * @param {Options} opts
 */
export function openModal (opts) {
	// Deep copy the supplied opts
	isOpen = true
	options = {...opts}
	options.buttons = opts.buttons ? opts.buttons.map(b => ({...b})) : []
	// Redraw by default unless caller suppressed
	if (options.redraw == null || options.redraw === true) {
		m.redraw()
	}
}

/** Calls redraw by default unless called with `false` */
export function closeModal (redraw = true) {
	isOpen = false
	// Redraw by default unless caller suppressed
	if (redraw) {
		m.redraw()
	}
}

export function modalIsOpen() {
	return isOpen
}

/** Modal component */
export const Modal = {
  oncreate() {
    const html = document.documentElement
    html.classList.add('modal-is-opening')
    setTimeout(() => {
      html.classList.remove('modal-is-opening')
      html.classList.add('modal-is-open')
    }, 400)
  },
	onbeforeremove () {
    const html = document.documentElement
    html.classList.remove('modal-is-open', 'modal-is-opening')
    html.classList.add('modal-is-closing')
		return new Promise(r => {
      setTimeout(r, 400)
		})
	},
  onremove() {
    document.documentElement.classList.remove('modal-is-closing')
  },
	view() {
		return m('dialog', {open: true},
			m('article', {class: options.color != null ? options.color : 'default'},
        m('a.close', {href:'#', ariaLabel:'Close', onclick: (e) => {
          isOpen = !isOpen
          e.preventDefault()
          options.onclose && options.onclose()
        }}, ''),
        options.title(),
				options.body != null && options.body(),
				options.body != null && options.buttons.length > 0 && m('.buttons',
					options.buttons.map(b =>
						m('a',
							{
                href: '#',
								role: 'button',
								disabled: !isOpen,
                class: b.class ?? '',
								onclick() {
									isOpen = false
									options.onclick && options.onclick(b.id)
								}
							},
							b.text
						)
					)
				)
			)
		)
	}
}
