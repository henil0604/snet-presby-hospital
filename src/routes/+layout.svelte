<script>
    import "@skeletonlabs/skeleton/themes/theme-crimson.css";
    import "@skeletonlabs/skeleton/styles/all.css";

    import "@/app.postcss";
    import { AppShell, ProgressRadial, Toast } from "@skeletonlabs/skeleton";
    import { loading } from "@/lib/store";
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
        <div class="w-full py-4 px-3 border-b">
            <div class="font-bold text-2xl">Presby Hospital, Donkorkrom</div>
        </div>
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
