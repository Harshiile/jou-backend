enum Role {
    Youtuber,
    Editor
}

export interface User {
    name: string,
    email: string,
    role: Role,
    password: string,
    refreshToken?: string
}