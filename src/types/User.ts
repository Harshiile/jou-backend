enum Role {
    Youtuber,
    Editor
}

interface User {
    name: string,
    email: string,
    role: Role,
    password: string,
    refreshToken?: string
}