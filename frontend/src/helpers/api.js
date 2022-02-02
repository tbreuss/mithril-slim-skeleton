import m from 'mithril'
import { Auth } from '@/models/Auth'
import { openErrorModal } from '@/components/ErrorModal'

// hide elements before beginning the request
// prevents flickering of UI elements
const beforeRequest = () => {
  const footer = document.querySelector('footer')
  if (footer) {
    footer.style.visibility = 'hidden'
  }
}

// show elements after finishing the request
const afterRequest = () => {
  const footer = document.querySelector('footer')
  if (footer) {
    footer.style.visibility = 'visible'
  }
}

const handlers = {
  // 422 Unprocessable Entity (validation of form data failed)
  422: err => {
    // delegete error handling to parent
    throw err
  },
}

const request = method => (url, options) => {
  const token = Auth.getToken()
  if (token) {
    if (!options) {
      options = {}
    }
    options.headers = {
      Authorization: 'Bearer ' + token
    }
  }

  beforeRequest()

  return m.request({
    method,
    // @ts-ignore
    url: import.meta.env.VITE_API_URL + url,
    ...options // might need Object.assign for Edge
  })
    .catch(err => {
      const code = err.code || 0
      if (err.code in handlers) {
        handlers[err.code](err)
      } else {
        openErrorModal({
          title: () => m('h3', code >= 500 ? 'Server Error' : code >= 400 ? 'Client Error' : 'Error'),
          body: () => [
            m('p', err.response && err.response.description ? err.response.description : 'An error occured'),
            m('p', m('small', err.response && err.response.message ? err.response.message : ''))
          ]
        })
        throw err
      }
    })
    .finally(() => {
      afterRequest()
    })
}

export const api = {
  get: request('GET'),
  put: request('PUT'),
  post: request('POST'),
  delete: request('DELETE')
}
