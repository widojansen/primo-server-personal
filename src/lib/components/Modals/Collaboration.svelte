<script lang="ts">
  import { fade } from "svelte/transition";
  import PrimaryButton from "$lib/ui/PrimaryButton.svelte";
  import SplitButton from "@primo-app/primo/src/ui/inputs/SplitButton.svelte";
  import { createUniqueID } from "@primo-app/primo/src/utilities";
  import { sites } from "../../../supabase/db";
  import user from "../../../stores/user";
  import { page } from "$app/stores";

  export let site;

  let role: string = "dev";

  let password = site.password;
  $: if (password) {
    showingLink = true;
    createLink();
  }

  let loading: boolean = false;

  let link;
  let copied;

  let showingLink = false;
  function showLink() {
    showingLink = true;
    password = createUniqueID(15);
    createLink();
    savePass(password);
  }

  function createLink() {
    link = `https://${$page.host}/${site.id}?role=${role}&password=${password}`;
  }

  async function savePass(password) {
    await sites.update(site.id, { password });
  }

  async function copyLink() {
    if (!navigator.clipboard) {
      alert(
        "Unable to copy link because your browser does not support copying"
      );
      return;
    }
    copied = true;
    await navigator.clipboard.writeText(link);
  }
</script>

<main class="primo-modal">
  <h1 class="primo-heading-xl">Invite a collaborator to {site.name}</h1>
  {#if !loading}
    <div class="link-description">
      {#if showingLink}
        <div class="share-link">
          Anybody with this <strong>secret link</strong> will be able to publish
          changes to your site.
        </div>
        <div class="copy-button">
          <button class:selected={copied} on:click={copyLink}>
            {#if copied}
              <span class="sr-only">Copy link</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                /></svg
              >
            {:else}
              <span class="sr-only">Link copied</span>
              <svg
                in:fade
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" /><path
                  d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
                /></svg
              >
            {/if}
          </button>
          <span>{link}</span>
        </div>
      {:else}
        <form class="role-selection" on:submit|preventDefault={showLink}>
          <SplitButton
            bind:selected={role}
            buttons={[
              {
                id: "dev",
                label: "Developer",
              },
              {
                id: "content",
                label: "Content Editor",
              },
            ]}
          />
          <div class="description">
            {#if role === "content"}
              <p>
                Content Editors only have access to the site's content, so
                they'll never accidentally run into its code and break
                something.
              </p>
            {:else if role === "dev"}
              <p>
                Developers have full access to the site's code and content. They
                can create new components and connect fields for Content Editors
                to easily edit.
              </p>
            {/if}
          </div>
          <PrimaryButton type="submit" label="Create Link" />
        </form>
      {/if}
    </div>
  {/if}
</main>

<style lang="postcss">
  main {
    max-width: var(--primo-max-width-1);
  }

  .role-selection {
    --color-link: var(--primo-color-primored);
    --color-link-hover: var(--primo-color-primored-dark);
    margin: 1rem 0;

    --TextInput-mb: 1rem;

    .subheading {
      font-size: 1rem;
      font-weight: 600;
      padding-bottom: 0.25rem;
    }

    .description {
      display: flex;
      margin-top: 1rem;
    }

    p {
      font-size: var(--primo-font-size-2);
      margin-bottom: 1rem;
    }
  }

  .link-description {
    .share-link {
      margin: 1rem 0;
    }
    .copy-button {
      display: flex;
      align-items: center;

      button {
        margin-right: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 28rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--primo-border-radius);
        box-shadow: var(--primo-ring-primored);

        &:hover {
          background: var(--primo-color-primored);
        }

        &.selected {
          outline-color: var(--primo-color-primored);
          pointer-events: none;
          cursor: default;
          background: var(--primo-color-gray-7);
        }

        svg {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }
  }
</style>
