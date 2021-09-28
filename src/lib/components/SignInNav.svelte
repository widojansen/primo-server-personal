<script>
  import { signOut } from "../../supabase/auth";
  import Logo from "$lib/ui/PrimoLogo.svelte";

  import { show } from "$lib/components/Modal.svelte";

  function openUserSettings() {
    // modal.show('USER_SETTINGS')
  }
</script>

<nav role="navigation" aria-label="main navigation">
  <div class="logo">
    <Logo />
  </div>
  <div class="buttons">
    <button on:click={() => show("USER_SETTINGS")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button class="sign-out" on:click={signOut}>Sign out</button>
  </div>
</nav>

<style lang="postcss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    color: var(--color-gray-3);
    margin-bottom: 0.5rem;

    .logo {
      width: 8rem;
    }

    .toolbar {
      display: flex;

      button.settings {
        color: var(--color-gray-6);
        font-size: var(--font-size-1);
        margin-right: 1rem;

        img,
        svg {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 100%;
          object-fit: cover;
          border: 2px solid transparent;
        }

        svg:focus,
        img:focus {
          border-color: var(--color-primored);
        }

        &:hover {
          color: var(--color-primored);
        }
      }

      button.sign-out {
        font-size: var(--font-size-1);
        font-weight: 600;
        border-radius: var(--primo-border-radius);
        background: var(--color-gray-8);
        color: var(--color-gray-2);
        padding: 0.5rem 0.75rem;

        &:hover {
          background: var(--color-primored);
        }
      }
    }
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-gray-7);
    border-radius: var(--primo-border-radius);

    svg {
      height: 1.25rem;
      width: 1.25rem;
    }

    &:hover {
      box-shadow: var(--primo-ring-primored);
    }
  }
</style>
