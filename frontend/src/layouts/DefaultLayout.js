import m from 'mithril'
import { Auth } from '@/models/Auth'
import { Modal, modalIsOpen} from '@/helpers/modal.js'
import { ErrorModal, errorModalIsOpen} from '@/components/ErrorModal.js'

export const DefaultLayout = {
  view: ({ attrs: { state, actions }, children }) => {
    return [
      m('.hero', [
        m('nav.container-fluid', [
          m('ul', [
            m('li', m(m.route.Link, { href: '/' },
              m('strong.sm', {title: 'Mithril & Slim Skeleton'}, 'MSS'),
              m('strong.lg', 'Mithril & Slim Skeleton')
            ))
          ]),
          m('ul', [
            m('li', m(m.route.Link, { href: '/organizations' }, 'Organizations')),
            m('li', m(m.route.Link, { href: '/contacts' }, 'Contacts')),
            m('li', m(m.route.Link, { href: '/test' }, 'Tests')),
            Auth.hasToken()
              ? [
                m('li', m(m.route.Link, { href: '/admin' }, 'Admin')),
                m('li', m(m.route.Link, { href: '/logout' }, 'Logout'))
              ] : m('li', m(m.route.Link, { href: '/login' }, 'Login'))
          ])
        ])
      ]),
      m('main.container', m('.row', [
        m('section',
          m('div.alerts',
            state.flashMessages.map((alert) => m('.alert',
              {
                onupdate: ({ dom }) => {
                  dom.style.opacity = '1' // see css definition
                  dom.style.display = 'block'
                  setTimeout(() => {
                    dom.style.opacity = '0'
                    setTimeout(() => {
                      dom.style.display = 'none'
                      actions.deleteFlashMessage(alert.key)
                    }, 600) // see css definition
                  }, 2000)
                }
              },
              m('span.closebtn', {
                onclick: (e) => {
                  e.redraw = false
                  const div = e.target.closest('.alert')
                  div.style.opacity = '0'
                  setTimeout(() => {
                    div.style.display = 'none'
                    actions.deleteFlashMessage(alert.key)
                    m.redraw()
                  }, 600) // see css definition
                }
              }, '×'),
              m('div', alert.message)
            ))
          ),
          children
        )
      ])),
      m('footer.container',
        m('small',
          'Built with ',
          m('a', { href: 'https://mithril.js.org', target: '_blank' }, 'Mithril.js'),
          ' • ',
          m('a', { href: 'https://slimframework.com', target: '_blank' }, 'Slim Framework'),
          ' • ',
          m('a', { href: 'https://picocss.com', target: '_blank' }, 'Pico CSS')
        )
      ),
      modalIsOpen() && m(Modal),
      errorModalIsOpen() && m(ErrorModal)
    ]
  }
}
