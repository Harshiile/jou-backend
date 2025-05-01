import { JwtGenerate } from "../../lib/jwt"

export const RenewToken = (refreshToken: string) => {
    return `Bearer ${JwtGenerate({ refreshToken })}`
}