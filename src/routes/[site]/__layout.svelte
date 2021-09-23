<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount, tick } from "svelte";
  import Primo, {
    modal as primoModal,
    createNewSite,
    site,
    savedSite,
    stores,
    registerProcessors,
    PrimoFieldTypes,
    fieldTypes,
    modal,
  } from "@primo-app/primo";
  import { find } from "lodash-es";
  import sites from "../../stores/sites";
  import activeSite from "../../stores/activeSite";
  import Build from "../../extensions/Build.svelte";
  import ImageField from "../../extensions/FieldTypes/ImageField.svelte";
  import * as actions from "../../actions";
  import * as supabaseStorage from "../../supabase/storage";
  import user from "../../stores/user";
  // import { find } from 'lodash'
  // import { signOut } from '../supabase/auth'
  // import { sites } from '../supabase/db'
  // import {
  //   uploadSiteData,
  //   downloadSiteData,
  //   updateSiteData,
  //   updatePagePreview,
  // } from '../supabase/storage'
  // import supabase from '../supabase/core'
  // import {
  //   hosts,
  //   user,
  //   activeSite,
  //   currentSite,
  //   repo,
  //   modal,
  //   tokens,
  // } from '../stores'
  // import { path } from '../stores/misc'
  // import {
  //   convertHandlebarsToSvelte,
  //   convertWrapperToHTML,
  //   convertStylesToCSS,
  //   underscoreFields,
  // } from '../utils'

  // import { router } from 'tinro'
  // import { buildStaticPage } from '@primo-app/primo/src/stores/helpers'
  import { page } from "$app/stores";
  import { html, css } from "../../compiler/processors";

  registerProcessors({ html, css });

  primoModal.register([
    {
      id: "BUILD",
      component: Build,
      componentProps: {
        siteName: "Website", // TODO - change
      },
      options: {
        route: "build",
        width: "md",
        header: {
          title: "Build to Github",
          icon: "fab fa-github",
        },
      },
    },
  ]);

  // $activeSite = createNewSite({ name: 'Default Site' })

  let currentPath;
  async function fetchSite(fullPath) {
    if (currentPath === fullPath) return;
    const res = await supabaseStorage.downloadSiteData(siteID);
    if (res) {
      data = res;
      // stores.$unsaved = false
      // // set collaborator role
      // if (owner.id !== $user.uid) {
      //   const collaborator = find(collaborator_data, ['uid', $user.uid])
      //   role = collaborator.role === 'DEV' ? 'developer' : 'content'
      // }
    }
  }

  async function saveData(updatedSite) {
    saving = true;
    await actions.sites.save(updatedSite);
    saving = false;
  }

  fieldTypes.register([
    {
      id: "image",
      label: "Image",
      component: ImageField,
    },
    ...PrimoFieldTypes,
  ]);

  let saving = false;

  // let libraries = []
  // downloadSiteData({
  //   owner: '7ff42f0c-6a06-4ff4-b23e-695e11075350',
  //   id: 'bffe679e-5c85-4f0e-ad05-e5c578dad379',
  // }).then(async (res) => {
  //   const json = await res.data.text()
  //   const data = JSON.parse(json)
  //   libraries = [
  //     {
  //       label: 'Public Library',
  //       icon: 'users',
  //       components: data.symbols,
  //     },
  //   ]
  // })

  let mounted = false;
  onMount(() => (mounted = true));

  $: siteID = $page.params.site;

  let data;
  $: $user.signedIn && fetchSite($page.path);
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Primo
  {data}
  role={$user.role}
  {saving}
  on:save={async ({ detail: data }) => saveData(data)}
/>

<span>
  {$page.path}
</span>

<style global lang="postcss">
  .primo-reset {
    @tailwind base;
    font-family: "Satoshi", sans-serif !important;

    button,
    button * {
      cursor: pointer;
    }
  }

  body {
    margin: 0;
  }
</style>
