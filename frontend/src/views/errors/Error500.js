import m from 'mithril'
import { api } from '@/helpers/api'

export const Error500 = {
  view: () => api.hasError() ? [
    m('h1', api.getError().code + ' Server Error'),
    m('p', api.getError().response.message),
  ] : [
    m('h1', '500 Internal Server Error'),
    m('p', 'The server responded with an error.'),
  ]
}
