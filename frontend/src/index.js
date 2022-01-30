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
import { Error404 } from '@/views/errors/Error404'
import { Index } from '@/views/Index'
import { DefaultLayout } from '@/layouts/DefaultLayout'
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
      return m(DefaultLayout, { state, actions }, m(Index))
    }
  },
  // private views
  '/admin/users/edit/:key': {
    render: (vnode) => {
      vnode.attrs.actions = actions
      return m(DefaultLayout, { state, actions }, m(AdminUserForm, vnode.attrs))
    }
  },
  '/admin/users/create': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AdminUserCreate, { actions }))
    }
  },
  '/admin/contacts': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AdminContactList))
    }
  },
  '/admin/organizations': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AdminOrganizationList))
    }
  },
  '/admin/users': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AdminUserList, { actions }))
    }
  },
  '/admin': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AdminIndex))
    }
  },
  // public views
  '/contacts/:key': {
    render: (vnode) => {
      return m(DefaultLayout, { state, actions }, m(ContactDetail, vnode.attrs))
    }
  },
  '/contacts': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(ContactList))
    }
  },
  '/organizations/:key': {
    render: (vnode) => {
      return m(DefaultLayout, { state, actions }, m(OrganizationDetail, vnode.attrs))
    }
  },
  '/organizations': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(OrganizationList, { state, actions }))
    }
  },
  '/login': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AuthLogin))
    }
  },
  '/logout': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(AuthLogout))
    }
  },
  // handling client error
  '/:404...': {
    render: () => {
      return m(DefaultLayout, { state, actions }, m(Error404))
    }
  }
})
