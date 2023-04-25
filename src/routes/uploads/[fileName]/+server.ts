import Filic from 'filic';
import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';

const fs = Filic.create();

const $public = fs.openDir("public")
const $uploads = $public.openDir("uploads")

function getContentType(filePath: string) {
    const ext = filePath?.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}

export const GET: RequestHandler = async ({ request, params }) => {
    const { fileName } = params;
    const $file = $uploads.openFile(fileName);
    const contentType = getContentType($file.absolutePath);
    const fileContent = readFileSync($file.absolutePath);
    const headers = { 'Content-Type': contentType };
    return new Response(fileContent, {
        headers,
        status: 200
    });
}