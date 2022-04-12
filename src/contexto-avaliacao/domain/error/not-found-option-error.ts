export class NotFoundOptionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "NotFoundOptionError"
    }
}