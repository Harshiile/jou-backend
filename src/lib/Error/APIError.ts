class APIError extends Error {
    private statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
    }
}
export default APIError