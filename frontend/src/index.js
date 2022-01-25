import m from 'mithril'
import { AdminIndex } from '@/views/admin/AdminIndex'
import { AdminContactList } from '@/views/admin/contacts/AdminContactList'
import { AdminOrganizationList } from '@/views/admin/organizations/AdminOrganizationList'
import { AdminUserCreate } from '@/views/admin/users/AdminUserCreate'
import { AdminUserForm } from '@/views/admin/users/AdminUserForm'
import { AdminUserList } from '@/views/admin/users/AdminUserList'
import { AuthLogin } from '@/views/auth/AuthLogin'
import { AuthLogout } from '@/views/auth/AuthLogout'
import { ContactDetail } from '@/views/contacts/ContactDetail'
import { ContactList } from '@/views/contacts/ContactList'
import { OrganizationDetail } from '@/views/organizations/OrganizationDetail'
import { OrganizationList } from '@/views/organizations/OrganizationList'
import { Error403 } from '@/views/errors/Error403'
import { Error404 } from '@/views/errors/Error404'
import { Error500 } from '@/views/errors/Error500'
import { Index } from '@/views/Index'
import { LayoutDefault } from '@/views/layouts/LayoutDefault'
import { Actions } from '@/state/Actions'
import { State } from '@/state/State'
import '@/app.css'
import '@picocss/pico'

const state = State();
const actions = Actions(state);

// app.js
m.route(document.body, '/', {
  '/': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(Index))
    }
  },
  // private views
  '/admin/users/edit/:key': {
    render: (vnode) => {
      vnode.attrs.actions = actions
      return m(LayoutDefault, { state, actions }, m(AdminUserForm, vnode.attrs))
    }
  },
  '/admin/users/create': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AdminUserCreate, { actions }))
    }
  },
  '/admin/contacts': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AdminContactList))
    }
  },
  '/admin/organizations': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AdminOrganizationList))
    }
  },
  '/admin/users': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AdminUserList, { actions }))
    }
  },
  '/admin': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AdminIndex))
    }
  },
  // public views
  '/contacts/:key': {
    render: (vnode) => {
      return m(LayoutDefault, { state, actions }, m(ContactDetail, vnode.attrs))
    }
  },
  '/contacts': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(ContactList))
    }
  },
  '/organizations/:key': {
    render: (vnode) => {
      return m(LayoutDefault, { state, actions }, m(OrganizationDetail, vnode.attrs))
    }
  },
  '/organizations': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(OrganizationList, { state, actions }))
    }
  },
  '/login': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AuthLogin))
    }
  },
  '/logout': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(AuthLogout))
    }
  },
  // handling server errors
  '/error500': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(Error500))
    }
  },
  '/error403': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(Error403))
    }
  },
  '/error404': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(Error404))
    }
  },
  // handling client error
  '/:404...': {
    render: () => {
      return m(LayoutDefault, { state, actions }, m(Error404))
    }
  }
})
