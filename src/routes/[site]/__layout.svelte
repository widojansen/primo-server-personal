<script>
  import { onMount } from 'svelte'
  import Primo, {
    modal as primoModal,
    PrimoFieldTypes,
    fieldTypes,
  } from '@primo-app/primo'
  import Build from '../../extensions/Build.svelte'
  import ImageField from '../../extensions/FieldTypes/ImageField.svelte'
  import * as actions from '../../actions'
  import * as supabaseStorage from '../../supabase/storage'
  import user from '../../stores/user'
  import { page } from '$app/stores'

  primoModal.register([
    {
      id: 'BUILD',
      component: Build,
      componentProps: {
        siteName: 'Website', // TODO - change
      },
      options: {
        route: 'build',
        width: 'md',
        header: {
          title: 'Build to Github',
          icon: 'fab fa-github',
        },
      },
    },
  ])

  // $activeSite = createNewSite({ name: 'Default Site' })

  let currentPath
  async function fetchSite(fullPath) {
    if (currentPath === fullPath) return
    const res = await supabaseStorage.downloadSiteData(siteID)
    if (res) {
      data = res
      // stores.$unsaved = false
      // // set collaborator role
      // if (owner.id !== $user.uid) {
      //   const collaborator = find(collaborator_data, ['uid', $user.uid])
      //   role = collaborator.role === 'DEV' ? 'developer' : 'content'
      // }
    }
  }

  async function saveData(updatedSite) {
    saving = true
    await actions.sites.save(updatedSite)
    saving = false
  }

  fieldTypes.register([
    {
      id: 'image',
      label: 'Image',
      component: ImageField,
    },
    ...PrimoFieldTypes,
  ])

  let saving = false

  let mounted = false
  onMount(() => (mounted = true))

  $: siteID = $page.params.site

  let data
  $: $user.signedIn && fetchSite($page.path)
</script>

<Primo
  {data}
  role={$user.role}
  {saving}
  on:save={async ({ detail: data }) => saveData(data)}
/>

<style global lang="postcss">
  .primo-reset {
    @tailwind base;
    font-family: 'Satoshi', sans-serif !important;

    button,
    button * {
      cursor: pointer;
    }
  }

  body {
    margin: 0;
  }
</style>
