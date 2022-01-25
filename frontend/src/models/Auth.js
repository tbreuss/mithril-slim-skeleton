import { api } from '@/helpers/api'

const TOKEN_KEY = 'AUTHORIZATION_TOKEN'

export const Auth = {
  login: (credentials) => {
    return api.post('/login', {
      body: credentials,
      withCredentials: false
    })
      .then((result) => {
        window.localStorage.setItem(TOKEN_KEY, result.token)
        return result
      })
  },
  logout: () => {
    window.localStorage.removeItem(TOKEN_KEY)
  },
  hasToken: () => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token && (token.length > 0)) {
      return true
    }
    return false
  },
  getToken: () => {
    if (Auth.hasToken()) {
      return window.localStorage.getItem(TOKEN_KEY)
    }
    return null
  }
}
