import { Response } from 'express'
export const ServerError = (res: Response<APIResponse>, msg: string, statusCode?: number, errMsg?: string) => {
    return res.status(statusCode || 400).json({
        message: msg,
        errorMsg: errMsg || "Internal Server Error"
    })
}