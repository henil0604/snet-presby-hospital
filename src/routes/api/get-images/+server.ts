import { prisma } from "@/lib/server/prisma";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ }) => {

    let images;
    try {
        images = await prisma.image.findMany({})
    } catch (e) {
        throw error(500, "Something Went wrong");
    }

    return json({
        code: "FOUND",
        message: "Images Found",
        data: images
    });
};