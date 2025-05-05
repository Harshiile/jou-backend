import { Request, Response } from 'express'
import { ServerError } from '../../lib/func/ServerError'
import { google } from 'googleapis'
import { v4 as uuidv4 } from 'uuid'
import busboy from 'busboy'
import { io } from '../../socket';

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.DRIVE_SERVICE_ACCOUNT_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

export const uploadOnDrive = async (req: Request<{}, {}, { socketId: string }>, res: Response<APIResponse>) => {
    const bb = busboy({ headers: req.headers });
    console.log(req.headers['socket']);

    if (req.headers['socket']) {
        bb.on('file', async (fieldname: string, file: object, filename: FileName) => {
            const [fileName, fileExt] = filename.filename.split('.')
            await drive.files.create({
                requestBody: {
                    name: `${fileName}-${uuidv4()}.${fileExt}`,
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
                    io.to(req.headers['socket']!).emit('uploading-progress', { percentage: percent })
                }
            });
        })
        req.pipe(bb)

        res.json({
            message: "Uploaded",
        })
    }
    else
        ServerError(res, "Socket is not connected")
}

interface FileName {
    filename: string,
    encoding: string,
    mimeType: string
}