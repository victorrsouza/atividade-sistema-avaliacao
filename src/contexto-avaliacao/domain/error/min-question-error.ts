export class MinQuestionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "MinQuestionError"
    }
}