import { sign, verify } from 'jsonwebtoken'

export const JwtValidate = (token: string) => {
    return verify(token, process.env.JWT_SECRET!)
}

export const JwtGenerate = (payload: object) => {
    return sign(payload, process.env.JWT_SECRET!)
}