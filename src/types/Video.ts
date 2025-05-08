export interface Video {
    title: string,
    desc: string,
    thumbnail: string,
    videoType: 'public' | 'private' | 'unlisted'
    uploadAt: string
    fileId: string,
    editor: string
    workspace: string,
    status: 'reviewPending' | 'uploadPending' | 'uploaded'
}