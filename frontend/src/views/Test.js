import m from 'mithril'
import { openModal } from '@/helpers/modal'
import { api } from '@/helpers/api'

const serverLink = (tag, url, text) => m(tag, m('a', {
  onclick: (e) => {
    e.preventDefault()
    api.get(url, { huhu: 1})
  }
}, text
))


export const Test = {
  view: ({ attrs: { actions } }) => m('section',
    m('h1', 'Tests'),
    m('h3', 'Flash messages'),
    m('ul',
      m('li', m('a', {
        onclick: (e) => {
          e.preventDefault()
          actions.addFlashMessage('User was created')
        }
      }, 'Show error message'
      )),
      m('li', m('a', {
        onclick: (e) => {
          e.preventDefault()
          actions.addFlashMessage('User was created')
        }
      }, 'Show success message (to be done)'
      ))
    ),
    m('h3', 'Modals'),
    m('ul',
      m('li', m('a',
        {
          onclick() {
            openModal({
              title: () => m('h3', 'Modal with buttons'),
              body: () => m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
              buttons: [
                { id: 'ok', text: 'Ok' },
                { id: 'cancel', text: 'Cancel', class: 'secondary' }
              ],
              onclick(id, e) {
                e.preventDefault()
                console.log('Clicked modal button id: ' + id)
              }
            })
          }
        },
        'Open modal with buttons'
      )),
      m('li', m('a',
        {
          onclick() {
            openModal({
              title: () => m('h3', 'Modal with text only'),
              body: () => m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
            })
          }
        },
        'Open modal with text only'
      )),
      m('li', m('a',
        {
          onclick() {
            openModal({
              title: () => m('h3', 'Modal with error message'),
              body: () => [
                m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
                serverLink('p', '/error/400', 'Click here  to see an error')
              ],
            })
          }
        },
        'Open modal for error reporting'
      ))
    ),
    m('h3', 'Server errors'),
    m('p', 'Default server errors supported by Slim Framework:'),
    m('ul',
      serverLink('li', '/error/400', 'Bad request error'),
      serverLink('li', '/error/401', 'Unauthorized error'),
      serverLink('li', '/error/403', 'Forbidden error'),
      serverLink('li', '/error/404', 'Not found error'),
      serverLink('li', '/error/405', 'Method not allowed error'),
      serverLink('li', '/error/410', 'Gone error'),
      serverLink('li', '/error/500', 'Internal server error'),
      serverLink('li', '/error/501', 'Not implemented error'),
    ),
    m('p', 'PHP run-time notices, warnings, and errors:'),
    m('ul',
      serverLink('li', '/error/600', 'PHP Notice'),
      serverLink('li', '/error/601', 'PHP Warning'),
      serverLink('li', '/error/602', 'PHP Error'),
    )
  )
}
