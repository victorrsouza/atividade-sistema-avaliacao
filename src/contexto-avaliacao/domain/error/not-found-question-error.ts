export class NotFoundQuestionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "NotFoundQuestionError"
    }
}