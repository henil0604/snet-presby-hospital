<script>
    import "@skeletonlabs/skeleton/themes/theme-crimson.css";
    import "@skeletonlabs/skeleton/styles/all.css";

    import "@/app.postcss";
    import {
        AppBar,
        AppShell,
        ProgressRadial,
        Toast,
    } from "@skeletonlabs/skeleton";
    import { loading } from "@/lib/store";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let isRoot = false;

    onMount(() => {
        isRoot = $page.url.pathname === "/";
    });
</script>

{#if $loading}
    <div
        class="w-full flex-col h-full absolute z-[999] flex-center bg-gray-900"
    >
        <ProgressRadial width="w-[40px]" />
        <div class="my-1" />
        <p>Loading...</p>
    </div>
{/if}

<Toast />

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead"
                ><a href="/" class="font-bold">
                    Presby Hospital, Donkorkrom
                </a></svelte:fragment
            >

            <svelte:fragment slot="trail">
                {#if !isRoot}
                    <a href="/" class="btn variant-filled-secondary"
                        >For Doctor</a
                    >
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <!-- Router Slot -->
    <slot />
    <!-- ---- / ---- -->
    <svelte:fragment slot="pageFooter">
        <div class="w-full flex-center py-2 border-t gap-2">
            <a
                href="https://www.snetgh.org/"
                target="_blank"
                class="btn btn-sm rounded-sm variant-filled"
                >Developed by Step Network</a
            >
            <a
                href="https://www.snetgh.org/donate.php"
                target="_blank"
                class="btn btn-sm rounded-sm variant-filled">Donate</a
            >
        </div>
    </svelte:fragment>
</AppShell>
