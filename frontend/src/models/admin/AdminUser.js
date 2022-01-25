import { api } from '@/helpers/api'

export const AdminUser = {

  /**
   *  @type {import('@/types').User[]}
   */
  list: [],
  loadList: () => {
    return api.get('/admin/users', {
      withCredentials: false
    })
      .then((result) => {
        AdminUser.list = result.data
      })
  },

  /**
   *  @type {import('@/types').User|null}
   */
  current: null,
  load: (id) => {
    AdminUser.current = null
    return api.get('/admin/users/' + id, {
      withCredentials: false,
    })
      .then((result) => {
        AdminUser.current = result
      })
  },

  save: () => {
    return api.put('/admin/users/' + AdminUser.current.id, {
      body: AdminUser.current,
      withCredentials: false,
    })
  },

  create: (user) => {
    return api.post('/admin/users', {
      body: user,
      withCredentials: false,
    })
  },

  delete: (id) => {
    return api.delete('/admin/users/' + id, {
      withCredentials: false,
    })
  }
}
