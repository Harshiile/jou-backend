enum Status {
    reviewPending,
    uploadPending,
    rejected,
    uploaded
}

export interface Video {
    title: string,
    thumbnail: string,
    editor: string
    workspace: string,
    status: Status
}