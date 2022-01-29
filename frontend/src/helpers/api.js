import m from 'mithril'
import { Auth } from '@/models/Auth'

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
  // TODO do we ever have a status code 0?
  0: err => {
    m.route.set('/error500')
    throw err
  },
  // 401 Unauthorized (authentication is required and has failed)
  401: err => {
    m.route.set('/login')
    throw err
  },
  // 403 Forbidden (server did not accept given authentication)
  403: (err) => {
    // force logout here
    Auth.logout()
    m.route.set('/error403')
    throw err
  },
  // 404 Not Found (the requested resource could not be found)
  404: err => {
    m.route.set('/error404')
    throw err
  },
  // 422 Unprocessable Entity (validation of form data failed)
  422: err => {
    // delegete error handling to parent
    throw err
  },
  // 500 Internal Server Error (generic message for every server error)
  500: err => {
    m.route.set('/error500')
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
      debugger;
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
