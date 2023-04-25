import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
// @ts-ignore
import random from '@helper-modules/random';
import { prisma } from "@/lib/server/prisma";
import Filic from 'filic';
import fsNode from 'fs/promises';

const fs = Filic.create();

const $static = fs.openDir("static")
const $uploads = $static.openDir("uploads")

export const POST: RequestHandler = async ({ request }) => {

    let data: FormData;

    try {
        data = await request.formData();
    } catch (e) {
        throw error(500, "Something went wrong")
    }

    if (data.has("file") === false) {
        throw error(400, "Image not found");
    }

    const file = data.get("file") as File;


    if (await prisma.image.findFirst({ where: { name: file.name } }) !== null) {
        throw error(400, `File with name "${file.name}" already Exists`)
    }

    const id = random(30);

    const fileExtension = file.name.split('.').pop();

    const fileName = `${id}.${fileExtension}`

    try {

        const $file = $uploads.openFile(fileName);

        const buffer = Buffer.from(await file.arrayBuffer());

        await fsNode.writeFile($file.absolutePath, buffer)

    } catch (e) {
        console.error(e);
        throw error(500, "Failed to upload image")
    }

    let image;
    try {
        image = await prisma.image.create({
            data: {
                name: file.name,
                size: file.size,
                url: `/${$uploads.dirname}/${fileName}`
            }
        })
    } catch (e) {
        console.error(e);
        throw error(500, "Failed to store in database");
    }

    return json({
        code: "UPLOADED",
        message: "Uploaded Successfully",
        data: {
            ...image,
        }
    }, { status: 201 });

};