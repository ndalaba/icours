import Errors from "./errors";
import HttpStatusCode from "./httpStatusCode";
import { Response as ExpressResponse } from "express";

export default class Response extends Errors {

    constructor(private readonly data: Map<string, any> = new Map<string, any>(), errors = new Map<string, string>()) {
        super(errors)
        this.data = data
    }

    addData(name: string, data: any): Response {
        this.data.set(name, data)
        return this
    }

    getData(name: string): any {
        return this.data.get(name)
    }

    getAllData(): Map<string, any> {
        return this.data;
    }

    getJsonData(){
        return Object.fromEntries(this.data)
    }
}

export const errorResponse = (res: ExpressResponse, data: any, message: string = "", code: number = HttpStatusCode.BAD_REQUEST, status: boolean = false) => {
    return res.status(code).json({
        success: status,
        message,
        error: data
    })
}

export const successResponse = (res: ExpressResponse, data: any, message: string = "", code: number = HttpStatusCode.OK, status: boolean = true) => {
    return res.status(code).json({
        success: status,
        message: message,
        data
    })
}
