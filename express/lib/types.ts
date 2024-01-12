import { Request } from "express"

export interface IGetUserAuthInfoRequest extends Request {
    user?: {
        id: number,
        role: string,
        company_id?: number
    }
}