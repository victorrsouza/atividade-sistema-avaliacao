export class MaxAnswerKeyError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "MaxAnswerKeyError"
    }
}