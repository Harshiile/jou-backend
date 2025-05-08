import { Request, response, Response } from 'express'
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
    if (req.headers['socket']) {
        bb.on('file', async (fieldname: string, file: object, filename: FileName) => {
            const [fileName, fileExt] = filename.filename.split('.')
            drive.files.create({
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
                    console.log(`Uploading : ${percent}%`);

                    io.to(req.headers['socket']!).emit('uploading-progress', { percentage: percent })
                }
            })
                .then(response =>
                    res.json({
                        message: "Uploaded",
                        data: { fileId: response.data.id }
                        // save to DB - Video Table - use id as primary key
                    })
                )
                .catch(err => ServerError(res, "Uploading failed"))
        })
        req.pipe(bb)

    }
    else ServerError(res, "Socket is not connected")
}

export const deleteOnDrive = async (req: Request, res: Response<APIResponse>) => {
    const { fileId } = req.query
    if (fileId && typeof (fileId) == 'string') {
        drive.files.delete({ fileId })
            .then(_ => res.json({
                message: "File Deleted"
            }))
            .catch(err => ServerError(res, "Deletion failed"))
    }

}


interface FileName {
    filename: string,
    encoding: string,
    mimeType: string
}