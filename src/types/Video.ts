enum Status {
    reviewPending,
    uploadPending,
    rejected,
    uploaded
}

interface Video {
    title: string,
    thumbnail: string,
    editor: string
    workspace: string,
    status: Status
}