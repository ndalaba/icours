import {ValidationError} from "class-validator";

export default class Errors {

    constructor(protected readonly errors: Map<string, any> = new Map<string, any>()) {
        this.errors = errors
    }

    getErrors(): Map<string, string> {
        return this.errors
    }

    addError(name: string, message: any): this {
        this.errors.set(name, message)
        return this
    }

    hasError(): boolean {
        return this.errors.size > 0
    }

    jsonErrors() {
        return Object.fromEntries(this.errors)
    }

    mapValidationErrors = (validationErrors: ValidationError[]): Errors => {
        validationErrors.forEach(error => this.addError(error.property, Object.entries(error.constraints)[0][1]))
        return this
    }
}

export class NotFoundError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class NotAllowedError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}