import type { Image } from "@prisma/client";
import { toastStore } from "@skeletonlabs/skeleton";

export default async function fetchImages() {
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

    let gotImages: Image[] = data.data;

    gotImages = gotImages.sort((a, b) => a.name.localeCompare(b.name));

    return gotImages;
}