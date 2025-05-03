import { Request, Response } from 'express'
import { ServerError } from '../../lib/func/ServerError'
import { google } from 'googleapis'
import fs from 'fs';
import busboy from 'busboy'
import { table } from 'console';

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.DRIVE_SERVICE_ACCOUNT_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

export const uploadOnDrive = async (req: Request, res: Response<APIResponse>) => {
    const bb = busboy({ headers: req.headers });

    bb.on('file', async (fieldname: string, file: object, filename: FileName) => {
        const driveUpload = await drive.files.create({
            requestBody: {
                name: filename.filename,
                parents: [process.env.DRIVE_FOLDER_ID!],
            },
            media: {
                mimeType: filename.mimeType,
                body: file,
            },
        }, {
            onUploadProgress: (progress) => {
                const uploaded = progress.bytesRead || progress.loaded
                const percent = Math.round((Number(uploaded) / Number((req.headers['content-length']) || 1)) * 100);
                console.log(`Upload Progress: ${percent}%`);
            }
        });
    })
    req.pipe(bb)

    res.json({
        message: "Uploaded",
    })
}

interface FileName {
    filename: string,
    encoding: string,
    mimeType: string
}