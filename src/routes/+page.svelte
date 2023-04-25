<script lang="ts">
    import { loading } from "@/lib/store";
    import type { Image } from "@prisma/client";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let images: Image[] = [];

    async function fetchImages() {
        const response = await fetch("/api/get-images");
        const data = await response.json();

        if (response.status !== 200) {
            toastStore.trigger({
                message: data.message,
                background: "variant-filled-error",
            });
        }

        if (!data.data) {
            return;
        }

        const gotImages: Image[] = data.data;

        images = gotImages.sort((a, b) => a.name.localeCompare(b.name));
    }

    onMount(async () => {
        loading.set(true);
        await fetchImages();
        loading.set(false);
    });
</script>

<!-- DOCTOR -->

<div class="flex flex-col items-center py-10 px-2">
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
