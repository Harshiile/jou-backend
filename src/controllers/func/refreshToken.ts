import { eq } from "drizzle-orm"
import { db } from "../../db"
import { UserTable } from "../../db/schema"
import { JwtGenerate } from "../../lib/jwt"

export const RenewToken = async (userId: string) => {
    const data: Record<string, any> = await db.select().from(UserTable).where(eq(UserTable.id, userId)).catch(() => { throw new Error("Error while fetching user from database") })
    return JwtGenerate({ refreshToken: data[0].refreshToken })
}