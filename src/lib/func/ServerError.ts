import APIError from "../Error/APIError"

export const ServerError = () => { throw new APIError(500, "Internal Server Error") }