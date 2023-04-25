<script lang="ts">
    import { loading } from "@/lib/store";
    import fetchImages from "@/utils/fetchImages";
    import type { Image } from "@prisma/client";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let fetchedImages: Image[] = [];
    let images: Image[] = [];
    let searchValue = "";

    function handleSearch() {
        if (searchValue === "") {
            images = fetchedImages;
        }

        images = fetchedImages.filter((i) => i.name.includes(searchValue));
        return;
    }

    onMount(async () => {
        loading.set(true);
        fetchedImages = (await fetchImages())!;
        images = (await fetchImages())!;
        loading.set(false);
    });
</script>

<!-- DOCTOR -->

<div class="flex flex-col items-center py-10 px-2">
    <input
        type="text"
        placeholder="Search..."
        bind:value={searchValue}
        on:input={handleSearch}
        class="input px-5 py-3 w-fit"
    />
    <div class="my-2" />
    <div class="grid grid-cols-2 gap-5 max-md:grid-cols-1 px-3">
        {#each images as image}
            <a
                href={image.url}
                target="_blank"
                class="card rounded-sm p-3 h-fit"
            >
                <span class="flex-auto px-2">{image.name}</span>
            </a>
        {/each}
    </div>
</div>
