import { api } from '@/helpers/api'

/**
 *  @type {import('@/types').Organization}
 */
export const Organization = {
  list: [],
  paging: null,
  loadList: (page, filter) => {
    return api.get('/organizations', {
      withCredentials: false,
      params: {
        page: page,
        filter: filter
      }
    }).then((result) => {
      Organization.list = result.data
      Organization.paging = result.paging
    })
  },

  current: null,
  contacts: [],
  load: (id) => {
    Organization.current = null
    return api.get('/organizations/' + id, {
      withCredentials: false,
    }).then((result) => {
      Organization.current = result.organization
      Organization.contacts = result.contacts
    })
  }
}
