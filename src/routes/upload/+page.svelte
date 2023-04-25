<script lang="ts">
    import { loading } from "@/lib/store";
    import fetchImages from "@/utils/fetchImages";
    import type { Image } from "@prisma/client";
    import { AppShell, FileButton, toastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let files: FileList;
    let inputRef: HTMLInputElement;

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

        if (inputRef) {
            inputRef.value = "";
        }

        await fetchImages();
        loading.set(false);
    }

    onMount(async () => {
        loading.set(true);
        images = (await fetchImages())!;
        loading.set(false);
    });
</script>

<div class="flex flex-col items-center py-10 px-2">
    <div class="card px-4">
        <header class="card-header text-left">
            <h2>Upload Image</h2>
        </header>
        <section class="p-4 py-8 flex">
            <input bind:this={inputRef} bind:files type="file" />
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
    <div class="grid grid-cols-2 gap-5 max-md:grid-cols-1 px-3">
        {#each images as image}
            <a
                href={image.url}
                target="_blank"
                class="card py-3 h-fit overflow-hidden"
            >
                <header>
                    <img
                        src={image.url}
                        alt=""
                        class="bg-black/50 w-[500px] max-h-[1000px]"
                    />
                </header>
                <span class="flex-auto px-2">{image.name}</span>
            </a>
        {/each}
    </div>
</div>
