import { api } from '@/helpers/api'

/**
 *  @type {import('@/types').Contact}
 */
export const Contact = {
  list: [],
  paging: null,
  loadList: (page) => {
    return api.get('/contacts', {
      withCredentials: false,
      params: {
        page: page
      }
    }).then((result) => {
      Contact.list = result.data
      Contact.paging = result.paging
    })
  },

  current: null,
  load: (id) => {
    Contact.current = null
    return api.get('/contacts/' + id, {
      withCredentials: false,
    }).then((result) => {
      Contact.current = result
    })
  }
}
