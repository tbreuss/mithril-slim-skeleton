import m from 'mithril'
import { Auth } from '@/models/Auth'
import { openModal } from '@/helpers/modal'

let lastError = null

// hide elements before beginning the request
// prevents flickering of UI elements
const hideElements = () => {
  const footer = document.querySelector('footer')
  if (footer) {
    footer.style.visibility = 'hidden'
  }
}

// show elements after finishing the request
const showElements = () => {
  const footer = document.querySelector('footer')
  if (footer) {
    footer.style.visibility = 'visible'
  }
}

const handlers = {
  // Errors like ERR_CONNECTION_REFUSED or similar
  0: err => {
    openModal({
      color: 'error',
      title: () => m('h3', 'Error'),
      body: () => m('p', 'The connection to the webserver is unavailable or impossible.'),
    })
    throw err
  },
  // 401 Unauthorized (authentication is required and has failed)
  401: err => {
    openModal({
      color: 'error',
      title: () => m('h3', '401 Unauthorized'),
      body: () => m('p', 'Authentication is required and has failed.'),
      onclose: () => {
        m.route.set('/login')
      }
    })
    throw err
  },
  // 403 Forbidden (server did not accept given authentication)
  403: (err) => {
    openModal({
      color: 'error',
      title: () => m('h3', '403 Forbidden'),
      body: () => [
        m('p', 'You don\'t have permission to access on this server.')
      ],
      onclose: () => {
        Auth.logout()
        m.route.set('/login')
      }
    })
    throw err
  },
  // 404 Not Found (the requested resource could not be found)
  404: err => {
    openModal({
      color: 'error',
      title: () => m('h3', '404 Not Found'),
      body: () => [
        m('p', 'The requested page or ressource could not be found.')
      ]
    })
    throw err
  },
  // 422 Unprocessable Entity (validation of form data failed)
  422: err => {
    // delegete error handling to parent
    throw err
  },
  // 500 Internal Server Error (generic message for every server error)
  500: err => {
    openModal({
      color: 'error',
      title: () => m('h3', '500 Internal Server Error'),
      body: () => [
        m('p', 'The server responded with an error.')
      ]
    })
    throw err
  }
}

const request = method => (url, options) => {
  lastError = null

  const token = Auth.getToken()
  if (token) {
    options.headers = {
      Authorization: 'Bearer ' + token
    }
  }

  hideElements()

  return m.request({
    method,
    // @ts-ignore
    url: import.meta.env.VITE_API_URL + url,
    ...options // might need Object.assign for Edge
  })
    .catch(err => {
      lastError = err
      if (err.code in handlers) {
        handlers[err.code](err)
      } else {
        throw err
      }
    })
    .finally(() => {
      showElements()
    })
}

export const api = {
  get: request('GET'),
  put: request('PUT'),
  post: request('POST'),
  delete: request('DELETE'),
  hasError: () => lastError !== null,
  getError: () => lastError
}
