<script lang="ts">
    import { loading } from "@/lib/store";
    import type { Image } from "@prisma/client";
    import { AppShell, FileButton, toastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let files: FileList;

    let images: Image[] = [];

    async function handleUpload(e: Event) {
        e.preventDefault();

        loading.set(true);

        if (!files || files.length < 1) {
            loading.set(false);
            return false;
        }

        const file = files[0];

        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.status !== 201) {
            toastStore.trigger({
                message: data.message,
                background: "variant-filled-error",
            });
        }

        if (response.status === 201) {
            toastStore.trigger({
                message: data.message,
                background: "variant-filled-success",
            });
        }

        await fetchImages();
        loading.set(false);
    }

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
        console.log(images);
        loading.set(false);
    });
</script>

<div class="flex flex-col items-center py-10">
    <div class="card min-w-fit px-4">
        <header class="card-header text-left">
            <h2>Upload Image</h2>
        </header>
        <section class="p-4 py-8 flex">
            <input bind:files type="file" />
        </section>
        <footer class="card-footer">
            <button
                on:click={handleUpload}
                class="btn variant-filled-primary rounded-md">Upload</button
            >
        </footer>
    </div>

    <div class="my-3" />
    <!-- Images -->
    <nav class="list-nav">
        <ul>
            {#each images as image}
                <li>
                    <a target="_blank" href={image.url}>
                        <span class="flex-auto">{image.name}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>
