import {find} from 'lodash-es'
import * as supabaseDB from './supabase/db'
import * as supabaseStorage from './supabase/storage'
import * as stores from './stores'
import { buildStaticPage } from '@primo-app/primo/src/stores/helpers'

export const sites = {
  initialize: async () => {
    const sites = await supabaseDB.sites.get({query: `id, name, owner, collaborators, password`})
    if (sites) {
      stores.sites.set(sites)
    }
  },
  create: async (newSite) => {
    stores.sites.update(sites => [ ...sites, newSite ])
    const homepage = find(newSite.pages, ['id', 'index'])
    const preview = await buildStaticPage({ page: homepage, site: newSite })
    await Promise.all([
      supabaseDB.sites.create({
        name: newSite.name,
        id: newSite.id,
        owner: 1,
      }),
      supabaseStorage.uploadSiteData({
        id: newSite.id,
        data: newSite
      }),
      supabaseStorage.updatePagePreview({
        path: `${newSite.id}/preview.html`,
        preview
      })
    ])
  },
  update: async (id, props) => {
    await supabaseDB.sites.update(id, props)
  },
  save: async (updatedSite) => {
    stores.sites.update(sites => sites.map(site => site.id === updatedSite.id ? updatedSite : site))
    const homepage = find(updatedSite.pages, ['id', 'index'])
    const preview = await buildStaticPage({ page: homepage, site: updatedSite })
    await Promise.all([
      supabaseStorage.updateSiteData({
        id: updatedSite.id,
        data: updatedSite
      }),
      supabaseStorage.updatePagePreview({
        path: `${updatedSite.id}/preview.html`,
        preview
      })
    ])
  },
  delete: async (id) => {
    stores.sites.update(sites => sites.filter(s => s.id !== id))
    await Promise.all([
      supabaseDB.sites.delete(id),
      supabaseStorage.deleteSiteData(id)
    ])
  },
  validatePassword: async (password, siteID) => {
    const res = await supabaseDB.sites.get({ id: siteID, query: `password` })
    return res.password == password
  }
}

export const hosts = {
  initialize: async () => {
    const hosts = await supabaseDB.hosts.get()
    if (hosts) {
      stores.hosts.set(hosts)
    }
  },
  create: async (provider) => {
    stores.hosts.update(hosts => [ ...hosts, provider ])
    await supabaseDB.hosts.create(provider)
  },
  save: async (updatedSite) => {

  },
  delete: async (id) => {
    stores.hosts.update(hosts => hosts.filter(p => p.id !== id))
    await supabaseDB.hosts.delete(id)
  }
}